import { env } from "@/lib/env/client.mjs";
import { appRouter } from "@/lib/server/routers/app";
import { generateOpenApiDocument } from "trpc-openapi";

export const openApiDocument = generateOpenApiDocument(appRouter, {
    title: env.NEXT_PUBLIC_DEFAULT_APPLICATION_NAME,
    description: env.NEXT_PUBLIC_OPENAPI_DESCIPTION,
    version: env.NEXT_PUBLIC_OPENAPI_VERSION,
    baseUrl: `${env.NEXT_PUBLIC_SITE_URL}/api`
});
