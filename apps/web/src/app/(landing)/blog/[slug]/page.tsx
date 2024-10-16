import ViewCounter from "@/components/analytics/view-counter";
import { Markdown } from "@/components/mdx/markdown";
import { createInnerContext } from "@/lib/server/context";
import { createCaller } from "@/lib/server/routers/app";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = { slug: string };
interface Props {
    params: Promise<Params>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const slug = (await params).slug;
    const caller = createCaller(await createInnerContext());
    const article = await caller.articles.findOne({ slug });

    return {
        title: article?.title
    };
};

export default async function BlogPost({ params }: Props) {
    const slug = (await params).slug;
    const caller = createCaller(await createInnerContext());
    const article = await caller.articles.findOne({ slug });

    if (!article) return notFound();

    return (
        <section id="intro" className="mx-auto w-full max-w-screen-lg p-4">
            <Markdown source={article.content} className="my-8" />
            <ViewCounter documentId={article._id} />
        </section>
    );
}

export const generateStaticParams = async (): Promise<Params[]> => {
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
