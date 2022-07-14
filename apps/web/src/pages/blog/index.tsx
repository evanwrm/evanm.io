import { createSSGHelpers } from "@trpc/react/ssg";
import { useRegisterActions } from "kbar";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { useRouter } from "next/router";
import superjson from "superjson";
import FadeIn from "../../components/animations/FadeIn.";
import Grid from "../../components/layout/Grid";
import Layout from "../../components/layouts/Layout";
import { appRouter } from "../../lib/server/routers/app";
import { generateHydratedSpotlightActions } from "../../lib/spotlightActions";
import { NEXT_PUBLIC_REVALIDATE_TIME } from "../../lib/utils/constants";
import { trpc } from "../../lib/utils/trpc";

const Blog = () => {
    const { data: global } = trpc.proxy.global.find.useQuery({});
    const { data: seo } = trpc.proxy.seo.find.useQuery({});
    const { data: socials } = trpc.proxy.socials.find.useQuery({ sort: "id" });
    // const { data: articles } = trpc.proxy.articles.find.useQuery({ sort: "publishedAt:desc" });

    const router = useRouter();
    useRegisterActions(generateHydratedSpotlightActions(router, { global, seo, socials }), [
        global,
        seo,
        socials
    ]);

    return (
        <Layout title="Blog" global={global} seo={seo} socials={socials}>
            <main className="flex w-full max-w-4xl flex-1 flex-col items-center justify-center overflow-clip p-4 duration-150">
                <FadeIn className="my-6 flex w-full scroll-mt-16 flex-col gap-8">
                    <Grid className="gap-8">
                        <a
                            href="https://nextjs.org/docs"
                            className="border-base-content/10 hover:text-primary focus:text-primary flex-initial rounded-xl border p-6 text-left duration-150"
                        >
                            <h2 className="mb-6 text-2xl font-bold">Documentation &rarr;</h2>
                            <p>Find in-depth information about Next.js features and API.</p>
                        </a>
                        <a
                            href="https://nextjs.org/learn"
                            className="border-base-content/10 hover:text-primary focus:text-primary flex-initial rounded-xl border p-6 text-left duration-150"
                        >
                            <h2 className="mb-6 text-2xl font-bold">Learn &rarr;</h2>
                            <p>Learn about Next.js in an interactive course with quizzes!</p>
                        </a>
                        <a
                            href="https://github.com/vercel/next.js/tree/master/examples"
                            className="border-base-content/10 hover:text-primary focus:text-primary flex-initial rounded-xl border p-6 text-left duration-150"
                        >
                            <h2 className="mb-6 text-2xl font-bold">Examples &rarr;</h2>
                            <p>Discover and deploy boilerplate example Next.js projects.</p>
                        </a>
                        <a
                            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                            className="border-base-content/10 hover:text-primary focus:text-primary flex-initial rounded-xl border p-6 text-left duration-150"
                        >
                            <h2 className="mb-6 text-2xl font-bold">Deploy &rarr;</h2>
                            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
                        </a>
                    </Grid>
                </FadeIn>
            </main>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<{}>> => {
    const ssg = createSSGHelpers({
        router: appRouter,
        ctx: {},
        transformer: superjson
    });

    await Promise.all([
        ssg.fetchQuery("global.find", {}),
        ssg.fetchQuery("seo.find", {}),
        ssg.fetchQuery("socials.find", { sort: "id" }),
        ssg.fetchQuery("articles.find", { sort: "publishedAt:desc" })
    ]);

    return { props: { trpcState: ssg.dehydrate() }, revalidate: NEXT_PUBLIC_REVALIDATE_TIME };
};

export default Blog;
