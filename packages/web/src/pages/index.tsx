import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { dehydrate, DehydratedState, QueryClient, useQuery } from "react-query";
import Layout from "../components/layouts/Layout";
import ProjectCard from "../components/ProjectCard";
import PublicationCard from "../components/PublicationCard";
import { getGlobal, getProjects, getPublications, getSeo, getSocials } from "../lib/services";

interface Props {
    errors?: string;
    dehydratedState: DehydratedState;
}

const Home: NextPage<Props> = ({}: Props) => {
    const { data: global } = useQuery("global", getGlobal);
    const { data: seo } = useQuery("seo", getSeo);
    const { data: socials } = useQuery("socials", getSocials);
    const { data: projects } = useQuery("projects", getProjects);
    const { data: publications } = useQuery("publications", getPublications);

    return (
        <Layout title="Home" global={global} seo={seo} socials={socials}>
            <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
                <h1 className="text-6xl font-bold">
                    Welcome to{" "}
                    <a className="text-primary" href="https://nextjs.org">
                        Next.js!
                    </a>
                </h1>

                <p className="my-6 text-2xl">
                    Get started by editing{" "}
                    <code className="rounded-md bg-base-200 p-3 font-mono text-lg">
                        pages/index.js
                    </code>
                </p>

                <div className="mt-12 flex space-y-8 max-w-3xl flex-wrap sm:w-full">
                    <div className="flex space-x-8">
                        <a
                            href="https://nextjs.org/docs"
                            className="w-1/2 rounded-xl border border-base-content/10 flex-initial p-6 text-left transition-colors hover:text-primary focus:text-primary"
                        >
                            <h2 className="mb-6 text-2xl font-bold">Documentation &rarr;</h2>
                            <p>Find in-depth information about Next.js features and API.</p>
                        </a>

                        <a
                            href="https://nextjs.org/learn"
                            className="w-1/2 rounded-xl border border-base-content/10 flex-initial p-6 text-left transition-colors hover:text-primary focus:text-primary"
                        >
                            <h2 className="mb-6 text-2xl font-bold">Learn &rarr;</h2>
                            <p>Learn about Next.js in an interactive course with quizzes!</p>
                        </a>
                    </div>
                    <div className="flex space-x-8">
                        <a
                            href="https://github.com/vercel/next.js/tree/master/examples"
                            className="w-1/2 rounded-xl border border-base-content/10 flex-initial p-6 text-left transition-colors hover:text-primary focus:text-primary"
                        >
                            <h2 className="mb-6 text-2xl font-bold">Examples &rarr;</h2>
                            <p>Discover and deploy boilerplate example Next.js projects.</p>
                        </a>
                        <a
                            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                            className="w-1/2 rounded-xl border border-base-content/10 flex-initial p-6 text-left transition-colors hover:text-primary focus:text-primary"
                        >
                            <h2 className="mb-6 text-2xl font-bold">Deploy &rarr;</h2>
                            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
                        </a>
                    </div>
                </div>

                <div className="mt-12 flex space-y-8 max-w-3xl flex-wrap sm:w-full">
                    {projects?.map(project => (
                        <div className="flex space-x-8" key={project.name}>
                            <ProjectCard project={project} key={project.name + project.startDate} />
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex space-y-8 max-w-3xl flex-wrap sm:w-full">
                    {publications?.map(publication => (
                        <div className="flex space-x-8" key={publication.title}>
                            <PublicationCard
                                publication={publication}
                                key={publication.title + publication.year}
                            />
                        </div>
                    ))}
                </div>
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
        queryClient.prefetchQuery("projects", getProjects),
        queryClient.prefetchQuery("publications", getPublications)
    ]);

    return { props: { dehydratedState: dehydrate(queryClient) }, revalidate: 60 };
};

export default Home;
