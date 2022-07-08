import { projectValidator } from "../../../validators/Project";
import { strapiQueryParameterValidator } from "../../../validators/StrapiQueryParameters";
import { fetchAPI } from "../../api";
import { createRouter } from "../createRouter";

export const projectRouter = createRouter().query("find", {
    input: strapiQueryParameterValidator.optional(),
    async resolve({ input }) {
        return await fetchAPI("/projects", { populate: "*", ...input });
    },
    output: projectValidator.array()
});
