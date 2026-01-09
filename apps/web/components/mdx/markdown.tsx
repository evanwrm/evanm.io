import { compile, run } from "@mdx-js/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import { Image } from "@/components/image";
import { Code, Pre } from "@/components/mdx/code-block";
import { Link } from "@/components/navigation/link";
import "katex/dist/katex.css";
import type { Element, Root } from "hast";
import type { MDXComponents, MDXProps } from "mdx/types";
import * as runtime from "react/jsx-runtime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";
import { cn } from "@/lib/utils";

export const defaultComponents = {
    a: ({
        href = "",
        className,
        ...props
    }: React.ComponentPropsWithoutRef<"a">) => (
        <Link
            href={href}
            className={cn(
                "font-semibold text-foreground/80 hover:text-foreground",
                className,
            )}
            {...props}
        />
    ),
    pre: Pre,
    code: Code,
    Image,
} satisfies MDXComponents;

type Props = MDXProps & {
    components?: MDXComponents;
    source?: string;
    className?: string;
};
export async function Markdown({
    components,
    source = "",
    className,
    ...props
}: Props) {
    const code = String(
        await compile(source, {
            outputFormat: "function-body",
            format: "mdx",
            remarkPlugins: [remarkFrontmatter, remarkGfm, remarkMath],
            rehypePlugins: [
                rehypeSlug,
                rehypeAutolinkHeadings,
                rehypeKatex,
                [
                    rehypePrettyCode,
                    {
                        theme: {
                            light: "github-light",
                            dark: "github-dark-dimmed",
                        },
                        keepBackground: false,
                    },
                ],
                rehypeCodeTitle,
            ],
        }),
    );
    const Content = await run(code, {
        ...(runtime as any),
        baseUrl: import.meta.url,
    }).then(m => m.default);

    return (
        <div className={cn("prose max-w-full", className)}>
            <Content
                components={{ ...defaultComponents, ...components }}
                {...props}
            />
        </div>
    );
}

function rehypeCodeTitle() {
    return (tree: Root) => {
        visit(tree, "element", node => {
            if (
                !Object.hasOwn(
                    node.properties,
                    "data-rehype-pretty-code-figure",
                )
            )
                return;
            const titleElementIndex = node.children.findIndex(
                (child): child is Element =>
                    child.type === "element" &&
                    (child.tagName === "figcaption" ||
                        (child.tagName === "div" &&
                            Object.hasOwn(
                                child.properties,
                                "data-rehype-pretty-code-title",
                            ))),
            );
            const preElement = node.children.find(
                (child): child is Element =>
                    child.type === "element" && child.tagName === "pre",
            );
            if (titleElementIndex !== -1 && preElement) {
                const titleElement = node.children[
                    titleElementIndex
                ] as Element;
                const title = (titleElement.children[0] as any)?.value;
                preElement.properties["data-title"] = title;
                node.children.splice(titleElementIndex, 1);
            }
        });
    };
}
