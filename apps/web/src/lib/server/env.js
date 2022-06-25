// @ts-check
const { z } = require("zod");

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    ANALYZE: z.enum(["true", "false"]).optional(),

    // Public
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_API_URL: z.string().url(),

    // Private
    REVALIDATE_SECRET: z.string()
});

const envParsed = envSchema.safeParse(process.env);
if (!envParsed.success) {
    console.error(
        "❌ Invalid environment variables:",
        JSON.stringify(envParsed.error.format(), null, 4)
    );
    process.exit(1);
}

module.exports.env = envParsed.data;
