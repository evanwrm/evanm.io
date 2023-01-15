import { procedure, router } from "@/lib/server/trpc";
import { api } from "@/lib/services/sanity/api";
import { seoValidator } from "@/lib/validators/Seo";

export const seoRouter = router({
    find: procedure.output(seoValidator).query(async () => {
        return await api(`*[_type == "seo"][0]`);
    })
});
