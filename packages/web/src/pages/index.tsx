import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { dehydrate, DehydratedState, QueryClient, useQuery } from "react-query";
import FadeIn from "../components/FadeIn.";
import Grid from "../components/Grid";
import Icon from "../components/Icon";
import Layout from "../components/layouts/Layout";
import ProjectCard from "../components/ProjectCard";
import PublicationCard from "../components/PublicationCard";
import RoundedContainer from "../components/RoundedContainer";
import { getGlobal, getProjects, getPublications, getSeo, getSocials } from "../lib/services";

interface Props {
    errors?: string;
    dehydratedState: DehydratedState;
}

const Home: NextPage<Props> = ({}: Props) => {
    const { data: global } = useQuery("global", getGlobal);
    const { data: seo } = useQuery("seo", getSeo);
    const { data: socials } = useQuery("socials", () => getSocials({ sort: "id" }));
    const { data: projects } = useQuery("projects", () => getProjects({ sort: "endDate:desc" }));
    const { data: publications } = useQuery("publications", () =>
        getPublications({ sort: "year:desc" })
    );

    return (
        <Layout title="Home" global={global} seo={seo} socials={socials}>
            <main className="flex w-full max-w-3xl overflow-clip flex-1 flex-col items-center justify-center p-4 text-center duration-150">
                <div className="my-6">
                    <h1 className="text-6xl font-bold">
                        <span>Welcome to </span>
                        <a className="text-primary duration-150" href="https://nextjs.org">
                            Next.js!
                        </a>
                    </h1>

                    <p className="mt-6 text-2xl">
                        <span>Get started by editing </span>
                        <code className="rounded-md bg-base-200 p-3 font-mono text-lg">
                            pages/index.js
                        </code>
                    </p>
                </div>

                <FadeIn id="intro" className="my-6 scroll-mt-16 w-full flex flex-col gap-8">
                    <Grid className="gap-8">
                        <a
                            href="https://nextjs.org/docs"
                            className="rounded-xl border border-base-content/10 flex-initial p-6 text-left duration-150 hover:text-primary focus:text-primary"
                        >
                            <h2 className="mb-6 text-2xl font-bold">Documentation &rarr;</h2>
                            <p>Find in-depth information about Next.js features and API.</p>
                        </a>
                        <a
                            href="https://nextjs.org/learn"
                            className="rounded-xl border border-base-content/10 flex-initial p-6 text-left duration-150 hover:text-primary focus:text-primary"
                        >
                            <h2 className="mb-6 text-2xl font-bold">Learn &rarr;</h2>
                            <p>Learn about Next.js in an interactive course with quizzes!</p>
                        </a>
                        <a
                            href="https://github.com/vercel/next.js/tree/master/examples"
                            className="rounded-xl border border-base-content/10 flex-initial p-6 text-left duration-150 hover:text-primary focus:text-primary"
                        >
                            <h2 className="mb-6 text-2xl font-bold">Examples &rarr;</h2>
                            <p>Discover and deploy boilerplate example Next.js projects.</p>
                        </a>
                        <a
                            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                            className="rounded-xl border border-base-content/10 flex-initial p-6 text-left duration-150 hover:text-primary focus:text-primary"
                        >
                            <h2 className="mb-6 text-2xl font-bold">Deploy &rarr;</h2>
                            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
                        </a>
                    </Grid>
                </FadeIn>

                <FadeIn id="projects" className="my-6 scroll-mt-16 w-full flex flex-col gap-8">
                    <h2 className="text-2xl font-bold flex justify-start items-center">
                        <RoundedContainer>
                            <Icon icon="HiOutlineLightBulb" className="w-6 h-6" />
                        </RoundedContainer>
                        Projects
                    </h2>
                    <FadeIn>
                        <Grid className="gap-8">
                            {projects?.map(project => (
                                <div className="flex space-x-8" key={project.name}>
                                    <ProjectCard
                                        project={project}
                                        key={project.name + project.startDate}
                                    />
                                </div>
                            ))}
                        </Grid>
                    </FadeIn>
                </FadeIn>

                <FadeIn id="publications" className="my-6 scroll-mt-16 w-full flex flex-col gap-8">
                    <h2 className="text-2xl font-bold flex justify-start items-center">
                        <RoundedContainer>
                            <Icon icon="SiBookstack" className="w-6 h-6" />
                        </RoundedContainer>
                        Recent Publications
                    </h2>
                    <FadeIn>
                        <Grid className="gap-8">
                            {publications?.map(publication => (
                                <div className="flex space-x-8" key={publication.title}>
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

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery("global", getGlobal),
        queryClient.prefetchQuery("seo", getSeo),
        queryClient.prefetchQuery("socials", () => getSocials({ sort: "id" })),
        queryClient.prefetchQuery("projects", () => getProjects({ sort: "endDate:desc" })),
        queryClient.prefetchQuery("publications", () => getPublications({ sort: "year:desc" }))
    ]);

    return { props: { dehydratedState: dehydrate(queryClient) }, revalidate: 60 };
};

export default Home;
