import { z } from "zod";

export const dateSchema = z.preprocess(
    arg => (typeof arg == "string" || arg instanceof Date ? new Date(arg) : arg),
    z.date()
);

export const timestampValidator = z.object({
    createdAt: dateSchema,
    updatedAt: dateSchema,
    publishedAt: dateSchema.nullish()
});

export type Timestamp = z.infer<typeof timestampValidator>;
