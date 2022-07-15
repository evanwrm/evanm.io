import { createSSGHelpers } from "@trpc/react/ssg";
import { TRPCError } from "@trpc/server";
import { useRegisterActions } from "kbar";
import { GetStaticProps, GetStaticPropsResult, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import superjson from "superjson";
import Layout from "../../components/layouts/Layout";
import MdxMarkdown from "../../components/MdxComponents";
import { fetchAPI } from "../../lib/api";
import { appRouter } from "../../lib/server/routers/app";
import { generateHydratedSpotlightActions } from "../../lib/spotlightActions";
import { NEXT_PUBLIC_REVALIDATE_TIME } from "../../lib/utils/constants";
import { trpc } from "../../lib/utils/trpc";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const BlogPost = ({ slug }: Props) => {
    const { data: global } = trpc.proxy.global.find.useQuery({});
    const { data: seo } = trpc.proxy.seo.find.useQuery({});
    const { data: socials } = trpc.proxy.socials.find.useQuery({ sort: "id" });
    const { data: article } = trpc.proxy.articles.findOne.useQuery({ slug });

    const router = useRouter();
    useRegisterActions(generateHydratedSpotlightActions(router, { global, seo, socials }), [
        global,
        seo,
        socials
    ]);

    return (
        <Layout title="Blog" global={global} seo={seo} socials={socials}>
            <main className="flex w-full max-w-4xl flex-1 flex-col items-center justify-center overflow-clip p-4 duration-150">
                <div className="my-6 mt-24 w-full">
                    {article && <MdxMarkdown {...article.mdxData.mdxSource} />}
                </div>
            </main>
        </Layout>
    );
};

export async function getStaticPaths() {
    const paths: string[] = [];

    let page = 1;
    let pageCount = 1;
    while (page <= pageCount) {
        const { data, meta } = await fetchAPI(
            "/articles",
            { fields: ["slug"], pagination: { page: 1, pageSize: 100 } },
            {},
            false
        );

        if (data) {
            paths.push(...data.map((article: any) => article.attributes.slug));
            pageCount = meta.pageCount;
        }
    }

    return {
        paths: paths.map(slug => ({ params: { slug } })),
        fallback: "blocking"
    };
}

export const getStaticProps: GetStaticProps = async ({
    params
}): Promise<GetStaticPropsResult<{}>> => {
    const slug = params?.slug;

    // Check slug exists
    try {
        if (!slug || typeof slug !== "string")
            throw new TRPCError({ code: "NOT_FOUND", message: "Please provide a slug" });

        const articles = await fetchAPI("/articles", {
            fields: ["slug"],
            filters: { slug: { $eq: slug } }
        });
        if (!articles || !Array.isArray(articles) || articles.length !== 1)
            throw new TRPCError({ code: "NOT_FOUND", message: "Article not found" });
    } catch (e) {
        return { notFound: true };
    }

    const ssg = createSSGHelpers({
        router: appRouter,
        ctx: {},
        transformer: superjson
    });

    await Promise.all([
        ssg.fetchQuery("global.find", {}),
        ssg.fetchQuery("seo.find", {}),
        ssg.fetchQuery("socials.find", { sort: "id" }),
        ssg.fetchQuery("articles.findOne", { slug })
    ]);

    return { props: { trpcState: ssg.dehydrate(), slug }, revalidate: NEXT_PUBLIC_REVALIDATE_TIME };
};

export default BlogPost;
