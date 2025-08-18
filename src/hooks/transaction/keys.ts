export const key = {
  transaction: (id?: string) => ["transaction", id ?? "all"] as const,
};
