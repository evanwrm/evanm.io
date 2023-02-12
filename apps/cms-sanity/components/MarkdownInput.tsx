import "katex/dist/katex.min.css";
import "prismjs/themes/prism-tomorrow.min.css";
import { useMemo } from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse/lib";
import remarkRehype from "remark-rehype";
import { StringInputProps } from "sanity";
import { MarkdownInput as SanityMarkdownInput, MarkdownInputProps } from "sanity-plugin-markdown";
import { unified } from "unified";
import { reporter } from "vfile-reporter";

export const MarkdownInput = (props: StringInputProps) => {
    const reactMdeProps: MarkdownInputProps["reactMdeProps"] = useMemo(() => {
        return {
            options: {
                previewRender: (markdownText, preview) => {
                    unified()
                        .use(remarkParse) // parse
                        .use(remarkGfm)
                        .use(remarkMath)
                        .use(remarkRehype) // convert
                        .use(rehypeSlug)
                        .use(rehypeAutolinkHeadings)
                        .use(rehypeKatex)
                        .use(rehypeCodeTitles)
                        .use(rehypePrism)
                        .use(rehypeStringify) // compile
                        .process(markdownText, (err, file) => {
                            if (err) console.error(err);
                            console.log(reporter(file));
                            setTimeout(() => {
                                preview.innerHTML = String(file?.value);
                            });
                        });

                    return "markdownText";
                }
            }
        };
    }, []);

    return <SanityMarkdownInput reactMdeProps={reactMdeProps} {...props} />;
};
