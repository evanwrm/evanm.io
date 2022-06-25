import { skillValidator } from "../../../validators/Skill";
import { strapiQueryParameterValidator } from "../../../validators/StapiQueryParameters";
import { fetchAPI } from "../../api";
import { createRouter } from "../createRouter";

export const skillRouter = createRouter().query("find", {
    input: strapiQueryParameterValidator.optional(),
    async resolve({ input }) {
        return await fetchAPI("/skills", { populate: "*", ...input });
    },
    output: skillValidator.array()
});
