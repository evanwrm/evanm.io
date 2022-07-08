import { publicationValidator } from "../../../validators/Publication";
import { strapiQueryParameterValidator } from "../../../validators/StrapiQueryParameters";
import { fetchAPI } from "../../api";
import { createRouter } from "../createRouter";

export const publicationRouter = createRouter().query("find", {
    input: strapiQueryParameterValidator.optional(),
    async resolve({ input }) {
        return await fetchAPI("/publications", { populate: "*", ...input });
    },
    output: publicationValidator.array()
});
