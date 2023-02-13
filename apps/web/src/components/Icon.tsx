import { IconType } from "react-icons";
import { FaFilePdf } from "react-icons/fa";
import { HiColorSwatch, HiMenuAlt2, HiOutlineLightBulb, HiX } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
    MdAccessTime,
    MdAlternateEmail,
    MdCheckCircleOutline,
    MdKeyboardArrowUp,
    MdOutlineArticle,
    MdOutlineContentCopy,
    MdOutlineDarkMode,
    MdOutlineKeyboardReturn,
    MdOutlineLightMode,
    MdOutlineMonitor
} from "react-icons/md";
import {
    RiCommandLine,
    RiExternalLinkLine,
    RiFacebookFill,
    RiGithubLine,
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
const Icon = {
    // Socials
    MdAlternateEmail,
    RiGithubLine,
    RiLinkedinFill,
    SiOrcid,
    SiResearchgate,
    RiFacebookFill,
    SiDiscord,
    RiStackOverflowLine,
    SiDevdotto,
    SiMedium,
    SiYoutube,
    SiGooglescholar,
    SiRss,
    SiKaggle,
    SiLeetcode,
    RiPhoneLine,
    SiTwitch,
    SiGoogle,

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
    MdOutlineDarkMode,
    MdOutlineLightMode,
    MdOutlineMonitor,

    // Extras
    HiMenuAlt2,
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
    VscHome,
    HiColorSwatch,
    MdAccessTime
};

export default Icon;

export const iconAliases = {
    SiGithub: ["github"],
    SiGitlab: ["gitlab", "code.cs.umanitoba"],
    SiBitbucket: ["bitbucket"],
    SiGit: ["git"]
};

export const getIconAliased = (icon: string): IconType | null => {
    if (icon in Icon) return (Icon as any)[icon];

    const iconQuery = icon.toLowerCase();
    for (const [key, value] of Object.entries(iconAliases)) {
        if (key in Icon) {
            for (const alias of value) {
                if (iconQuery.includes(alias)) return (Icon as any)[key];
            }
        }
    }

    return null;
};
