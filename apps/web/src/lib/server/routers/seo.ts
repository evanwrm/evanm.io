import { seoValidator } from "../../../validators/Seo";
import { strapiQueryParameterValidator } from "../../../validators/StrapiQueryParameters";
import { fetchAPI } from "../../api";
import { t } from "../trpc";

export const seoRouter = t.router({
    find: t.procedure
        .input(strapiQueryParameterValidator.optional())
        .output(seoValidator)
        .query(async ({ input }) => {
            return await fetchAPI("/seo", { populate: "*", ...input });
        })
});
