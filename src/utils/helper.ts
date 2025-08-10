export const formatIDR = (n: number) =>
  (n >= 0 ? "+" : "−") +
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.abs(n));
