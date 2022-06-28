import { FaFilePdf } from "react-icons/fa";
import { HiMenuAlt2, HiOutlineLightBulb, HiX } from "react-icons/hi";
import {
    MdAlternateEmail,
    MdKeyboardArrowUp,
    MdOutlineDarkMode,
    MdOutlineLightMode
} from "react-icons/md";
import {
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

/**
 * Instead import only the icons needed
 * We lose the ability to use new icons on the fly (having to redeploy)
 * However this approach doesn't cause module loading for SSG
 */
const iconMap: Record<string, any> = {
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

    // Extras
    HiMenuAlt2,
    HiX,
    MdKeyboardArrowUp,
    MdOutlineDarkMode,
    MdOutlineLightMode,
    RiExternalLinkLine,
    FaFilePdf,
    SiGithub,
    SiGitlab,
    SiBitbucket,
    HiOutlineLightBulb,
    SiBookstack
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
