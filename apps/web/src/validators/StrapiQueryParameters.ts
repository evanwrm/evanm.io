import { z } from "zod";

// https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html
export const strapiQueryParameterValidator = z.object({
    sort: z.union([z.string(), z.array(z.string())]).nullish(),
    filters: z.any().nullish(),
    populate: z.any().nullish(),
    fields: z.array(z.string()).nullish(),
    pagination: z
        .union([
            z.object({ page: z.number(), pageSize: z.number(), withCount: z.boolean().nullish() }),
            z.object({ start: z.number(), limit: z.number(), withCount: z.boolean().nullish() })
        ])
        .nullish(),
    publicationState: z.enum(["live", "preview"]).nullish(),
    locale: z.union([z.string(), z.array(z.string())]).nullish()
});

export type StrapiQueryParameters = z.infer<typeof strapiQueryParameterValidator>;
