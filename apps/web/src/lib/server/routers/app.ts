import { articleRouter } from "@/lib/server/routers/article";
import { projectRouter } from "@/lib/server/routers/projects";
import { publicationRouter } from "@/lib/server/routers/publications";
import { seoRouter } from "@/lib/server/routers/seo";
import { settingsRouter } from "@/lib/server/routers/settings";
import { skillRouter } from "@/lib/server/routers/skills";
import { socialRouter } from "@/lib/server/routers/socials";
import { systemRouter } from "@/lib/server/routers/system";
import { router } from "@/lib/server/trpc";

export const appRouter = router({
    system: systemRouter,
    settings: settingsRouter,
    seo: seoRouter,
    socials: socialRouter,
    projects: projectRouter,
    skills: skillRouter,
    publications: publicationRouter,
    articles: articleRouter
});

export type AppRouter = typeof appRouter;
