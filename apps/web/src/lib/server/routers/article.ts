import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Article, articleValidator } from "../../../validators/Article";
import { strapiQueryParameterValidator } from "../../../validators/StrapiQueryParameters";
import { fetchAPI } from "../../api";
import { mdxSerialize } from "../../mdx";
import { createRouter } from "../createRouter";

export const articleRouter = createRouter()
    .query("find", {
        input: strapiQueryParameterValidator.optional(),
        async resolve({ input }) {
            return await fetchAPI("/articles", { populate: "*", ...input });
        },
        output: articleValidator.array()
    })
    .query("findOne", {
        input: z.object({ slug: z.string() }).merge(strapiQueryParameterValidator),
        async resolve({ input }) {
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
        },
        output: articleValidator.merge(z.object({ mdxData: z.object({ mdxSource: z.any() }) }))
    });
