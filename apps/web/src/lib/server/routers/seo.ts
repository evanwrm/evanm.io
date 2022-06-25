import { seoValidator } from "../../../validators/Seo";
import { strapiQueryParameterValidator } from "../../../validators/StapiQueryParameters";
import { fetchAPI } from "../../api";
import { createRouter } from "../createRouter";

export const seoRouter = createRouter().query("find", {
    input: strapiQueryParameterValidator.optional(),
    async resolve({ input }) {
        return await fetchAPI("/seo", { populate: "*", ...input });
    },
    output: seoValidator
});
