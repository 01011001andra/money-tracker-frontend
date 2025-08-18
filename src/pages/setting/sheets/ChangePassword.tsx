import * as React from "react";
import { Alert, Box, Button, IconButton, TextField } from "@mui/material";
import { Icon } from "@iconify/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

import type { SheetScreenProps } from "@/providers/Sheets/Registry";

import { useUserStore } from "@/stores/user";
import { getApiErrorMessage } from "@/utils/helper/helper";
import { INPUT_BG_SX, INPUT_TEXT_SX } from "@/utils/constant";
import {
  ChangePasswordSchema,
  type ChangePasswordType,
} from "@/types/apps/change-password";
import { useChangePassword } from "@/hooks/auth/useChangePassword";

const BOTTOM_BAR_SX = {
  pb: "env(safe-area-inset-bottom)",
  bgcolor: (t: any) =>
    t.palette.mode === "dark" ? "rgba(18,18,18,.7)" : "rgba(255,255,255,.9)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  borderTop: (t: any) =>
    `1px solid ${
      t.palette.mode === "dark" ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.06)"
    }`,
} as const;

const ChangePassword: React.FC<SheetScreenProps> = ({
  closeTop,
  closeSelf,
}) => {
  const updateProfile = useChangePassword();
  const { user } = useUserStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: { oldPassword: "", confirmPassword: "", newPassword: "" },
    mode: "onChange",
  });

  const handleSave: SubmitHandler<ChangePasswordType> = async (values) => {
    if (!user) return;
    if (!isDirty) return;
    if (updateProfile.isPending) return;
    try {
      await updateProfile.mutateAsync({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      reset({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col ">
      {/* Top App Bar */}
      <Box className="h-16 px-2 flex items-center gap-2">
        <IconButton aria-label="Back" onClick={closeTop} size="small">
          <Icon icon="tabler:arrow-left" width={22} />
        </IconButton>
        <h1 className="font-bold text-primary">Change Password</h1>
      </Box>

      {updateProfile.isError && (
        <Alert severity="error">
          {getApiErrorMessage(updateProfile.error)}
        </Alert>
      )}
      {updateProfile.isSuccess && (
        <Alert severity="success">Password Changed</Alert>
      )}

      <form
        onSubmit={handleSubmit(handleSave)}
        className="w-full h-full flex flex-col "
      >
        {/* Body */}
        <div className="flex-1 overflow-auto">
          {/* Form card */}
          <Box className="p-4 space-y-4 max-w-xl mx-auto">
            <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    sx={INPUT_TEXT_SX}
                    label="Old Password"
                    variant="outlined"
                    error={!!errors.oldPassword}
                    helperText={errors.oldPassword?.message}
                    slotProps={{
                      formHelperText: {
                        sx: {
                          display: errors.oldPassword?.message
                            ? "block"
                            : "none",
                        },
                      },
                      inputLabel: {
                        sx: {
                          "&.Mui-focused": {
                            color: "var(--color-primary-600)",
                          },
                        },
                      },
                      input: { sx: INPUT_BG_SX },
                    }}
                  />
                );
              }}
            />
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    sx={INPUT_TEXT_SX}
                    label="New Password"
                    variant="outlined"
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message ?? " "}
                    slotProps={{
                      formHelperText: {
                        sx: {
                          display: errors.newPassword?.message
                            ? "block"
                            : "none",
                        },
                      },
                      inputLabel: {
                        sx: {
                          "&.Mui-focused": {
                            color: "var(--color-primary-600)",
                          },
                        },
                      },
                      input: { sx: INPUT_BG_SX },
                    }}
                  />
                );
              }}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    sx={INPUT_TEXT_SX}
                    label="Confirm Password"
                    variant="outlined"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message ?? " "}
                    slotProps={{
                      formHelperText: {
                        sx: {
                          display: errors.confirmPassword?.message
                            ? "block"
                            : "none",
                        },
                      },
                      inputLabel: {
                        sx: {
                          "&.Mui-focused": {
                            color: "var(--color-primary-600)",
                          },
                        },
                      },
                      input: { sx: INPUT_BG_SX },
                    }}
                  />
                );
              }}
            />
          </Box>
        </div>

        {/* Bottom Action Bar */}
        <Box className="sticky bottom-0 z-20" sx={BOTTOM_BAR_SX}>
          <div className="px-4 py-3 flex gap-2">
            <Button
              type="button"
              onClick={closeSelf}
              variant="text"
              className="flex-1 rounded-full text-primary"
            >
              Batal
            </Button>

            <Button
              type="submit"
              variant="contained"
              className={`flex-1 rounded-full  disabled:bg-gray disabled:text-white ${
                isDirty ? "bg-primary" : "bg-gray-300"
              }`}
              startIcon={
                updateProfile.isPending ? (
                  <Icon icon="line-md:loading-loop" width={18} />
                ) : (
                  <Icon icon="tabler:device-floppy" width={18} />
                )
              }
              disabled={updateProfile.isPending}
              aria-busy={updateProfile.isPending}
            >
              {updateProfile.isPending ? "SAVING" : "SAVE"}
            </Button>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default ChangePassword;
