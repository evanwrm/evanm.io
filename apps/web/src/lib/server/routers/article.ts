import { env } from "@/lib/env/server.mjs";
import { procedure, router } from "@/lib/server/trpc";
import { api, sanityClient } from "@/lib/services/sanity/api";
import { groqSort } from "@/lib/services/sanity/utils";
import { Article, articleValidator } from "@/lib/validators/Article";
import { sanityQueryParameterValidator } from "@/lib/validators/sanity/SanityQueryParameters";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const articleRouter = router({
    find: procedure
        .input(sanityQueryParameterValidator.optional())
        .output(articleValidator.array())
        .query(async ({ input = {} }) => {
            const { sort = "endDate desc" } = input;
            return await api(
                `*[_type == "article"]{
                    ...,
                    "slug":slug.current,
                    tags[]->
                }${groqSort(sort)}`
            );
        }),
    findOne: procedure
        .input(z.object({ slug: z.string() }).merge(sanityQueryParameterValidator))
        .output(articleValidator)
        .query(async ({ input }) => {
            const { slug } = input;
            const article = await api<Article>(
                `*[_type == "article" && slug.current == $slug]{
                    ...,
                    "slug":slug.current,
                    tags[]->
                }[0]`,
                { slug }
            );

            // Cannot find article
            if (!article) throw new TRPCError({ code: "NOT_FOUND", message: "Article not found" });

            return article;
        }),
    incrementViews: procedure
        .input(z.object({ documentId: z.string() }))
        .mutation(async ({ input }) => {
            const { documentId } = input;

            // Increment views
            await sanityClient
                .patch(documentId)
                .inc({ "stats.views": 1 })
                .commit({ token: env.SANITY_APP_TOKEN })
                .catch(console.error);
        })
});
