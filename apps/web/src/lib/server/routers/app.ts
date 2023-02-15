import { articleRouter } from "@/lib/server/routers/collections/article";
import { educationRouter } from "@/lib/server/routers/collections/education";
import { experienceRouter } from "@/lib/server/routers/collections/experience";
import { projectRouter } from "@/lib/server/routers/collections/projects";
import { publicationRouter } from "@/lib/server/routers/collections/publications";
import { skillRouter } from "@/lib/server/routers/collections/skills";
import { socialRouter } from "@/lib/server/routers/collections/socials";
import { landingRouter } from "@/lib/server/routers/pages/landing";
import { seoRouter } from "@/lib/server/routers/singletons/seo";
import { settingsRouter } from "@/lib/server/routers/singletons/settings";
import { systemRouter } from "@/lib/server/routers/system";
import { router } from "@/lib/server/trpc";

export const appRouter = router({
    // page
    landing: landingRouter,
    // collections
    articles: articleRouter,
    education: educationRouter,
    experience: experienceRouter,
    projects: projectRouter,
    publications: publicationRouter,
    skills: skillRouter,
    socials: socialRouter,
    // singletons
    settings: settingsRouter,
    seo: seoRouter,
    // special
    system: systemRouter
});

export type AppRouter = typeof appRouter;
