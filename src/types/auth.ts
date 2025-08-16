import { type ReactElement } from "react";

// ==============================|| TYPES - AUTH  ||============================== //

export type GuardProps = {
  children: ReactElement | null;
};

export type User = {
  id?: string;
  email?: string;
  image?: string;
  name?: string;
};