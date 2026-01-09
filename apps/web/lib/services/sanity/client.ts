import { createClient } from "next-sanity";
import { env } from "@/lib/env/server.mjs";

export const sanityClient = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn: typeof window !== "undefined",
});
