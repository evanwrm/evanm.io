import { createSSGHelpers } from "@trpc/react/ssg";
import { useRegisterActions } from "kbar";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { useRouter } from "next/router";
import superjson from "superjson";
import FadeIn from "../components/animations/FadeIn.";
import Icon from "../components/Icon";
import Grid from "../components/layout/Grid";
import Layout from "../components/layouts/Layout";
import ProjectCard from "../components/ProjectCard";
import PublicationCard from "../components/PublicationCard";
import RoundedContainer from "../components/RoundedContainer";
import { appRouter } from "../lib/server/routers/app";
import { generateHydratedSpotlightActions } from "../lib/spotlightActions";
import { NEXT_PUBLIC_REVALIDATE_TIME } from "../lib/utils/constants";
import { trpc } from "../lib/utils/trpc";

const Home = () => {
    const { data: global } = trpc.proxy.global.find.useQuery({});
    const { data: seo } = trpc.proxy.seo.find.useQuery({});
    const { data: socials } = trpc.proxy.socials.find.useQuery({ sort: "id" });
    const { data: projects } = trpc.proxy.projects.find.useQuery({ sort: "endDate:desc" });
    const { data: publications } = trpc.proxy.publications.find.useQuery({ sort: "year:desc" });

    const router = useRouter();
    useRegisterActions(generateHydratedSpotlightActions(router, { global, seo, socials }), [
        global,
        seo,
        socials
    ]);

    return (
        <Layout title="Home" global={global} seo={seo} socials={socials}>
            <main className="flex w-full max-w-4xl flex-1 flex-col items-center justify-center overflow-clip p-4 duration-150">
                <div className="my-6 mt-24 text-center">
                    <h1 className="text-6xl font-bold">
                        <span>Welcome to </span>
                        <a className="text-primary duration-150" href="https://nextjs.org">
                            Next.js!
                        </a>
                    </h1>

                    <p className="mt-6 text-2xl">
                        <span>Get started by editing </span>
                        <code className="bg-base-200 rounded-md p-3 font-mono text-lg">
                            pages/index.js
                        </code>
                    </p>
                </div>

                <FadeIn id="intro" className="my-6 flex w-full scroll-mt-16 flex-col gap-8">
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

                <FadeIn id="projects" className="my-6 flex w-full scroll-mt-16 flex-col gap-8">
                    <h2 className="flex items-center justify-start text-2xl font-bold">
                        <RoundedContainer>
                            <Icon icon="HiOutlineLightBulb" className="h-6 w-6" />
                        </RoundedContainer>
                        Projects
                    </h2>
                    <FadeIn>
                        <Grid className="gap-8">
                            {projects?.map(project => (
                                <ProjectCard
                                    project={project}
                                    key={project.name + project.startDate}
                                />
                            ))}
                        </Grid>
                    </FadeIn>
                </FadeIn>

                <FadeIn id="publications" className="my-6 flex w-full scroll-mt-16 flex-col gap-8">
                    <h2 className="flex items-center justify-start text-2xl font-bold">
                        <RoundedContainer>
                            <Icon icon="SiBookstack" className="h-6 w-6" />
                        </RoundedContainer>
                        Recent Publications
                    </h2>
                    <FadeIn>
                        <Grid className="gap-8">
                            {publications?.map(publication => (
                                <PublicationCard
                                    publication={publication}
                                    key={publication.title + publication.year}
                                />
                            ))}
                        </Grid>
                    </FadeIn>
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
        ssg.fetchQuery("projects.find", { sort: "endDate:desc" }),
        ssg.fetchQuery("publications.find", { sort: "year:desc" })
    ]);

    return { props: { trpcState: ssg.dehydrate() }, revalidate: NEXT_PUBLIC_REVALIDATE_TIME };
};

export default Home;
