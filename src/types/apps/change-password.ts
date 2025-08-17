import { z } from "zod";

export const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required"),
  newPassword: z.string().min(1, "New password is required"),
  confirmPassword: z.string().min(1, "New password is required"),
});

export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;
