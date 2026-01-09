import { MailIcon, PhoneIcon, RssIcon } from "lucide-react";
import {
    SiBitbucket as Bitbucket,
    SiDevdotto as Devdotto,
    SiDiscord as Discord,
    SiDocker as Docker,
    SiFacebook as Facebook,
    SiGit as Git,
    SiGithub as Github,
    SiGitlab as Gitlab,
    SiGoogle as Google,
    SiGooglescholar as GoogleScholar,
    SiInstagram as Instagram,
    SiJavascript as Javascript,
    SiKaggle as Kaggle,
    SiLeetcode as Leetcode,
    SiLinkedin as Linkedin,
    SiMedium as Medium,
    SiNextdotjs as Nextjs,
    SiNodedotjs as Nodejs,
    SiOrcid as Orcid,
    SiPython as Python,
    SiPytorch as Pytorch,
    SiReact as React,
    SiResearchgate as Researchgate,
    SiStackoverflow as StackOverflow,
    SiSteam as Steam,
    SiStrava as Strava,
    SiTwitch as Twitch,
    SiTypescript as Typescript,
    SiUnity as Unity,
    SiYoutube as Youtube,
} from "react-icons/si";

type IconProps = React.ComponentPropsWithoutRef<"svg">;

/**
 * Import only the icons needed
 * We lose the ability to use new icons on the fly (having to redeploy)
 * However this approach doesn't cause module loading for SSG
 */
export const Icon = {
    // Navigation
    MenuIcon: (props: IconProps) => (
        <svg stroke="none" fill="currentcolor" viewBox="0 0 24 24" {...props}>
            <path
                d="M2 5.99519C2 5.44556 2.44556 5 2.99519 5H11.0048C11.5544 5 12 5.44556 12 5.99519C12 6.54482 11.5544 6.99039 11.0048 6.99039H2.99519C2.44556 6.99039 2 6.54482 2 5.99519Z"
                fill="currentColor"
            />
            <path
                d="M2 11.9998C2 11.4501 2.44556 11.0046 2.99519 11.0046H21.0048C21.5544 11.0046 22 11.4501 22 11.9998C22 12.5494 21.5544 12.9949 21.0048 12.9949H2.99519C2.44556 12.9949 2 12.5494 2 11.9998Z"
                fill="currentColor"
            />
            <path
                d="M2.99519 17.0096C2.44556 17.0096 2 17.4552 2 18.0048C2 18.5544 2.44556 19 2.99519 19H15.0048C15.5544 19 16 18.5544 16 18.0048C16 17.4552 15.5544 17.0096 15.0048 17.0096H2.99519Z"
                fill="currentColor"
            />
        </svg>
    ),

    // People & Work
    MailIcon,
    PhoneIcon,

    // Social Platforms
    Facebook,
    Instagram,
    Linkedin,
    Google,
    Youtube,
    Twitch,
    Discord,
    Steam,
    Strava,
    Medium,
    Devdotto,
    StackOverflow,
    RssIcon,

    // Development & Code
    Github,
    Gitlab,
    Bitbucket,
    Git,

    // Tech & Skills
    Docker,
    Nodejs,
    Typescript,
    Javascript,
    React,
    Nextjs,
    Pytorch,
    Python,
    Unity,

    // Academic
    GoogleScholar,
    Kaggle,
    Leetcode,
    Orcid,
    Researchgate,
} as const;

export const iconAliases: Partial<Record<keyof typeof Icon, string[]>> = {
    Github: ["github"],
    Gitlab: ["gitlab", "code.cs.umanitoba"],
    Bitbucket: ["bitbucket"],
    Git: ["git"],
};

export const getIcon = (icon: string) => {
    if (icon in Icon) return (Icon as any)[icon];

    const iconQuery = icon.toLowerCase();
    for (const [key, value] of Object.entries(iconAliases)) {
        if (!(key in Icon)) throw new Error(`Icon ${key} not found`);
        for (const alias of value) {
            if (iconQuery.includes(alias)) return (Icon as any)[key];
        }
    }
    return null;
};
