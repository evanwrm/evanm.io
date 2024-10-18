import { ArticleSearch } from "@/components/article-search";
import { articleFind } from "@/lib/services/sanity/api";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog"
};

export default async function Blog() {
    const articles = await articleFind({ sort: "_createdAt desc" });

    return (
        <>
            <section id="intro" className="mx-auto w-full max-w-screen-lg p-4">
                <div className="grid gap-y-12">
                    <div className="my-6 text-left">
                        <h1 className="text-4xl font-bold sm:text-5xl">Latest Posts</h1>
                    </div>
                </div>
            </section>
            <section className="mx-auto w-full max-w-screen-lg p-4">
                <ArticleSearch articles={articles} />
            </section>
        </>
    );
}

export const revalidate = 60;
