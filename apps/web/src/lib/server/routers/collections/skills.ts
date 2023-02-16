import { procedure, router } from "@/lib/server/trpc";
import { api } from "@/lib/services/sanity/api";
import { groqSort } from "@/lib/services/sanity/utils";
import { sanityQueryParameterValidator } from "@/lib/validators/sanity/SanityQueryParameters";
import { skillValidator } from "@/lib/validators/Skill";

export const skillRouter = router({
    find: procedure
        .input(sanityQueryParameterValidator.optional())
        .output(skillValidator.array())
        .query(async ({ input = {} }) => {
            const { sort = "name asc" } = input;
            return await api(
                `*[_type == "skill"]{
                    ...,
                    "slug":slug.current,
                    projects[]->{...,"slug": slug.current}
                }${groqSort(sort)}`
            );
        })
});
