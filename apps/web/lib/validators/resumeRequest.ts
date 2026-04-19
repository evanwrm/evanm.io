import * as z from "zod";

export const resumeRequestCreateValidator = z.object({
    name: z.string().trim().min(1).max(120),
    workEmail: z.email().trim().max(200),
    company: z.string().trim().min(1).max(200),
    siteUrl: z.string().optional(),
    note: z
        .string()
        .trim()
        .max(2000)
        .optional()
        .transform(v => (v ? v : undefined)),
});
export type ResumeRequestCreate = z.infer<typeof resumeRequestCreateValidator>;
