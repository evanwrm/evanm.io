import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import NavLink from "./navigation/NavLink";
import Pre from "./Pre";

interface Props extends MDXRemoteProps {}

export const defaultComponents = {
    a: ({ href = "", ...props }) => (
        <NavLink href={href} className="font-bold opacity-80 hover:opacity-100" {...props} />
    ),
    pre: Pre
};

const MdxMarkdown = ({ components, ...props }: Props) => {
    return (
        <div className="prose max-w-full">
            <MDXRemote components={{ ...defaultComponents, ...components }} {...props} />
        </div>
    );
};

export default MdxMarkdown;
