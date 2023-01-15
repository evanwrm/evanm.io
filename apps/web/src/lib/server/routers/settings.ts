import { procedure, router } from "@/lib/server/trpc";
import { api } from "@/lib/services/sanity/api";
import { settingsValidator } from "@/lib/validators/Settings";

export const settingsRouter = router({
    find: procedure.output(settingsValidator).query(async () => {
        return await api(`*[_type == "settings"]{
                ...,
                avatar{title,alt,asset->},
                cv{title,alt,asset->},
                resume{title,alt,asset->}
            }[0]`);
    })
});
