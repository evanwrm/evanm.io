import Pre from "@/components/mdx/Pre";
import NavLink from "@/components/navigation/NavLink";
import { cn } from "@/lib/utils/styles";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Image from "next/image";
import { AnchorHTMLAttributes } from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

interface Props extends MDXRemoteProps {}

export const defaultComponents = {
    a: ({ className, href = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <NavLink href={href} className="font-bold opacity-80 hover:opacity-100" {...props} />
    ),
    pre: Pre,
    code: ({ className, ...props }: any) => {
        const match = /language-(\w+)/.exec(className || "");
        return (
            <code
                className={cn(
                    className,
                    !match && "bg-base-200 m-0.5 rounded-md p-2 font-mono text-sm"
                )}
                {...props}
            />
        );
    },
    Image
};

const MdxMarkdown = ({ components, source = "", ...props }: Partial<Props>) => {
    return (
        <div className="prose max-w-full">
            {/* @ts-expect-error Server Component */}
            <MDXRemote
                source={source}
                components={{ ...defaultComponents, ...components }}
                options={{
                    mdxOptions: {
                        format: "mdx",
                        remarkPlugins: [remarkGfm, remarkMath],
                        rehypePlugins: [
                            rehypeSlug,
                            rehypeAutolinkHeadings,
                            rehypeKatex,
                            rehypeCodeTitles,
                            rehypePrism
                        ]
                    },
                    parseFrontmatter: true
                }}
                {...props}
            />
        </div>
    );
};

export default MdxMarkdown;
