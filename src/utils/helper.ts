import { v4 as uuidv4 } from "uuid";

export const formatIDR = (n: number) =>
  (n >= 0 ? "+" : "−") +
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.abs(n));

export const randomString = () => {
  return uuidv4();
};

export const getToken = () => {
  return window.localStorage.getItem("token") as string;
};
