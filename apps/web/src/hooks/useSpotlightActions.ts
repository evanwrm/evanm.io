import { env } from "@/lib/env/client.mjs";
import { isReference } from "@/lib/services/sanity/utils";
import { trpc } from "@/lib/utils/trpc";
import copy from "clipboard-copy";
import { Action } from "kbar";
import { useRouter } from "next/navigation";
import { DependencyList } from "react";

export const spotlightAncestors = {
    theme: "theme"
} as const;
export const spotlightSections = {
    general: { priority: 3, section: "General" },
    navigation: { priority: 2, section: "Navigation" },
    socials: { priority: 1, section: "Socials" },
    preferences: { priority: 0, section: "Preferences" }
} as const;

export const useStaticSpotlightActions = (): [Action[], DependencyList | undefined] => {
    const router = useRouter();

    const staticActions: Action[] = [
        {
            id: "copy",
            name: "Copy URL",
            shortcut: ["Ctrl+c"],
            keywords: "copy, paste, url, website, domain",
            icon: "MdOutlineContentCopy",
            perform: () => copy(env.NEXT_PUBLIC_SITE_URL),
            ...spotlightSections.general
        },
        {
            id: "home",
            name: "Home",
            shortcut: ["g", "h"],
            keywords: "home, index, main",
            icon: "VscHome",
            perform: () => router.push("/"),
            ...spotlightSections.navigation
        },
        {
            id: "projects",
            name: "Projects",
            shortcut: ["g", "p"],
            keywords: "project, side project, applications, hobby",
            icon: "HiOutlineLightBulb",
            perform: () => router.push("/#projects"),
            ...spotlightSections.navigation
        },
        {
            id: "publications",
            name: "Publications",
            shortcut: ["g", "c"],
            keywords: "paper, academia, research, school",
            icon: "SiBookstack",
            perform: () => router.push("/#publications"),
            ...spotlightSections.navigation
        },
        {
            id: "blog",
            name: "Blog",
            shortcut: ["g", "b"],
            keywords: "article, writing, words",
            icon: "MdOutlineArticle",
            perform: () => router.push("/blog"),
            ...spotlightSections.navigation
        }
    ];

    const actions = [...staticActions];
    return [actions, []];
};

export const useHydratedSpotlightActions = (): [Action[], DependencyList | undefined] => {
    const { data: settings } = trpc.settings.find.useQuery();
    const { data: seo } = trpc.seo.find.useQuery();
    const { data: socials = [] } = trpc.socials.find.useQuery();

    const github = socials?.find(social => social.socialId === "github");
    const cvUrl = !isReference(settings?.cv?.asset) && settings?.cv?.asset.url;

    const socialActions = socials?.map(social => ({
        id: social.socialId,
        name: social.name,
        shortcut: [],
        keywords: social.socialId,
        icon: social.iconId,
        subtitle: social.description ?? "",
        perform: () => open(social.url),
        ...spotlightSections.socials
    }));

    const otherActions: Action[] = [
        {
            id: "source",
            name: "View Source",
            shortcut: ["Ctrl+u"],
            keywords: "code, github, source",
            icon: "SiGithub",
            perform: () => open(`${github?.url}/${seo?.openGraph?.site_name ?? ""}`),
            ...spotlightSections.general
        },
        {
            id: "cv",
            name: "Resume",
            shortcut: ["g", "r"],
            keywords: "resume, curriculum vitae, job, work",
            icon: "IoDocumentTextOutline",
            perform: () => cvUrl && open(cvUrl),
            ...spotlightSections.navigation
        }
    ];

    const actions = [...otherActions, ...socialActions];
    return [actions, [settings, seo, socials]];
};

export const useThemeSpotlightActions = (
    setTheme: (theme: string) => void
): [Action[], DependencyList | undefined] => {
    const themeActions: Action[] = [
        {
            id: "theme",
            name: "Change Theme",
            shortcut: ["p", "t"],
            keywords:
                "background, change color, color, change theme, theme, light, dark, night, day",
            icon: "HiColorSwatch",
            subtitle: "Choose the application theme [light, dark, system]",
            ...spotlightSections.preferences
        },
        {
            id: "lightTheme",
            name: "Light",
            shortcut: [],
            keywords: "light, day",
            icon: "MdOutlineLightMode",
            perform: () => setTheme("light"),
            parent: spotlightAncestors.theme
        },
        {
            id: "darkTheme",
            name: "Dark",
            shortcut: [],
            keywords: "dark, night",
            icon: "MdOutlineDarkMode",
            perform: () => setTheme("dark"),
            parent: spotlightAncestors.theme
        },
        {
            id: "systemTheme",
            name: "System",
            shortcut: [],
            keywords: "system, default, reset",
            icon: "MdOutlineMonitor",
            perform: () => setTheme("system"),
            parent: spotlightAncestors.theme
        }
    ];

    const actions = [...themeActions];
    return [actions, [setTheme]];
};
