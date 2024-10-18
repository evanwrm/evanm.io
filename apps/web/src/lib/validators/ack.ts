import { z } from "zod";

export const ackValidator = z.object({
    status: z.string(),
    message: z.string().optional(),
    now: z.number()
});
export type Ack = z.infer<typeof ackValidator>;
