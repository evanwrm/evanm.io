import { socialValidator } from "../../../validators/Social";
import { strapiQueryParameterValidator } from "../../../validators/StrapiQueryParameters";
import { fetchAPI } from "../../api";
import { createRouter } from "../createRouter";

export const socialRouter = createRouter().query("find", {
    input: strapiQueryParameterValidator.optional(),
    async resolve({ input }) {
        return await fetchAPI("/social-links", { populate: "*", ...input });
    },
    output: socialValidator.array()
});
