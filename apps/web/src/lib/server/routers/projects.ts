import { projectValidator } from "../../../validators/Project";
import { strapiQueryParameterValidator } from "../../../validators/StrapiQueryParameters";
import { fetchAPI } from "../../api";
import { t } from "../trpc";

export const projectRouter = t.router({
    find: t.procedure
        .input(strapiQueryParameterValidator.optional())
        .output(projectValidator.array())
        .query(async ({ input }) => {
            return await fetchAPI("/projects", { populate: "*", ...input });
        })
});
