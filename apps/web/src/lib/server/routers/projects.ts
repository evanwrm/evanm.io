import { procedure, router } from "@/lib/server/trpc";
import { api } from "@/lib/services/sanity/api";
import { groqSort } from "@/lib/services/sanity/utils";
import { projectValidator } from "@/lib/validators/Project";
import { sanityQueryParameterValidator } from "@/lib/validators/sanity/SanityQueryParameters";

export const projectRouter = router({
    find: procedure
        .input(sanityQueryParameterValidator.optional())
        .output(projectValidator.array())
        .query(async ({ input = {} }) => {
            const { sort = "endDate desc" } = input;
            return await api(
                `*[_type == "project"]{
                    ...,
                    "slug":slug.current,
                    thumbnail{title,alt,asset->},
                    media[]{title,alt,asset->},
                    "publications": *[_type == "publication" && references(^._id)]{
                        ..., 
                        "slug": slug.current
                    },
                    skills[]->
                }${groqSort(sort)}`
            );
        })
});
