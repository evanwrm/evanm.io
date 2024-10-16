import { SpotlightAction } from "@/components/navigation/spotlight";
import { env } from "@/lib/env/client.mjs";
import { isReference } from "@/lib/services/sanity/utils";
import { trpc } from "@/lib/utils/trpc";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export const useSpotlightActions = (): SpotlightAction[] => {
    const router = useRouter();
    const { setTheme } = useTheme();
    const { data: settings } = trpc.settings.find.useQuery();
    const { data: seo } = trpc.seo.find.useQuery();
    const { data: socials = [] } = trpc.socials.find.useQuery();

    const github = socials?.find(social => social.socialId === "github");
    const cvUrl = !isReference(settings?.cv?.asset) && settings?.cv?.asset.url;

    const general: SpotlightAction[] = [
        {
            id: "copy",
            title: "Copy URL",
            section: "General",
            shortcut: ["Ctrl+c"],
            keywords: ["copy", "paste", "url", "website", "domain"],
            icon: "MdOutlineContentCopy",
            command: () => navigator.clipboard.writeText(env.NEXT_PUBLIC_SITE_URL)
        },
        {
            id: "source",
            title: "View Source",
            section: "General",
            shortcut: ["Ctrl+u"],
            keywords: ["code", "github", "source"],
            icon: "SiGithub",
            command: () => open(`${github?.url}/${seo?.openGraph?.siteName ?? ""}`)
        }
    ];
    const navigation: SpotlightAction[] = [
        {
            id: "home",
            title: "Home",
            section: "Navigation",
            shortcut: ["g", "h"],
            keywords: ["home", "index", "main"],
            icon: "VscHome",
            command: () => router.push("/")
        },
        {
            id: "projects",
            title: "Projects",
            section: "Navigation",
            shortcut: ["g", "p"],
            keywords: ["project", "side project", "applications", "hobby"],
            icon: "HiOutlineLightBulb",
            command: () => router.push("/#projects")
        },
        {
            id: "publications",
            title: "Publications",
            section: "Navigation",
            shortcut: ["g", "c"],
            keywords: ["paper", "academia", "research", "school"],
            icon: "SiBookstack",
            command: () => router.push("/#publications")
        },
        {
            id: "blog",
            title: "Blog",
            section: "Navigation",
            shortcut: ["g", "b"],
            keywords: ["article", "writing", "words"],
            icon: "MdOutlineArticle",
            command: () => router.push("/blog")
        },
        {
            id: "cv",
            title: "Resume",
            section: "Navigation",
            shortcut: ["g", "r"],
            keywords: ["resume", "curriculum vitae", "job", "work"],
            icon: "IoDocumentTextOutline",
            command: () => cvUrl && open(cvUrl)
        }
    ];
    const social: SpotlightAction[] = socials?.map(social => ({
        id: social.socialId,
        title: social.name,
        section: "Socials",
        shortcut: [],
        keywords: [social.socialId, social.name],
        icon: social.iconId,
        subtitle: social.description ?? "",
        command: () => open(social.url)
    }));
    const preferences: SpotlightAction[] = [
        {
            id: "theme",
            title: "Change Theme",
            subtitle: "Choose the application theme [light, dark, system]",
            section: "Preferences",
            shortcut: ["p", "t"],
            keywords: [
                "background",
                "change color",
                "color",
                "change theme",
                "theme",
                "light",
                "dark",
                "night",
                "day"
            ],
            icon: "HiColorSwatch"
        },
        {
            id: "lightTheme",
            title: "Light",
            parent: "theme",
            shortcut: [],
            keywords: ["light", "day"],
            icon: "SunIcon",
            command: () => setTheme("light")
        },
        {
            id: "darkTheme",
            title: "Dark",
            parent: "theme",
            shortcut: [],
            keywords: ["dark", "night"],
            icon: "MoonIcon",
            command: () => setTheme("dark")
        },
        {
            id: "systemTheme",
            title: "System",
            parent: "theme",
            shortcut: [],
            keywords: ["system", "default", "reset"],
            icon: "DesktopIcon",
            command: () => setTheme("system")
        }
    ];

    return [...general, ...navigation, ...social, ...preferences];
};
