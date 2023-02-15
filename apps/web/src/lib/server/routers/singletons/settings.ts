import { procedure, router } from "@/lib/server/trpc";
import { api } from "@/lib/services/sanity/api";
import { settingsValidator } from "@/lib/validators/Settings";
import { z } from "zod";

export const settingsRouter = router({
    find: procedure
        .meta({
            openapi: {
                method: "GET",
                path: "/singletons/settings",
                tags: ["Singletons"]
            }
        })
        .input(z.void())
        .output(settingsValidator)
        .query(async () => {
            return await api(`*[_type == "settings"]{
                ...,
                avatar{title,alt,asset->},
                cv{title,alt,asset->},
                resume{title,alt,asset->}
            }[0]`);
        })
});
