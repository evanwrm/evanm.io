import NavLink from "@/components/navigation/NavLink";
import { createInnerContext } from "@/lib/server/context";
import { appRouter } from "@/lib/server/routers/app";

const Blog = async () => {
    const caller = appRouter.createCaller(await createInnerContext());
    const articles = await caller.articles.find({ sort: "_createdAt desc" });

    return (
        <main className="flex w-full max-w-4xl flex-1 flex-col items-center justify-center">
            <section
                id="intro"
                className="min-h-screen w-full px-4 flex flex-col justify-evenly items-center"
            >
                <div className="grid gap-y-12">
                    <div className="my-6 text-left">
                        <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold">
                            <span>Blog</span>
                        </h1>
                        <p className="mt-12 text-2xl">
                            <span>Get started by editing </span>
                            <code className="bg-base-200 rounded-md p-3 font-mono text-lg">
                                pages/blog/index.js
                            </code>
                        </p>
                    </div>
                </div>
            </section>
            <section className="flex flex-col w-full px-4 justify-center items-center">
                {articles.map(article => (
                    <div key={article.slug}>
                        <NavLink
                            href={`/blog/${article.slug}`}
                            aria-label={`Read ${article.title}`}
                            className="ml-2 opacity-80 transition hover:opacity-100"
                        >
                            <h2>{article.title}</h2>
                        </NavLink>
                    </div>
                ))}
            </section>
        </main>
    );
};

export default Blog;
