import ArticleSearch from "@/components/layouts/ArticleSearch";
import { createInnerContext } from "@/lib/server/context";
import { appRouter } from "@/lib/server/routers/app";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog"
};

const Blog = async () => {
    const caller = appRouter.createCaller(await createInnerContext());
    const articles = await caller.articles.find({ sort: "_createdAt desc" });

    return (
        <main className="flex w-full max-w-4xl flex-1 flex-col items-center justify-start">
            <section
                id="intro"
                className="flex w-full flex-col items-start justify-evenly px-4 first:mt-24"
            >
                <div className="grid gap-y-12">
                    <div className="my-6 text-left">
                        <h1 className="text-4xl font-bold sm:text-5xl">Latest Posts</h1>
                    </div>
                </div>
            </section>
            <section className="flex w-full flex-col items-center justify-center px-4 first:mt-24">
                <ArticleSearch articles={articles} />
            </section>
        </main>
    );
};

export default Blog;
export const revalidate = 60;
