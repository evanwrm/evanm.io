// @ts-check
import { z } from "zod";

export const serverSchema = z.object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
    ANALYZE: z.enum(["true", "false"]).default("false"),

    // Sanity
    SANITY_APP_TOKEN: z.string().optional(),

    // private
    REVALIDATE_SECRET: z.string(),
});

export const clientSchema = z.object({
    NEXT_PUBLIC_NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
    NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_DEFAULT_APPLICATION_NAME: z
        .string()
        .default("evanm.io Portfolio"),
    NEXT_PUBLIC_DEFAULT_SITE_TITLE: z.string().default("evanm.io"),

    // OpenAPI
    NEXT_PUBLIC_OPENAPI_DESCIPTION: z
        .string()
        .default("OpenAPI compliant REST API"),
    NEXT_PUBLIC_OPENAPI_VERSION: z.string().default("1.0.0"),

    // Sanity
    NEXT_PUBLIC_SANITY_URL: z.string().url(),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
    NEXT_PUBLIC_SANITY_DATASET: z.string(),
    NEXT_PUBLIC_SANITY_API_VERSION: z.string(),

    // Caching
    NEXT_PUBLIC_REVALIDATE_TIME: z.number().positive().default(10),
    NEXT_PUBLIC_RSS_CACHE_TIME: z.number().positive().default(3600),
});

/** @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }} */
export const clientEnv = {
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_DEFAULT_APPLICATION_NAME:
        process.env.NEXT_PUBLIC_DEFAULT_APPLICATION_NAME,
    NEXT_PUBLIC_DEFAULT_SITE_TITLE: process.env.NEXT_PUBLIC_DEFAULT_SITE_TITLE,
    // OpenAPI
    NEXT_PUBLIC_OPENAPI_DESCIPTION: process.env.NEXT_PUBLIC_OPENAPI_DESCIPTION,
    NEXT_PUBLIC_OPENAPI_VERSION: process.env.NEXT_PUBLIC_OPENAPI_VERSION,
    // Sanity
    NEXT_PUBLIC_SANITY_URL: process.env.NEXT_PUBLIC_SANITY_URL,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    // Caching
    NEXT_PUBLIC_REVALIDATE_TIME:
        parseInt(process.env.NEXT_PUBLIC_REVALIDATE_TIME ?? "") || undefined,
    NEXT_PUBLIC_RSS_CACHE_TIME:
        parseInt(process.env.NEXT_PUBLIC_RSS_CACHE_TIME ?? "") || undefined,
};
