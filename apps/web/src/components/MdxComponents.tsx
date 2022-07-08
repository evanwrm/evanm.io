import { MDXRemote } from "next-mdx-remote";
import React from "react";
import NavLink from "./navigation/NavLink";
import Pre from "./Pre";

// TODO: mdx v2 break with preact
// upgrade next-mdx-bundler once this is fixed
interface Props {
    compiledSource: string;
    components?: any;
    scope?: any;
    lazy?: boolean;
}

export const defaultComponents = {
    a: ({ href = "", ...props }) => (
        <NavLink href={href} className="font-bold opacity-80 hover:opacity-100" {...props} />
    ),
    pre: Pre
};

const MdxMarkdown: React.FC<Props> = ({ components, ...props }: Props) => {
    return (
        <div className="prose max-w-full">
            <MDXRemote components={{ ...defaultComponents, ...components }} {...props} />
        </div>
    );
};

export default MdxMarkdown;
