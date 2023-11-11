import Pre from "@/components/mdx/Pre";
import NavLink from "@/components/navigation/NavLink";
import { cn } from "@/lib/utils/styles";
import { compile, run } from "@mdx-js/mdx";
import type { MDXComponents, MDXProps } from "mdx/types";
import Image from "next/image";
import { AnchorHTMLAttributes } from "react";
import * as runtime from "react/jsx-runtime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

type Props = MDXProps & {
    components?: MDXComponents;
    source?: string;
};

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
} satisfies MDXComponents;

const MdxMarkdown = async ({ components, source = "", ...props }: Props) => {
    const code = String(
        await compile(source, {
            outputFormat: "function-body",
            format: "mdx",
            remarkPlugins: [remarkFrontmatter, remarkGfm, remarkMath],
            rehypePlugins: [
                rehypeSlug,
                rehypeAutolinkHeadings,
                rehypeKatex,
                rehypeCodeTitles,
                rehypePrism
            ]
        })
    );
    const { default: Content } = await run(code, { ...(runtime as any), baseUrl: import.meta.url });

    return (
        <div className="prose max-w-full">
            <Content components={{ ...defaultComponents, ...components }} {...props} />
        </div>
    );
};

export default MdxMarkdown;
