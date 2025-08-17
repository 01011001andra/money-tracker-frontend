// src/sheets/screens/EditProfile.tsx
import * as React from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

import type { SheetScreenProps } from "@/providers/Sheets/Registry";
import {
  UpdateProfileSchema,
  type UpdateProfileType,
} from "@/types/apps/update-profile";
import { useUserStore } from "@/stores/user";
import { useUpdateProfile } from "@/hooks/auth/useUpdate";
import { convertImageFile } from "@/utils/helper/image";
import { getApiErrorMessage } from "@/utils/helper/helper";

const INPUT_BG_SX = {
  bgcolor: "common.white",
  "&:hover": { bgcolor: "common.white" },
  "&.Mui-focused": { bgcolor: "common.white" },
  "&.Mui-disabled": { bgcolor: "common.white" },
} as const;

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

const EditProfile: React.FC<SheetScreenProps> = ({ closeTop, closeSelf }) => {
  const updateProfile = useUpdateProfile();
  const { user } = useUserStore();

  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateProfileType>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: { email: "", image: "", name: "" },
    mode: "onChange",
  });

  const imageInputRegister = register("image", {
    async onChange(e) {
      const image = await convertImageFile(e.target.files[0], {
        outputs: { base64: true, blobUrl: true },
        resize: {
          maxWidth: 512,
          maxHeight: 512,
          quality: 0.9,
          mimeType: e.target.files[0].type,
        },
      });
      setValue("image", image.base64);
    },
  });

  const handleSave: SubmitHandler<UpdateProfileType> = async (values) => {
    updateProfile.mutate({
      id: user?.id,
      email: values.email,
      name: values.name,
      image: values.image,
    });
  };
  React.useEffect(() => {
    if (user) {
      setValue("name", String(user?.name));
      setValue("email", String(user?.email));
      setValue(
        "image",
        user?.image ?? `https://api.dicebear.com/9.x/dylan/svg?seed=${user?.id}`
      );
    }
  }, [user]);

  return (
    <div className="w-full h-full flex flex-col bg-[rgb(249,249,249)]">
      {/* Top App Bar */}
      <Box className="h-16 px-2 flex items-center gap-2">
        <IconButton aria-label="Back" onClick={closeTop} size="small">
          <Icon icon="tabler:arrow-left" width={22} />
        </IconButton>
        <h1 className="font-bold text-primary">Edit Profile</h1>
      </Box>

      {updateProfile.isError && (
        <Alert severity="error">
          {getApiErrorMessage(updateProfile.error)}
        </Alert>
      )}
      {updateProfile.isSuccess && (
        <Alert severity="success">Profile Updated</Alert>
      )}

      <form
        onSubmit={handleSubmit(handleSave)}
        className="w-full h-full flex flex-col bg-[rgb(249,249,249)]"
      >
        {/* Body */}
        <div className="flex-1 overflow-auto">
          {/* Avatar card */}
          <Box className="px-4 pt-5 pb-3">
            <div
              className="relative w-24 h-24 mx-auto"
              role="button"
              aria-label="Change photo"
            >
              <label htmlFor="image">
                <Avatar
                  src={watch("image")}
                  sx={{ width: 96, height: 96, boxShadow: 2 }}
                  imgProps={{ alt: "Avatar" }}
                />

                {/* Floating camera button */}
                <Tooltip title="Ganti foto">
                  <span className="absolute -bottom-1 -right-1 rounded-full p-2 shadow-md text-neutral-800 bg-primary dark:text-white">
                    <Icon icon="line-md:plus" width={16} />
                  </span>
                </Tooltip>
              </label>
            </div>

            <input
              {...imageInputRegister}
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </Box>

          {/* Form card */}
          <Box className="p-4 space-y-1 max-w-xl mx-auto">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  variant="outlined"
                  InputProps={{ sx: INPUT_BG_SX }}
                  error={!!errors.name}
                  helperText={errors.name?.message ?? " "}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled
                  fullWidth
                  label="Email"
                  variant="outlined"
                  InputProps={{ sx: INPUT_BG_SX }}
                  error={!!errors.email}
                  helperText={errors.email?.message ?? " "}
                />
              )}
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
              className="flex-1 rounded-full bg-primary disabled:text-white"
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

export default EditProfile;
