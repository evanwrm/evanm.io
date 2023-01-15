import { env } from "@/lib/env/client.mjs";
import { createClient, groq } from "next-sanity";

export const sanityClient = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn: typeof window !== "undefined"
});

export const api = <T = any>(query: string, paramsObject: { [key: string]: any } = {}) => {
    return sanityClient.fetch<T>(groq`${query}`, paramsObject);
};
