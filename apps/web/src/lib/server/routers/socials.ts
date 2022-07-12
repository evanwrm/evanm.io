import { socialValidator } from "../../../validators/Social";
import { strapiQueryParameterValidator } from "../../../validators/StrapiQueryParameters";
import { fetchAPI } from "../../api";
import { t } from "../trpc";

export const socialRouter = t.router({
    find: t.procedure
        .input(strapiQueryParameterValidator.optional())
        .output(socialValidator.array())
        .query(async ({ input }) => {
            return await fetchAPI("/social-links", { populate: "*", ...input });
        })
});
