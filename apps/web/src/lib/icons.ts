import { IconType } from "react-icons";
import { FaFilePdf } from "react-icons/fa";
import { HiColorSwatch, HiMenuAlt2, HiOutlineLightBulb, HiX } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
    MdAlternateEmail,
    MdKeyboardArrowUp,
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
    SiGooglescholar,
    SiJavascript,
    SiMedium,
    SiNextdotjs,
    SiNodedotjs,
    SiOrcid,
    SiPytorch,
    SiReact,
    SiResearchgate,
    SiTypescript,
    SiYoutube
} from "react-icons/si";
import { VscHome } from "react-icons/vsc";

/**
 * Instead import only the icons needed
 * We lose the ability to use new icons on the fly (having to redeploy)
 * However this approach doesn't cause module loading for SSG
 */
const iconMap: Record<string, IconType> = {
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

    // Skills
    SiDocker,
    SiNodedotjs,
    SiTypescript,
    SiJavascript,
    SiReact,
    SiNextdotjs,
    SiPytorch,
    SiGit,

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
    SiGithub,
    SiGitlab,
    SiBitbucket,
    HiOutlineLightBulb,
    SiBookstack,
    VscHome,
    HiColorSwatch
};

export const getDynamicIcon = (icon: string) => {
    return iconMap[icon];
};

export const getRepositoryIcon = (repository: string) => {
    const repositoryUrl = repository.toLowerCase();
    if (["github"].some(r => repositoryUrl.includes(r))) return "SiGithub";
    if (["gitlab", "code.cs.umanitoba"].some(r => repositoryUrl.includes(r))) return "SiGitlab";
    if (["bitbucket"].some(r => repositoryUrl.includes(r))) return "SiBitbucket";
    return "SiGit";
};
