import ViewCounter from "@/components/analytics/view-counter";
import { Markdown } from "@/components/mdx/markdown";
import { articleFind, articleFindOne } from "@/lib/services/sanity/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = { slug: string };
interface Props {
    params: Promise<Params>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const slug = (await params).slug;
    const article = await articleFindOne({ slug });

    return {
        title: article?.title
    };
};

export default async function BlogPost({ params }: Props) {
    const slug = (await params).slug;
    const article = await articleFindOne({ slug });

    if (!article) return notFound();

    return (
        <section id="intro" className="mx-auto w-full max-w-screen-lg p-4">
            <Markdown source={article.content} className="my-8" />
            <ViewCounter documentId={article._id} />
        </section>
    );
}

export const generateStaticParams = async (): Promise<Params[]> => {
    const slugs: string[] = [];
    let page = 1,
        pageSize = 100;
    let articles;
    do {
        articles = await articleFind({ sort: "_createdAt desc", pagination: { page, pageSize } });
        slugs.push(...articles.map(article => article.slug));
        page++;
    } while (articles.length === pageSize);

    return slugs.map(slug => ({ slug }));
};

export const revalidate = 60;
