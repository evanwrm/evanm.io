import { procedure, router } from "@/lib/server/trpc";
import { api } from "@/lib/services/sanity/api";
import { groqSort } from "@/lib/services/sanity/utils";
import { experienceValidator } from "@/lib/validators/Experience";
import { sanityQueryParameterValidator } from "@/lib/validators/sanity/SanityQueryParameters";

export const experienceRouter = router({
    find: procedure
        .input(sanityQueryParameterValidator.optional())
        .output(experienceValidator.array())
        .query(async ({ input = {} }) => {
            const { sort = "name asc" } = input;
            return await api(`*[_type == "experience"]${groqSort(sort)}`);
        })
});
