import { publicationValidator } from "../../../validators/Publication";
import { strapiQueryParameterValidator } from "../../../validators/StrapiQueryParameters";
import { fetchAPI } from "../../api";
import { t } from "../trpc";

export const publicationRouter = t.router({
    find: t.procedure
        .input(strapiQueryParameterValidator.optional())
        .output(publicationValidator.array())
        .query(async ({ input }) => {
            return await fetchAPI("/publications", { populate: "*", ...input });
        })
});
