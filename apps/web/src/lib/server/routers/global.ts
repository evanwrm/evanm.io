import { globalValidator } from "../../../validators/Global";
import { strapiQueryParameterValidator } from "../../../validators/StrapiQueryParameters";
import { fetchAPI } from "../../api";
import { t } from "../trpc";

export const globalRouter = t.router({
    find: t.procedure
        .input(strapiQueryParameterValidator.optional())
        .output(globalValidator)
        .query(async ({ input }) => {
            return await fetchAPI("/global", { populate: "*", ...input });
        })
});
