import superjson from "superjson";
import { createRouter } from "../createRouter";
import { globalRouter } from "./global";
import { projectRouter } from "./projects";
import { publicationRouter } from "./publications";
import { seoRouter } from "./seo";
import { skillRouter } from "./skills";
import { socialRouter } from "./socials";
import { systemRouter } from "./system";

export const appRouter = createRouter()
    .transformer(superjson)
    .merge("probe.", systemRouter)
    .merge("global.", globalRouter)
    .merge("seo.", seoRouter)
    .merge("socials.", socialRouter)
    .merge("projects.", projectRouter)
    .merge("skills.", skillRouter)
    .merge("publications.", publicationRouter);

export type AppRouter = typeof appRouter;
