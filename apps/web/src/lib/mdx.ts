import { serialize } from "next-mdx-remote/serialize";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export const mdxSerialize = async (source: string) => {
    const mdxSource = await serialize(source, {
        mdxOptions: {
            // format: "mdx",
            remarkPlugins: [remarkGfm, remarkMath],
            rehypePlugins: [
                rehypePrism,
                rehypeCodeTitles,
                rehypeSlug,
                rehypeAutolinkHeadings,
                rehypeKatex
            ]
        }
        // parseFrontmatter: true
    });

    return {
        mdxSource
    };
};
