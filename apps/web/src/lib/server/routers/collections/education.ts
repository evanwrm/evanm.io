import { procedure, router } from "@/lib/server/trpc";
import { api } from "@/lib/services/sanity/api";
import { groqSort } from "@/lib/services/sanity/utils";
import { educationValidator } from "@/lib/validators/Education";
import { sanityQueryParameterValidator } from "@/lib/validators/sanity/SanityQueryParameters";

export const educationRouter = router({
    find: procedure
        .input(sanityQueryParameterValidator.optional())
        .output(educationValidator.array())
        .query(async ({ input = {} }) => {
            const { sort = "name asc" } = input;
            return await api(`*[_type == "education"]${groqSort(sort)}`);
        })
});
