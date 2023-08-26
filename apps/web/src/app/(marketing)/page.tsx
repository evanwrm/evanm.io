import FadeIn from "@/components/animation/FadeIn.";
import EducationCard from "@/components/EducationCard";
import ExperienceCard from "@/components/ExperienceCard";
import Icon from "@/components/Icon";
import { Image } from "@/components/Image";
import Grid from "@/components/layouts/Grid";
import RoundedContainer from "@/components/layouts/RoundedContainer";
import MdxMarkdown from "@/components/mdx/MdxMarkdown";
import ProjectCard from "@/components/ProjectCard";
import PublicationCard from "@/components/PublicationCard";
import { createInnerContext } from "@/lib/server/context";
import { appRouter } from "@/lib/server/routers/app";
import { isReference } from "@/lib/services/sanity/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home"
};

const Home = async () => {
    const caller = appRouter.createCaller(await createInnerContext());
    const [landing, educations, experiences, projects, publications, settings] = await Promise.all([
        caller.landing.find(),
        caller.education.find({ sort: ["endDate desc", "startDate desc"] }),
        caller.experience.find({ sort: ["endDate desc", "startDate desc"] }),
        caller.projects.find({ sort: "endDate desc" }),
        caller.publications.find({ sort: "year desc" }),
        caller.settings.find()
    ]);

    return (
        <main className="flex w-full max-w-4xl flex-1 flex-col items-center justify-center">
            {landing.includeIntro && (
                <section
                    id="intro"
                    className="flex min-h-screen w-full flex-col items-center justify-evenly px-4"
                >
                    <div className="my-6 text-left">
                        {settings.avatar && !isReference(settings.avatar?.asset) && (
                            <div className="mx-2 my-4 sm:mx-4">
                                <Image
                                    image={settings.avatar?.asset}
                                    alt={settings.avatar.alt ?? "Avatar"}
                                    width={128}
                                    height={128}
                                    className="h-20 w-20 select-none rounded-full shadow-md transition duration-500 will-change-transform hover:scale-105 sm:h-24 sm:w-24"
                                />
                            </div>
                        )}
                        <h1 className="text-4xl font-bold sm:text-5xl">{landing.logline}</h1>
                        {landing.intro && (
                            <div className="mt-12">
                                <MdxMarkdown source={landing.intro} />
                            </div>
                        )}
                    </div>
                </section>
            )}
            {landing.includeExperience && (
                <section
                    id="experience"
                    className="flex w-full flex-col items-center justify-center px-4 first:mt-24"
                >
                    <FadeIn className="my-6 flex w-full scroll-mt-16 flex-col gap-8">
                        <h2 className="flex items-center justify-start text-2xl font-bold">
                            <RoundedContainer>
                                <Icon.FaToolbox className="h-6 w-6" />
                            </RoundedContainer>
                            Experience
                        </h2>
                        <FadeIn>
                            {experiences.map(experience => (
                                <FadeIn key={experience.slug}>
                                    <ExperienceCard experience={experience} />
                                </FadeIn>
                            ))}
                        </FadeIn>
                    </FadeIn>
                </section>
            )}
            {landing.includeEducation && (
                <section
                    id="education"
                    className="flex w-full flex-col items-center justify-center px-4 first:mt-24"
                >
                    <FadeIn className="my-6 flex w-full scroll-mt-16 flex-col gap-8">
                        <h2 className="flex items-center justify-start text-2xl font-bold">
                            <RoundedContainer>
                                <Icon.FaGraduationCap className="h-6 w-6" />
                            </RoundedContainer>
                            Education
                        </h2>
                        <FadeIn>
                            {educations.map(education => (
                                <FadeIn key={education.slug}>
                                    <EducationCard education={education} />
                                </FadeIn>
                            ))}
                        </FadeIn>
                    </FadeIn>
                </section>
            )}
            {landing.includeProjects && (
                <section
                    id="projects"
                    className="flex w-full flex-col items-center justify-center px-4 first:mt-24"
                >
                    <FadeIn className="my-6 flex w-full scroll-mt-16 flex-col gap-8">
                        <h2 className="flex items-center justify-start text-2xl font-bold">
                            <RoundedContainer>
                                <Icon.HiOutlineLightBulb className="h-6 w-6" />
                            </RoundedContainer>
                            Projects
                        </h2>
                        <FadeIn>
                            <Grid className="gap-8">
                                {projects.map(project => (
                                    <FadeIn key={project.slug}>
                                        <ProjectCard project={project} />
                                    </FadeIn>
                                ))}
                            </Grid>
                        </FadeIn>
                    </FadeIn>
                </section>
            )}
            {landing.includePublications && (
                <section
                    id="publications"
                    className="flex w-full flex-col items-center justify-center px-4 first:mt-24"
                >
                    <FadeIn className="my-6 flex w-full scroll-mt-16 flex-col gap-8">
                        <h2 className="flex items-center justify-start text-2xl font-bold">
                            <RoundedContainer>
                                <Icon.SiBookstack className="h-6 w-6" />
                            </RoundedContainer>
                            Recent Publications
                        </h2>
                        <FadeIn>
                            {publications.map(publication => (
                                <FadeIn className="my-4" key={publication.slug}>
                                    <PublicationCard publication={publication} />
                                </FadeIn>
                            ))}
                        </FadeIn>
                    </FadeIn>
                </section>
            )}
        </main>
    );
};

export default Home;
export const revalidate = 60;
