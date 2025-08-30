import { z } from "zod";

export const TargetActionSchema = z.object({
  dailyTarget: z.number(),
  weeklyTarget: z.number(),
  monthlyTarget: z.number(),
  yearlyTarget: z.number(),
});

export type TargetActionType = z.infer<typeof TargetActionSchema>;
