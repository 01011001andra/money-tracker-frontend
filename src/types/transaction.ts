export type Transaction = {
  id?: string;
  title: string;
  transactionDate: string;
  amount: number;
  note?: string;
  type: "INCOME" | "EXPENSE";
  category?: {
    id: string;
    name: string;
  };
  categoryId?: string;
};
