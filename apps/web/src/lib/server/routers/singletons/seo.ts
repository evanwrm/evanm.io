import { procedure, router } from "@/lib/server/trpc";
import { api } from "@/lib/services/sanity/api";
import { seoValidator } from "@/lib/validators/Seo";
import { z } from "zod";

export const seoRouter = router({
    find: procedure
        .meta({
            openapi: {
                method: "GET",
                path: "/singletons/seo",
                tags: ["Singletons"]
            }
        })
        .input(z.void())
        .output(seoValidator)
        .query(async () => {
            return await api(`*[_type == "seo"][0]`);
        })
});
