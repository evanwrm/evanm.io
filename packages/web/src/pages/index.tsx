import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import Layout from "../components/layouts/Layout";
import { Global } from "../interfaces/Global";
import { Project } from "../interfaces/Project";
import { Seo } from "../interfaces/Seo";
import { SocialLink } from "../interfaces/Social";
import { NotFoundError } from "../lib/errors";
import { getGlobal, getProjects, getSeo, getSocials } from "../lib/services";

interface Props {
    global: Global | null;
    seo: Seo | null;
    socials: SocialLink[] | null;
    projects: Project[] | null;
    errors?: string;
    // dehydratedState: DehydratedState;
}

// global: initialGlobal,
// seo: initialSeo,
// socials: initialSocial,
// projects: initialProjects
const Home: NextPage<Props> = ({ global, socials }: Props) => {
    // const { data: global } = useQuery("global", getGlobal, { initialData: initialGlobal });
    // const { data: seo } = useQuery("seo", getSeo, { initialData: initialSeo });
    // const { data: socials } = useQuery("socials", getSocials, { initialData: initialSocial });
    // const { data: projects } = useQuery("projects", getProjects, { initialData: initialProjects });

    return (
        <Layout global={global ?? undefined} socials={socials ?? undefined}>
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
                            <h3 className="mb-6 text-2xl font-bold">Documentation &rarr;</h3>
                            <p>Find in-depth information about Next.js features and API.</p>
                        </a>

                        <a
                            href="https://nextjs.org/learn"
                            className="w-1/2 rounded-xl border border-base-content/10 flex-initial p-6 text-left transition-colors hover:text-primary focus:text-primary"
                        >
                            <h3 className="mb-6 text-2xl font-bold">Learn &rarr;</h3>
                            <p>Learn about Next.js in an interactive course with quizzes!</p>
                        </a>
                    </div>
                    <div className="flex space-x-8">
                        <a
                            href="https://github.com/vercel/next.js/tree/master/examples"
                            className="w-1/2 rounded-xl border border-base-content/10 flex-initial p-6 text-left transition-colors hover:text-primary focus:text-primary"
                        >
                            <h3 className="mb-6 text-2xl font-bold">Examples &rarr;</h3>
                            <p>Discover and deploy boilerplate example Next.js projects.</p>
                        </a>
                        <a
                            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                            className="w-1/2 rounded-xl border border-base-content/10 flex-initial p-6 text-left transition-colors hover:text-primary focus:text-primary"
                        >
                            <h3 className="mb-6 text-2xl font-bold">Deploy &rarr;</h3>
                            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
                        </a>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
    let global = null,
        seo = null,
        socials = null,
        projects = null,
        errors = null;

    try {
        [global, seo, socials, projects] = await Promise.all([
            getGlobal(),
            getSeo(),
            getSocials({ sort: "id" }),
            getProjects()
        ]);
        if (!global) throw new NotFoundError("Failed to fetch Global data");
        if (!seo) throw new NotFoundError("Failed to fetch Seo data");
        if (!socials) throw new NotFoundError("Failed to fetch Social data");
        if (!projects) throw new NotFoundError("Failed to fetch Project data");
    } catch (err: any) {
        errors = err.message;
    }

    return { props: { global, seo, socials, projects, errors } }; // revalidate: 60
};
// export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
//     const queryClient = new QueryClient();

//     await Promise.all([
//         queryClient.prefetchQuery("global", getGlobal),
//         queryClient.prefetchQuery("seo", getSeo),
//         queryClient.prefetchQuery("socials", () => getSocials({ sort: "id" })),
//         queryClient.prefetchQuery("projects", getProjects)
//     ]);

//     return { props: { dehydratedState: dehydrate(queryClient) }, revalidate: 60 };
// };

export default Home;
