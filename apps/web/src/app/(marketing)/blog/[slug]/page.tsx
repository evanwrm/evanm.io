import ViewCounter from "@/components/analytics/ViewCounter";
import MdxMarkdown from "@/components/mdx/MdxMarkdown";
import { createInnerContext } from "@/lib/server/context";
import { appRouter } from "@/lib/server/routers/app";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
    params: {
        slug: string;
    };
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const caller = appRouter.createCaller(await createInnerContext());
    const article = await caller.articles.findOne({ slug: params.slug });

    return {
        title: article?.title
    };
};

const BlogPost = async ({ params }: Props) => {
    const caller = appRouter.createCaller(await createInnerContext());
    const article = await caller.articles.findOne({ slug: params.slug });

    if (!article) return notFound();

    return (
        <main className="flex w-full max-w-4xl flex-1 flex-col items-center justify-center">
            <section
                id="intro"
                className="mt-24 flex w-full flex-col items-center justify-evenly px-4"
            >
                <div className="my-6 w-full">
                    <MdxMarkdown source={article.content} />
                    <ViewCounter documentId={article._id} />
                </div>
            </section>
        </main>
    );
};

export const generateStaticParams = async (): Promise<Props["params"][]> => {
    const caller = appRouter.createCaller(await createInnerContext());

    const slugs: string[] = [];
    let page = 1,
        pageSize = 100;
    let articles;
    do {
        articles = await caller.articles.find({
            sort: "_createdAt desc",
            pagination: { page, pageSize }
        });
        slugs.push(...articles.map(article => article.slug));
        page++;
    } while (articles.length === pageSize);

    return slugs.map(slug => ({
        slug
    }));
};

export default BlogPost;
export const revalidate = 3600;
