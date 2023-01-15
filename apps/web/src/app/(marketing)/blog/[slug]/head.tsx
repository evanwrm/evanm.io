import PageSeo from "@/components/analytics/PageSeo";
import { createInnerContext } from "@/lib/server/context";
import { appRouter } from "@/lib/server/routers/app";
import DefaultHead from "src/app/RootHead";

interface Props {
    params: {
        slug: string;
    };
}

const Head = async ({ params }: Props) => {
    const caller = appRouter.createCaller(await createInnerContext());
    const article = await caller.articles.findOne({ slug: params.slug });

    return (
        <>
            <DefaultHead />
            {/* @ts-expect-error Server Component */}
            <PageSeo title={article?.title} />
        </>
    );
};

export default Head;
