import { Pre } from "@/components/mdx/pre";
import { Link } from "@/components/navigation/link";
import { cn } from "@/lib/utils";
import { compile, run } from "@mdx-js/mdx";
import type { MDXComponents, MDXProps } from "mdx/types";
import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

// TODO: Remove on react 19 support
declare module "mdx/types" {
    namespace JSX {
        type Element = runtime.JSX.Element;
        type ElementClass = runtime.JSX.ElementClass;
        type IntrinsicElements = runtime.JSX.IntrinsicElements;
    }
}

export const defaultComponents = {
    a: ({ className, href = "", ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <Link
            href={href}
            className="text-foreground/80 hover:text-foreground font-semibold"
            {...props}
        />
    ),
    pre: Pre,
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
        const match = /language-(\w+)/.exec(className ?? "");
        return (
            <code
                className={cn(
                    className,
                    !match &&
                        "bg-secondary rounded-md p-1 font-mono text-sm before:content-none after:content-none"
                )}
                {...props}
            />
        );
    },
    Image: Image as any // TODO: Remove on react 19 support
} satisfies MDXComponents;

type Props = MDXProps & {
    components?: MDXComponents;
    source?: string;
    className?: string;
};

export const Markdown = async ({ components, source = "", className, ...props }: Props) => {
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
    const Content = await run(code, {
        ...(runtime as any),
        baseUrl: import.meta.url
    }).then(m => m.default);

    return (
        <div className={cn("prose max-w-full", className)}>
            <Content components={{ ...defaultComponents, ...components }} {...props} />
        </div>
    );
};
