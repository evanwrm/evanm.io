import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { CgMenuLeft } from "react-icons/cg";
import { FaFilePdf, FaGraduationCap, FaToolbox } from "react-icons/fa";
import {
    HiColorSwatch,
    HiOutlineEye,
    HiOutlineLightBulb,
    HiOutlineLocationMarker,
    HiX
} from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
    MdAccessTime,
    MdAlternateEmail,
    MdCheckCircleOutline,
    MdKeyboardArrowUp,
    MdOutlineArticle,
    MdOutlineContentCopy,
    MdOutlineKeyboardReturn
} from "react-icons/md";
import {
    RiCommandLine,
    RiExternalLinkLine,
    RiFacebookFill,
    RiGithubLine,
    RiInstagramFill,
    RiLinkedinFill,
    RiPhoneLine,
    RiStackOverflowLine
} from "react-icons/ri";
import {
    SiBitbucket,
    SiBookstack,
    SiDevdotto,
    SiDiscord,
    SiDocker,
    SiGit,
    SiGithub,
    SiGitlab,
    SiGoogle,
    SiGooglescholar,
    SiJavascript,
    SiKaggle,
    SiLeetcode,
    SiMedium,
    SiNextdotjs,
    SiNodedotjs,
    SiOrcid,
    SiPython,
    SiPytorch,
    SiReact,
    SiResearchgate,
    SiRss,
    SiSteam,
    SiStrava,
    SiTwitch,
    SiTypescript,
    SiUnity,
    SiYoutube
} from "react-icons/si";
import { VscHome } from "react-icons/vsc";

/**
 * Import only the icons needed
 * We lose the ability to use new icons on the fly (having to redeploy)
 * However this approach doesn't cause module loading for SSG
 */
export const Icon = {
    // Socials
    MdAlternateEmail,
    RiFacebookFill,
    RiGithubLine,
    RiInstagramFill,
    RiLinkedinFill,
    RiPhoneLine,
    RiStackOverflowLine,
    SiDevdotto,
    SiDiscord,
    SiGoogle,
    SiGooglescholar,
    SiKaggle,
    SiLeetcode,
    SiMedium,
    SiOrcid,
    SiResearchgate,
    SiRss,
    SiSteam,
    SiStrava,
    SiTwitch,
    SiYoutube,

    // Skills
    SiDocker,
    SiNodedotjs,
    SiTypescript,
    SiJavascript,
    SiReact,
    SiNextdotjs,
    SiPytorch,
    SiGit,
    SiPython,
    SiUnity,

    // Theme
    MoonIcon,
    SunIcon,
    DesktopIcon,

    // Extras
    CgMenuLeft,
    HiX,
    RiCommandLine,
    MdKeyboardArrowUp,
    MdOutlineKeyboardReturn,
    RiExternalLinkLine,
    IoDocumentTextOutline,
    FaFilePdf,
    MdOutlineContentCopy,
    MdCheckCircleOutline,
    SiGithub,
    SiGitlab,
    SiBitbucket,
    HiOutlineLightBulb,
    MdOutlineArticle,
    SiBookstack,
    FaToolbox,
    FaGraduationCap,
    VscHome,
    HiColorSwatch,
    MdAccessTime,
    HiOutlineEye,
    HiOutlineLocationMarker
} as const;

export const iconAliases: Partial<Record<keyof typeof Icon, string[]>> = {
    SiGithub: ["github"],
    SiGitlab: ["gitlab", "code.cs.umanitoba"],
    SiBitbucket: ["bitbucket"],
    SiGit: ["git"]
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
