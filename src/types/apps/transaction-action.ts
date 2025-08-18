import { z } from "zod";

export const TransactionActionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["INCOME", "EXPENSE"], {
    error: "Transaction Type is required",
  }),
  amount: z.number().gt(0, { message: "Amount is required" }),
  transactionDate: z.string().min(1, "Date is required"),
  categoryId: z.string().min(1, "Category is required"),
  note: z.string().optional(),
});

export type TransactionActionType = z.infer<typeof TransactionActionSchema>;
