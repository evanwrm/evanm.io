import { globalValidator } from "../../../validators/Global";
import { strapiQueryParameterValidator } from "../../../validators/StrapiQueryParameters";
import { fetchAPI } from "../../api";
import { createRouter } from "../createRouter";

export const globalRouter = createRouter().query("find", {
    input: strapiQueryParameterValidator.optional(),
    async resolve({ input }) {
        return await fetchAPI("/global", { populate: "*", ...input });
    },
    output: globalValidator
});
