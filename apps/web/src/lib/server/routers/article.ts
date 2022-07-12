import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Article, articleValidator } from "../../../validators/Article";
import { strapiQueryParameterValidator } from "../../../validators/StrapiQueryParameters";
import { fetchAPI } from "../../api";
import { mdxSerialize } from "../../mdx";
import { t } from "../trpc";

export const articleRouter = t.router({
    find: t.procedure
        .input(strapiQueryParameterValidator.optional())
        .output(articleValidator.array())
        .query(async ({ input }) => {
            return await fetchAPI("/articles", { populate: "*", ...input });
        }),
    findOne: t.procedure
        .input(z.object({ slug: z.string() }).merge(strapiQueryParameterValidator))
        .output(articleValidator.merge(z.object({ mdxData: z.object({ mdxSource: z.any() }) })))
        .query(async ({ input }) => {
            const { slug, filters, ...rest } = input;
            const articles = await fetchAPI<Article[]>("/articles", {
                populate: "*",
                filters: { ...filters, slug: { $eq: slug } },
                ...rest
            });

            // Cannot find article
            if (!articles || !Array.isArray(articles) || articles.length !== 1)
                throw new TRPCError({ code: "NOT_FOUND", message: "Article not found" });

            const article = articles[0];
            return { ...article, mdxData: await mdxSerialize(article.content) };
        })
});
