import * as React from "react";

// Library Import
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

// Project Import
import type { SheetScreenProps } from "@/providers/Sheets/Registry";
import { useUserStore } from "@/stores/user";
import {
  formatIDR,
  getApiErrorMessage,
  onlyDigitsToNumber,
} from "@/utils/helper/helper";
import { INPUT_BG_SX, INPUT_TEXT_SX } from "@/utils/constant";

import useRouter from "@/hooks/apps/useRouter";
import {
  TargetActionSchema,
  type TargetActionType,
} from "@/types/apps/target-action";
import { useCreateTarget } from "@/hooks/bff/useCreateTarget";
import { useQueryClient } from "@tanstack/react-query";
import type { ResponseType } from "@/types/http-resource";
import type { Dashboard } from "@/types/bff";
import { useGetDashboard } from "@/hooks/bff/useGetDashboard";

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

const TargetAction: React.FC<SheetScreenProps> = ({ closeTop, closeSelf }) => {
  // hooks
  const router = useRouter();
  const mutation = useCreateTarget();
  const { data } = useGetDashboard();

  const { user } = useUserStore();
  const qc = useQueryClient();

  const {
    // watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<TargetActionType>({
    resolver: zodResolver(TargetActionSchema),
    defaultValues: {
      dailyTarget: 0,
      weeklyTarget: 0,
      monthlyTarget: 0,
      yearlyTarget: 0,
    },
    mode: "onChange",
  });

  // action
  const handleSave: SubmitHandler<TargetActionType> = async (values) => {
    if (!user) return;
    if (!isDirty) return;
    if (mutation.isPending) return;
    mutation
      .mutateAsync({
        dailyTarget: values.dailyTarget,
        weeklyTarget: values.weeklyTarget,
        monthlyTarget: values.monthlyTarget,
        yearlyTarget: values.yearlyTarget,
      })
      .then((res) => {
        console.log(res.data);
        qc.setQueryData(["dashboard"], (old: ResponseType<Dashboard>) => {
          console.log(old);
          return old
            ? { ...old, data: { ...old.data, overview: res.data } }
            : old;
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleBack = () => {
    closeTop();
    if (router.query.id && router.query.sheet) {
      router.setQuery({ id: null, sheet: null });
    }
  };

  React.useEffect(() => {
    if (data?.data.overview) {
      data?.data?.overview.map((item) => {
        if (item.type == "daily") {
          setValue("dailyTarget", item.amount);
        }
        if (item.type == "weekly") {
          setValue("weeklyTarget", item.amount);
        }
        if (item.type == "monthly") {
          setValue("monthlyTarget", item.amount);
        }
        if (item.type == "yearly") {
          setValue("yearlyTarget", item.amount);
        }
      });
    }
  }, [data?.data.overview]);

  return (
    <div className="w-full h-full flex flex-col ">
      {/* Top App Bar */}
      <Box className="h-16 px-2 flex items-center gap-2">
        <IconButton aria-label="Back" onClick={() => handleBack()} size="small">
          <Icon icon="tabler:arrow-left" width={22} />
        </IconButton>
        <h1 className="font-bold text-primary">Add Target</h1>
      </Box>
      {mutation.isSuccess && <Alert severity="success">Success</Alert>}
      {mutation.isError && (
        <Alert severity="error">{getApiErrorMessage(mutation.error)}</Alert>
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
              name="dailyTarget"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Today Target"
                    variant="outlined"
                    value={formatIDR(field.value)}
                    onChange={(e) =>
                      field.onChange(onlyDigitsToNumber(e.target.value))
                    }
                    error={!!errors.dailyTarget}
                    helperText={errors.dailyTarget?.message}
                    sx={INPUT_TEXT_SX}
                    slotProps={{
                      input: {
                        sx: INPUT_BG_SX,
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ color: "var(--color-primary-600)", mr: 1 }}
                          >
                            Rp
                          </InputAdornment>
                        ),
                        inputMode: "numeric",
                      },
                      inputLabel: {
                        sx: {
                          "&.Mui-focused": {
                            color: "var(--color-primary-600)",
                          },
                        },
                      },
                      formHelperText: {
                        sx: { display: errors.dailyTarget ? "block" : "none" },
                      },
                    }}
                  />
                );
              }}
            />
            <Controller
              name="weeklyTarget"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Weekly Target"
                    variant="outlined"
                    value={formatIDR(field.value)}
                    onChange={(e) =>
                      field.onChange(onlyDigitsToNumber(e.target.value))
                    }
                    error={!!errors.weeklyTarget}
                    helperText={errors.weeklyTarget?.message}
                    sx={INPUT_TEXT_SX}
                    slotProps={{
                      input: {
                        sx: INPUT_BG_SX,
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ color: "var(--color-primary-600)", mr: 1 }}
                          >
                            Rp
                          </InputAdornment>
                        ),
                        inputMode: "numeric",
                      },
                      inputLabel: {
                        sx: {
                          "&.Mui-focused": {
                            color: "var(--color-primary-600)",
                          },
                        },
                      },
                      formHelperText: {
                        sx: { display: errors.weeklyTarget ? "block" : "none" },
                      },
                    }}
                  />
                );
              }}
            />
            <Controller
              name="monthlyTarget"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Monthly Target"
                    variant="outlined"
                    value={formatIDR(field.value)}
                    onChange={(e) =>
                      field.onChange(onlyDigitsToNumber(e.target.value))
                    }
                    error={!!errors.monthlyTarget}
                    helperText={errors.monthlyTarget?.message}
                    sx={INPUT_TEXT_SX}
                    slotProps={{
                      input: {
                        sx: INPUT_BG_SX,
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ color: "var(--color-primary-600)", mr: 1 }}
                          >
                            Rp
                          </InputAdornment>
                        ),
                        inputMode: "numeric",
                      },
                      inputLabel: {
                        sx: {
                          "&.Mui-focused": {
                            color: "var(--color-primary-600)",
                          },
                        },
                      },
                      formHelperText: {
                        sx: {
                          display: errors.monthlyTarget ? "block" : "none",
                        },
                      },
                    }}
                  />
                );
              }}
            />
            <Controller
              name="yearlyTarget"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Yearly Target"
                    variant="outlined"
                    value={formatIDR(field.value)}
                    onChange={(e) =>
                      field.onChange(onlyDigitsToNumber(e.target.value))
                    }
                    error={!!errors.yearlyTarget}
                    helperText={errors.yearlyTarget?.message}
                    sx={INPUT_TEXT_SX}
                    slotProps={{
                      input: {
                        sx: INPUT_BG_SX,
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ color: "var(--color-primary-600)", mr: 1 }}
                          >
                            Rp
                          </InputAdornment>
                        ),
                        inputMode: "numeric",
                      },
                      inputLabel: {
                        sx: {
                          "&.Mui-focused": {
                            color: "var(--color-primary-600)",
                          },
                        },
                      },
                      formHelperText: {
                        sx: { display: errors.yearlyTarget ? "block" : "none" },
                      },
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
                mutation.isPending ? (
                  <Icon icon="line-md:loading-loop" width={18} />
                ) : (
                  <Icon icon="tabler:device-floppy" width={18} />
                )
              }
              disabled={mutation.isPending}
              aria-busy={mutation.isPending}
            >
              {mutation.isPending ? "SAVING" : "SAVE"}
            </Button>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default TargetAction;
