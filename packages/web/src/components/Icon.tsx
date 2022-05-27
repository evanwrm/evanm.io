import React from "react";
import { MdAlternateEmail } from "react-icons/md";
import { RiGithubLine, RiLinkedinFill } from "react-icons/ri";

export interface IconProps {
    icon: string;
    className?: string;
}

/**
 * Ugly hack to get dynamic imports to work for many (svg) icon packs
 *
 * Next.js docs: https://nextjs.org/docs/advanced-features/dynamic-import
 * "Note: In import('path/to/component'), the path must be explicitly written. It can't be a template string nor a variable"
 *
 * TODO: update if a better solution is found
 */
// const getDynamicIcon = (packageId: string, icon: string) => {
//     /* prettier-ignore */
//     switch (packageId) {
//         case "ai": return dynamic<IconBaseProps>(() => import("react-icons/ai").then(mod => mod[icon]) as any);
//         case "bs": return dynamic<IconBaseProps>(() => import("react-icons/bs").then(mod => mod[icon]) as any);
//         case "bi": return dynamic<IconBaseProps>(() => import("react-icons/bi").then(mod => mod[icon]) as any);
//         case "di": return dynamic<IconBaseProps>(() => import("react-icons/di").then(mod => mod[icon]) as any);
//         case "fi": return dynamic<IconBaseProps>(() => import("react-icons/fi").then(mod => mod[icon]) as any);
//         case "fc": return dynamic<IconBaseProps>(() => import("react-icons/fc").then(mod => mod[icon]) as any);
//         case "fa": return dynamic<IconBaseProps>(() => import("react-icons/fa").then(mod => mod[icon]) as any);
//         case "gi": return dynamic<IconBaseProps>(() => import("react-icons/gi").then(mod => mod[icon]) as any);
//         case "go": return dynamic<IconBaseProps>(() => import("react-icons/go").then(mod => mod[icon]) as any);
//         case "gr": return dynamic<IconBaseProps>(() => import("react-icons/gr").then(mod => mod[icon]) as any);
//         case "hi": return dynamic<IconBaseProps>(() => import("react-icons/hi").then(mod => mod[icon]) as any);
//         case "im": return dynamic<IconBaseProps>(() => import("react-icons/im").then(mod => mod[icon]) as any);
//         case "io": return dynamic<IconBaseProps>(() => import("react-icons/io5").then(mod => mod[icon]) as any);
//         // case "io5": return dynamic<IconBaseProps>(() => import("react-icons/io5").then(mod => mod[icon]) as any);
//         case "md": return dynamic<IconBaseProps>(() => import("react-icons/md").then(mod => mod[icon]) as any);
//         case "ri": return dynamic<IconBaseProps>(() => import("react-icons/ri").then(mod => mod[icon]) as any);
//         case "ti": return dynamic<IconBaseProps>(() => import("react-icons/ti").then(mod => mod[icon]) as any);
//         case "si": return dynamic<IconBaseProps>(() => import("react-icons/si").then(mod => mod[icon]) as any);
//         case "vsc": return dynamic<IconBaseProps>(() => import("react-icons/vsc").then(mod => mod[icon]) as any);
//         case "wi": return dynamic<IconBaseProps>(() => import("react-icons/wi").then(mod => mod[icon]) as any);
//         case "cg": return dynamic<IconBaseProps>(() => import("react-icons/cg").then(mod => mod[icon]) as any);
//         default: return dynamic<IconBaseProps>(() => import("react-icons/md").then(mod => mod[icon]) as any);
//     }
// };

/**
 * Instead import only the icons needed
 * We lose the ability to use new icons on the fly (having to redeploy)
 * However this approach doesn't cause module loading for SSG
 */
const iconMap: Record<string, any> = {
    MdAlternateEmail,
    RiGithubLine,
    RiLinkedinFill
};
const getDynamicIcon = (icon: string) => {
    return iconMap[icon];
};

const Icon: React.FC<IconProps> = ({ className = "fill-current w-10 h-10", icon }: IconProps) => {
    // const packageId =
    //     icon
    //         .replace(/([^A-Z])([A-Z])/g, "$1 $2")
    //         .split(" ")
    //         .shift()
    //         ?.toLowerCase() || "";
    const SVGIcon = getDynamicIcon(icon);

    return <SVGIcon className={className} />;
};

export default Icon;
