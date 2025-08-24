import * as React from "react";

// Library Import
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

// Project Import
import type { SheetScreenProps } from "@/providers/Sheets/Registry";
import { useUserStore } from "@/stores/user";
import {
  formatIDR,
  getApiErrorMessage,
  onlyDigitsToNumber,
} from "@/utils/helper/helper";
import { INPUT_BG_SX, INPUT_TEXT_SX } from "@/utils/constant";

import { useGetCategory } from "@/hooks/category/useGetCategory";
import useRouter from "@/hooks/apps/useRouter";
import {
  TransactionActionSchema,
  type TransactionActionType,
} from "@/types/apps/transaction-action";
import { useGetTransaction } from "@/hooks/transaction/useGetTransaction";
import { useCreateUpdateTr } from "@/hooks/transaction/useCreateUpdateTr";
import { useAppStore } from "@/stores/app";

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

const TransactionAction: React.FC<SheetScreenProps> = ({
  closeTop,
  closeSelf,
}) => {
  // hooks
  const { loadingAction } = useAppStore();
  const router = useRouter();
  const transactionId = router.query.id;
  const { refetch, isRefetching, data, resetCategory } = useGetCategory();
  const updateCreate = useCreateUpdateTr();

  const { data: detailTransaction, isLoading } = useGetTransaction(
    transactionId,
    {
      enabled: !!transactionId,
    }
  );

  const { user } = useUserStore();
  const dynamicType =
    router.query.tab.toUpperCase() == "ALL"
      ? ""
      : router.query.tab.toUpperCase();

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<TransactionActionType>({
    resolver: zodResolver(TransactionActionSchema),
    defaultValues: {
      title: "",
      type: dynamicType as any,
      amount: 0,
      transactionDate: dayjs().startOf("day").toISOString(),
      categoryId: "",
      note: "",
    },
    mode: "onChange",
  });

  // action
  const handleSave: SubmitHandler<TransactionActionType> = async (values) => {
    if (!user) return;
    if (!isDirty) return;
    if (updateCreate.isPending) return;
    updateCreate
      .mutateAsync({
        id: transactionId,
        title: values.title,
        amount: values.amount,
        type: values.type,
        transactionDate: values.transactionDate,
        categoryId: values.categoryId,
        note: values.note,
      })
      .then((res) => {
        if (transactionId) {
          reset({
            type: res?.data.type,
            amount: res?.data.amount,
            title: res?.data.title,
            categoryId: res?.data?.category?.name,
            transactionDate: res?.data.transactionDate,
            note: res?.data.note,
          });
        } else {
          reset();
        }
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
    if (Array.isArray(detailTransaction?.data)) return;

    reset({
      type: detailTransaction?.data.type,
      amount: detailTransaction?.data.amount,
      title: detailTransaction?.data.title,
      categoryId: detailTransaction?.data?.category?.name,
      transactionDate: detailTransaction?.data.transactionDate,
      note: detailTransaction?.data.note,
    });
  }, [detailTransaction?.data, reset]);

  React.useEffect(() => {
    loadingAction({ open: isLoading, text: "Please Wait..." });
  }, [isLoading]);
  return (
    <div className="w-full h-full flex flex-col ">
      {/* Top App Bar */}
      <Box className="h-16 px-2 flex items-center gap-2">
        <IconButton aria-label="Back" onClick={() => handleBack()} size="small">
          <Icon icon="tabler:arrow-left" width={22} />
        </IconButton>
        <h1 className="font-bold text-primary">
          {transactionId ? "Edit" : "Add"} Transaction
        </h1>
      </Box>
      {updateCreate.isSuccess && (
        <Alert severity="success">
          {transactionId ? "Updated" : "Created"}
        </Alert>
      )}
      {updateCreate.isError && (
        <Alert severity="error">{getApiErrorMessage(updateCreate.error)}</Alert>
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
              name="title"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    sx={INPUT_TEXT_SX}
                    label="Title"
                    variant="outlined"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    slotProps={{
                      formHelperText: {
                        sx: {
                          display: errors.title?.message ? "block" : "none",
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
              name="amount"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="Amount"
                    variant="outlined"
                    value={formatIDR(field.value)}
                    onChange={(e) =>
                      field.onChange(onlyDigitsToNumber(e.target.value))
                    }
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
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
                        sx: { display: errors.amount ? "block" : "none" },
                      },
                    }}
                  />
                );
              }}
            />

            <Controller
              name="type"
              control={control}
              rules={{ required: "Pilih umur" }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={!!errors.type}
                  size="small"
                  sx={{
                    // warna label saat hover (seperti TextField kamu)
                    "&:hover .MuiInputLabel-root:not(.Mui-focused):not(.Mui-disabled)":
                      {
                        color: "var(--color-primary-600)",
                      },
                  }}
                >
                  <InputLabel
                    id="type-label"
                    sx={{
                      "&.Mui-focused": { color: "var(--color-primary-600)" },
                    }}
                  >
                    Type
                  </InputLabel>

                  <Select
                    {...field}
                    labelId="type-label"
                    id="type"
                    label="Type"
                    variant="outlined"
                    sx={INPUT_BG_SX}
                  >
                    <MenuItem value="INCOME">Income</MenuItem>
                    <MenuItem value="EXPENSE">Expense</MenuItem>
                  </Select>

                  {errors.type && (
                    <FormHelperText>
                      {String(errors.type.message)}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <FormControl
                      fullWidth
                      error={!!errors.categoryId}
                      size="small"
                      sx={{
                        // warna label saat hover (seperti TextField kamu)
                        "&:hover .MuiInputLabel-root:not(.Mui-focused):not(.Mui-disabled)":
                          {
                            color: "var(--color-primary-600)",
                          },
                      }}
                    >
                      <Autocomplete
                        freeSolo
                        onInputChange={(_, v, reason) => {
                          if (reason === "input") field.onChange(v);
                          if (reason === "clear") field.onChange("");
                        }}
                        onChange={(_, v) => {
                          if (typeof v === "string") field.onChange(v);
                          else field.onChange(v?.name ?? "");
                        }}
                        size="small"
                        fullWidth
                        onOpen={() => {
                          refetch();
                        }}
                        onClose={() => {
                          resetCategory();
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.name === value.name
                        }
                        getOptionLabel={(option: any) => option.name || option}
                        options={data?.data || []}
                        inputValue={watch("categoryId")}
                        loading={isRefetching}
                        renderInput={(params) => (
                          <TextField
                            {...field}
                            {...params}
                            fullWidth
                            sx={INPUT_BG_SX}
                            label="Category"
                            slotProps={{
                              input: {
                                ...params.InputProps,
                                endAdornment: (
                                  <React.Fragment>
                                    {isRefetching ? (
                                      <CircularProgress
                                        color="inherit"
                                        size={20}
                                      />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                  </React.Fragment>
                                ),
                              },
                            }}
                          />
                        )}
                      />
                      {errors.categoryId && (
                        <FormHelperText>
                          {String(errors.categoryId.message)}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </>
                );
              }}
            />
            <Controller
              name="transactionDate"
              control={control}
              render={({ field, fieldState }) => (
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Date"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(d) =>
                    field.onChange(
                      d ? dayjs(d).startOf("day").toISOString() : ""
                    )
                  }
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      error: !!fieldState.error,
                      helperText: fieldState.error?.message,
                      sx: INPUT_TEXT_SX,
                      InputProps: { sx: INPUT_BG_SX },
                      InputLabelProps: {
                        sx: {
                          "&.Mui-focused": {
                            color: "var(--color-primary-600)",
                          },
                        },
                      },
                    },
                  }}
                />
              )}
            />
            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  label="Note"
                  variant="outlined"
                  multiline
                  rows={3}
                  error={!!errors.note}
                  sx={INPUT_TEXT_SX}
                  slotProps={{
                    formHelperText: {
                      sx: {
                        display: errors.note?.message ? "block" : "none",
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
              className={`flex-1 rounded-full  disabled:bg-gray disabled:text-white ${
                isDirty ? "bg-primary" : "bg-gray-300"
              }`}
              startIcon={
                updateCreate.isPending ? (
                  <Icon icon="line-md:loading-loop" width={18} />
                ) : (
                  <Icon icon="tabler:device-floppy" width={18} />
                )
              }
              disabled={updateCreate.isPending}
              aria-busy={updateCreate.isPending}
            >
              {updateCreate.isPending ? "SAVING" : "SAVE"}
            </Button>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default TransactionAction;
