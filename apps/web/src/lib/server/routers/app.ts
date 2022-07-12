import { t } from "../trpc";
import { articleRouter } from "./article";
import { globalRouter } from "./global";
import { projectRouter } from "./projects";
import { publicationRouter } from "./publications";
import { seoRouter } from "./seo";
import { skillRouter } from "./skills";
import { socialRouter } from "./socials";
import { systemRouter } from "./system";

export const appRouter = t.router({
    system: systemRouter,
    global: globalRouter,
    seo: seoRouter,
    socials: socialRouter,
    projects: projectRouter,
    skills: skillRouter,
    publications: publicationRouter,
    articles: articleRouter
});

export type AppRouter = typeof appRouter;
