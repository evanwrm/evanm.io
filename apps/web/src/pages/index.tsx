import { createSSGHelpers } from "@trpc/react/ssg";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import superjson from "superjson";
import FadeIn from "../components/animations/FadeIn.";
import Grid from "../components/Grid";
import Icon from "../components/Icon";
import Layout from "../components/layouts/Layout";
import ProjectCard from "../components/ProjectCard";
import PublicationCard from "../components/PublicationCard";
import RoundedContainer from "../components/RoundedContainer";
import { appRouter } from "../lib/server/routers/app";
import { trpc } from "../lib/utils/trpc";

const Home: NextPage = () => {
    const { data: global } = trpc.useQuery(["global.find"]);
    const { data: seo } = trpc.useQuery(["seo.find"]);
    const { data: socials } = trpc.useQuery(["socials.find", { sort: "id" }]);
    const { data: projects } = trpc.useQuery(["projects.find", { sort: "endDate:desc" }]);
    const { data: publications } = trpc.useQuery(["publications.find", { sort: "year:desc" }]);

    return (
        <Layout title="Home" global={global} seo={seo} socials={socials}>
            <main className="flex flex-col items-center justify-center flex-1 w-full max-w-3xl p-4 text-center duration-150 overflow-clip">
                <div className="my-6 mt-24">
                    <h1 className="text-6xl font-bold">
                        <span>Welcome to </span>
                        <a className="duration-150 text-primary" href="https://nextjs.org">
                            Next.js!
                        </a>
                    </h1>

                    <p className="mt-6 text-2xl">
                        <span>Get started by editing </span>
                        <code className="p-3 font-mono text-lg rounded-md bg-base-200">
                            pages/index.js
                        </code>
                    </p>
                </div>

                <FadeIn id="intro" className="flex flex-col w-full gap-8 my-6 scroll-mt-16">
                    <Grid className="gap-8">
                        <a
                            href="https://nextjs.org/docs"
                            className="flex-initial p-6 text-left duration-150 border rounded-xl border-base-content/10 hover:text-primary focus:text-primary"
                        >
                            <h2 className="mb-6 text-2xl font-bold">Documentation &rarr;</h2>
                            <p>Find in-depth information about Next.js features and API.</p>
                        </a>
                        <a
                            href="https://nextjs.org/learn"
                            className="flex-initial p-6 text-left duration-150 border rounded-xl border-base-content/10 hover:text-primary focus:text-primary"
                        >
                            <h2 className="mb-6 text-2xl font-bold">Learn &rarr;</h2>
                            <p>Learn about Next.js in an interactive course with quizzes!</p>
                        </a>
                        <a
                            href="https://github.com/vercel/next.js/tree/master/examples"
                            className="flex-initial p-6 text-left duration-150 border rounded-xl border-base-content/10 hover:text-primary focus:text-primary"
                        >
                            <h2 className="mb-6 text-2xl font-bold">Examples &rarr;</h2>
                            <p>Discover and deploy boilerplate example Next.js projects.</p>
                        </a>
                        <a
                            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                            className="flex-initial p-6 text-left duration-150 border rounded-xl border-base-content/10 hover:text-primary focus:text-primary"
                        >
                            <h2 className="mb-6 text-2xl font-bold">Deploy &rarr;</h2>
                            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
                        </a>
                    </Grid>
                </FadeIn>

                <FadeIn id="projects" className="flex flex-col w-full gap-8 my-6 scroll-mt-16">
                    <h2 className="flex items-center justify-start text-2xl font-bold">
                        <RoundedContainer>
                            <Icon icon="HiOutlineLightBulb" className="w-6 h-6" />
                        </RoundedContainer>
                        Projects
                    </h2>
                    <FadeIn>
                        <Grid className="gap-8">
                            {projects?.map(project => (
                                <div className="flex justify-center space-x-8" key={project.name}>
                                    <ProjectCard
                                        project={project}
                                        key={project.name + project.startDate}
                                    />
                                </div>
                            ))}
                        </Grid>
                    </FadeIn>
                </FadeIn>

                <FadeIn id="publications" className="flex flex-col w-full gap-8 my-6 scroll-mt-16">
                    <h2 className="flex items-center justify-start text-2xl font-bold">
                        <RoundedContainer>
                            <Icon icon="SiBookstack" className="w-6 h-6" />
                        </RoundedContainer>
                        Recent Publications
                    </h2>
                    <FadeIn>
                        <Grid className="gap-8">
                            {publications?.map(publication => (
                                <div
                                    className="flex justify-center space-x-8"
                                    key={publication.title}
                                >
                                    <PublicationCard
                                        publication={publication}
                                        key={publication.title + publication.year}
                                    />
                                </div>
                            ))}
                        </Grid>
                    </FadeIn>
                </FadeIn>
            </main>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<{}>> => {
    const ssg = await createSSGHelpers({
        router: appRouter,
        ctx: {},
        transformer: superjson
    });

    await Promise.all([
        ssg.fetchQuery("global.find"),
        ssg.fetchQuery("seo.find"),
        ssg.fetchQuery("socials.find", { sort: "id" }),
        ssg.fetchQuery("projects.find", { sort: "endDate:desc" }),
        ssg.fetchQuery("publications.find", { sort: "year:desc" })
    ]);

    return { props: { trpcState: ssg.dehydrate() }, revalidate: 60 };
};

export default Home;
