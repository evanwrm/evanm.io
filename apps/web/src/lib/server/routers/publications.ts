import { t } from "@/lib/server/trpc";
import { api } from "@/lib/services/sanity/api";
import { groqSort } from "@/lib/services/sanity/utils";
import { publicationValidator } from "@/lib/validators/Publication";
import { sanityQueryParameterValidator } from "@/lib/validators/sanity/SanityQueryParameters";

export const publicationRouter = t.router({
    find: t.procedure
        .input(sanityQueryParameterValidator.optional())
        .output(publicationValidator.array())
        .query(async ({ input = {} }) => {
            const { sort = "year desc" } = input;
            return await api(
                `*[_type == "publication"]{
                    ...,
                    "slug": slug.current,
                    project->{...,"slug": slug.current}
                }${groqSort(sort)}`
            );
        })
});
