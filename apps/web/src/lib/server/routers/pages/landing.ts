import { procedure, router } from "@/lib/server/trpc";
import { api } from "@/lib/services/sanity/api";
import { landingValidator } from "@/lib/validators/Landing";
import { z } from "zod";

export const landingRouter = router({
    find: procedure
        .meta({
            openapi: {
                method: "GET",
                path: "/pages/landing",
                tags: ["Pages"]
            }
        })
        .input(z.void())
        .output(landingValidator)
        .query(async () => {
            return await api(`*[_type == "landing"][0]`);
        })
});
