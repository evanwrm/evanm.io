import { z } from "zod";

export const sanityQueryParameterValidator = z.object({
    sort: z.union([z.string(), z.array(z.string())]).nullish(),
    pagination: z
        .union([
            z.object({ page: z.number(), pageSize: z.number() }),
            z.object({ start: z.number(), limit: z.number() })
        ])
        .nullish()
});

export type SanityQueryParameters = z.infer<typeof sanityQueryParameterValidator>;
