import { FadeIn } from "@/components/animation/fade-in";
import { EducationCard } from "@/components/education-card";
import { ExperienceCard } from "@/components/experience-card";
import { Icon } from "@/components/icon";
import { Image } from "@/components/image";
import { Markdown } from "@/components/mdx/markdown";
import { ProjectCard } from "@/components/project-card";
import { PublicationCard } from "@/components/publication-card";
import {
    educationFind,
    experienceFind,
    landingFind,
    projectFind,
    publicationFind,
    settingsFind
} from "@/lib/services/sanity/queries";
import { isReference } from "@/lib/services/sanity/utils";
import { Metadata } from "next";

export const experimental_ppr = true;
export const revalidate = 60;

export const metadata: Metadata = {
    title: "Home"
};

export default async function Home() {
    const [landing, educations, experiences, projects, publications, settings] = await Promise.all([
        landingFind(),
        educationFind({ sort: ["endDate desc", "startDate desc"] }),
        experienceFind({ sort: ["endDate desc", "startDate desc"] }),
        projectFind({ sort: "endDate desc" }),
        publicationFind({ sort: "year desc" }),
        settingsFind()
    ]);

    return (
        <div className="flex flex-col gap-4">
            {landing.includeIntro && (
                <section
                    id="intro"
                    className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-screen-lg items-center p-4"
                >
                    <div className="-mt-16 text-left">
                        {settings.avatar && !isReference(settings.avatar?.asset) && (
                            <div className="mx-2 sm:mx-4">
                                <Image
                                    image={settings.avatar?.asset}
                                    alt={settings.avatar.alt ?? "Avatar"}
                                    width={128}
                                    height={128}
                                    className="h-20 w-20 select-none rounded-full shadow-md transition duration-500 will-change-transform hover:scale-105 sm:h-24 sm:w-24"
                                />
                            </div>
                        )}
                        <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight lg:text-5xl">
                            {landing.logline}
                        </h1>
                        {landing.intro && (
                            <div className="mt-8">
                                <Markdown source={landing.intro} />
                            </div>
                        )}
                    </div>
                </section>
            )}
            {landing.includeExperience && (
                <section id="experience" className="mx-auto w-full max-w-screen-xl p-4">
                    <FadeIn className="my-6 flex w-full scroll-mt-16 flex-col gap-8">
                        <h2 className="flex items-center justify-start text-2xl font-bold">
                            <div className="bg-background mr-2 rounded-full border p-2">
                                <Icon.FaToolbox className="h-6 w-6" />
                            </div>
                            Experience
                        </h2>
                        <FadeIn>
                            {experiences.map(experience => (
                                <FadeIn
                                    key={experience.slug}
                                    className="border-t first:border-none"
                                >
                                    <ExperienceCard
                                        experience={experience}
                                        className="prose-li:my-px my-4"
                                    />
                                </FadeIn>
                            ))}
                        </FadeIn>
                    </FadeIn>
                </section>
            )}
            {landing.includeEducation && (
                <section id="education" className="mx-auto w-full max-w-screen-xl p-4">
                    <FadeIn className="my-6 flex w-full scroll-mt-16 flex-col gap-8">
                        <h2 className="flex items-center justify-start text-2xl font-bold">
                            <div className="bg-background mr-2 rounded-full border p-2">
                                <Icon.FaGraduationCap className="h-6 w-6" />
                            </div>
                            Education
                        </h2>
                        <FadeIn>
                            {educations.map(education => (
                                <FadeIn key={education.slug} className="border-t first:border-none">
                                    <EducationCard
                                        education={education}
                                        className="prose-li:my-px my-4"
                                    />
                                </FadeIn>
                            ))}
                        </FadeIn>
                    </FadeIn>
                </section>
            )}
            {landing.includeProjects && (
                <section id="projects" className="mx-auto w-full max-w-screen-xl p-4">
                    <FadeIn className="my-6 flex w-full scroll-mt-16 flex-col gap-8">
                        <h2 className="flex items-center justify-start text-2xl font-bold">
                            <div className="bg-background mr-2 rounded-full border p-2">
                                <Icon.HiOutlineLightBulb className="h-6 w-6" />
                            </div>
                            Projects
                        </h2>
                        <FadeIn>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {projects.map(project => (
                                    <FadeIn key={project.slug}>
                                        <ProjectCard project={project} />
                                    </FadeIn>
                                ))}
                            </div>
                        </FadeIn>
                    </FadeIn>
                </section>
            )}
            {landing.includePublications && (
                <section id="publications" className="mx-auto w-full max-w-screen-xl p-4">
                    <FadeIn className="my-6 flex w-full scroll-mt-16 flex-col gap-8">
                        <h2 className="flex items-center justify-start text-2xl font-bold">
                            <div className="bg-background mr-2 rounded-full border p-2">
                                <Icon.SiBookstack className="h-6 w-6" />
                            </div>
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
        </div>
    );
}
