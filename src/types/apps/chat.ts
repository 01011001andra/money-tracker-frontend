export type SendMessageType = {
  userId: string;
  message: string;
  image?: File | Blob;
};

export type MessagesType = {
  id: string;
  role: "user" | "assistant" | "system";
  message: string | null;
  image?: string;
  createdAt: string;
};
