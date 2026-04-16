import "katex/dist/katex.css";
import { compile, run } from "@mdx-js/mdx";
import type { Element, Root } from "hast";
import type { MDXComponents } from "mdx/types";
import * as runtime from "react/jsx-runtime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";
import { Image } from "@/components/image";
import { Code, Pre } from "@/components/mdx/code-block";
import { Link } from "@/components/link";
import { cn } from "@/lib/utils";

const defaultComponents: MDXComponents = {
    a: ({
        href = "",
        className,
        ...props
    }: React.ComponentPropsWithoutRef<"a">) => (
        <Link
            href={href}
            className={cn(
                "text-foreground/80 hover:text-foreground font-semibold",
                className,
            )}
            {...props}
        />
    ),
    img: ({ src, alt }: React.ComponentPropsWithoutRef<"img">) => (
        <Image src={src ?? ""} alt={alt} />
    ),
    pre: Pre,
    code: Code,
};

interface Props {
    source: string;
    className?: string;
    components?: MDXComponents;
}
export async function Markdown({ source = "", className, components }: Props) {
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
            <Content components={{ ...defaultComponents, ...components }} />
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
