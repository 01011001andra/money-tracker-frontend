// src/types/dashboard.ts

import type { Icon } from "./icon";

export type Dashboard = {
  banner: {
    title: string;
    balances: {
      name: string;
      amount: number;
      totalTransaction: {
        income: number;
        expense: number;
        message: { color: string; icon: string; text: string; type: string };
      };
    }[];
  };
  activity: {
    id: string;
    title: string;
    amount: number;
    transactionDate: string;
    category: {
      id: string;
      name: string;
    };
    type: "INCOME" | "EXPENSE";
    icon: Icon;
  }[];
  spendingOverview: {
    name: "income" | "expense";
    total: number;
    progress: number;
    label: string;
  }[];
  notification: {
    title: string;
    news: number;
    details: {
      id: string;
      title: string;
      createdAt: string;
      read: boolean;
      icon: Icon;
      type: "info" | "success";
    }[];
  };
};
