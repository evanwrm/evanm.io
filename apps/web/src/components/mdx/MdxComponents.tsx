"use client";

import Pre from "@/components/mdx/Pre";
import NavLink from "@/components/navigation/NavLink";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import Image from "next/image";
import { AnchorHTMLAttributes } from "react";

interface Props extends MDXRemoteProps {}

export const defaultComponents = {
    a: ({ className, href = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <NavLink href={href} className="font-bold opacity-80 hover:opacity-100" {...props} />
    ),
    pre: Pre,
    Image
};

const MdxMarkdown = ({ components, ...props }: Props) => {
    return (
        <div className="prose max-w-full">
            <MDXRemote components={{ ...defaultComponents, ...components }} {...props} />
        </div>
    );
};

export default MdxMarkdown;
