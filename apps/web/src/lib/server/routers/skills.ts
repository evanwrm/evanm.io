import { skillValidator } from "../../../validators/Skill";
import { strapiQueryParameterValidator } from "../../../validators/StrapiQueryParameters";
import { fetchAPI } from "../../api";
import { t } from "../trpc";

export const skillRouter = t.router({
    find: t.procedure
        .input(strapiQueryParameterValidator.optional())
        .output(skillValidator.array())
        .query(async ({ input }) => {
            return await fetchAPI("/skills", { populate: "*", ...input });
        })
});
