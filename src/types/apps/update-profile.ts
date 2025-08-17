import { z } from "zod";

export const UpdateProfileSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  image: z.any(),
});

export type UpdateProfileType = z.infer<typeof UpdateProfileSchema>;
