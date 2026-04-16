import { createClient } from "@sanity/client";
import * as env from "astro:env/server";

export const sanityClient = createClient({
    projectId: env.SANITY_PROJECT_ID,
    dataset: env.SANITY_DATASET,
    apiVersion: env.SANITY_API_VERSION,
    useCdn: false,
});
