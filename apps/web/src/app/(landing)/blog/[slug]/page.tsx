import ViewCounter from "@/components/analytics/view-counter";
import { Markdown } from "@/components/mdx/markdown";
import { createInnerContext } from "@/lib/server/context";
import { createCaller } from "@/lib/server/routers/app";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
    params: {
        slug: string;
    };
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const caller = createCaller(await createInnerContext());
    const article = await caller.articles.findOne({ slug: params.slug });

    return {
        title: article?.title
    };
};

export default async function BlogPost({ params }: Props) {
    const caller = createCaller(await createInnerContext());
    const article = await caller.articles.findOne({ slug: params.slug });

    if (!article) return notFound();

    return (
        <section id="intro" className="mx-auto w-full max-w-screen-lg p-4">
            <Markdown source={article.content} className="my-8" />
            <ViewCounter documentId={article._id} />
        </section>
    );
}

export const generateStaticParams = async (): Promise<Props["params"][]> => {
    const caller = createCaller(await createInnerContext());

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

    return slugs.map(slug => ({ slug }));
};

export const revalidate = 60;
