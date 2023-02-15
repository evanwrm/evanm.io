import { procedure, router } from "@/lib/server/trpc";
import { api } from "@/lib/services/sanity/api";
import { groqSort } from "@/lib/services/sanity/utils";
import { sanityQueryParameterValidator } from "@/lib/validators/sanity/SanityQueryParameters";
import { socialValidator } from "@/lib/validators/Social";

export const socialRouter = router({
    find: procedure
        .input(sanityQueryParameterValidator.optional())
        .output(socialValidator.array())
        .query(async ({ input = {} }) => {
            const { sort = "name asc" } = input;
            return await api(`*[_type == "social"]${groqSort(sort)}`);
        })
});
