import {
    BookOpenIcon,
    ChevronRightIcon,
    GraduationCapIcon,
    LightbulbIcon,
    WrenchIcon,
} from "lucide-react";
import type { Metadata } from "next";
import { FadeIn } from "@/components/animation/fade-in";
import { EducationCard } from "@/components/education-card";
import { ExperienceCard } from "@/components/experience-card";
import { Image } from "@/components/image";
import { Markdown } from "@/components/mdx/markdown";
import { ProjectCard } from "@/components/project-card";
import { PublicationCard } from "@/components/publication-card";
import { TocNav, TocNavItem, TocProvider, TocSection } from "@/components/toc";
import {
    educationFind,
    experienceFind,
    landingFind,
    projectFind,
    publicationFind,
    settingsFind,
} from "@/lib/services/sanity/queries";
import { isReference } from "@/lib/services/sanity/utils";
import { cn } from "@/lib/utils";
import type { Education } from "@/lib/validators/education";
import type { Experience } from "@/lib/validators/experience";
import type { Landing } from "@/lib/validators/landing";
import type { Project } from "@/lib/validators/project";
import type { Publication } from "@/lib/validators/publication";
import type { Settings } from "@/lib/validators/settings";

export const revalidate = 60;
export const metadata: Metadata = {
    title: "Home",
};

interface IntroSectionProps {
    landing: Landing;
    settings: Settings;
}
function IntroSection({ landing, settings }: IntroSectionProps) {
    return (
        <section
            id="intro"
            className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-5xl items-center p-4"
        >
            <FadeIn className="-mt-16 text-left">
                {settings.avatar && !isReference(settings.avatar?.asset) && (
                    <div className="mx-2 sm:mx-4">
                        <Image
                            src={settings.avatar?.asset}
                            alt={settings.avatar.alt ?? "Avatar"}
                            width={128}
                            height={128}
                            className="h-20 w-20 select-none rounded-full shadow-md ring-2 ring-transparent ring-offset-2 ring-offset-background transition-all duration-500 will-change-transform hover:scale-105 hover:ring-ring/20 sm:h-24 sm:w-24"
                        />
                    </div>
                )}
                <h1 className="mt-6 text-balance font-extrabold text-4xl tracking-tight lg:text-5xl">
                    {landing.logline}
                </h1>
                {landing.intro && (
                    <div className="mt-8">
                        <Markdown
                            source={landing.intro}
                            className="text-muted-foreground"
                        />
                    </div>
                )}
            </FadeIn>
        </section>
    );
}

interface EducationSectionProps {
    educations: Education[];
}
function EducationSection({ educations }: EducationSectionProps) {
    return (
        <TocSection id="education">
            <FadeIn className="flex w-full flex-col gap-6">
                <h2 className="flex items-center justify-start font-bold text-2xl">
                    <div className="mr-3 rounded-full border border-border/60 bg-background/80 p-2 backdrop-blur-sm">
                        <GraduationCapIcon className="h-5 w-5" />
                    </div>
                    Education
                </h2>
                <div className="rounded-xl border border-border/60 bg-card/50 p-3 backdrop-blur-sm">
                    {educations.map(education => (
                        <FadeIn key={education.slug}>
                            <EducationCard education={education} />
                        </FadeIn>
                    ))}
                </div>
            </FadeIn>
        </TocSection>
    );
}

interface ExperienceSectionProps {
    experiences: Experience[];
}
function ExperienceSection({ experiences }: ExperienceSectionProps) {
    return (
        <TocSection id="experience">
            <FadeIn className="flex w-full flex-col gap-6">
                <h2 className="flex items-center justify-start font-bold text-2xl">
                    <div className="mr-3 rounded-full border border-border/60 bg-background/80 p-2 backdrop-blur-sm">
                        <WrenchIcon className="h-5 w-5" />
                    </div>
                    Experience
                </h2>
                <div className="rounded-xl border border-border/60 bg-card/50 p-3 backdrop-blur-sm">
                    {experiences.map(experience => (
                        <FadeIn key={experience.slug}>
                            <ExperienceCard experience={experience} />
                        </FadeIn>
                    ))}
                </div>
            </FadeIn>
        </TocSection>
    );
}

interface ProjectsSectionProps {
    projects: Project[];
    maxVisible?: number;
}
function ProjectsSection({ projects, maxVisible = 6 }: ProjectsSectionProps) {
    const isExpanded = false;
    const hasMore = projects.length > maxVisible;
    const displayedProjects = isExpanded
        ? projects
        : projects.slice(0, maxVisible);

    return (
        <TocSection id="projects">
            <FadeIn className="flex w-full flex-col gap-6">
                <h2 className="flex items-center justify-start font-bold text-2xl">
                    <div className="mr-3 rounded-full border border-border/60 bg-background/80 p-2 backdrop-blur-sm">
                        <LightbulbIcon className="h-5 w-5" />
                    </div>
                    Projects
                </h2>
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {displayedProjects.map(project => (
                            <FadeIn key={project.slug}>
                                <ProjectCard project={project} />
                            </FadeIn>
                        ))}
                    </div>
                    {hasMore && (
                        <div className="inline cursor-pointer text-muted-foreground/70 text-xs transition-colors hover:text-foreground">
                            <span className="inline-flex items-center gap-0.5 rounded-sm px-1 py-0.5">
                                <ChevronRightIcon
                                    className={cn(
                                        "size-3 transition-transform duration-200",
                                        { "rotate-90": isExpanded },
                                    )}
                                />
                                Show More
                            </span>
                        </div>
                    )}
                </div>
            </FadeIn>
        </TocSection>
    );
}

interface PublicationsSectionProps {
    publications: Publication[];
}
function PublicationsSection({ publications }: PublicationsSectionProps) {
    return (
        <TocSection id="publications">
            <FadeIn className="flex w-full flex-col gap-6">
                <h2 className="flex items-center justify-start font-bold text-2xl">
                    <div className="mr-3 rounded-full border border-border/60 bg-background/80 p-2 backdrop-blur-sm">
                        <BookOpenIcon className="h-5 w-5" />
                    </div>
                    Publications
                </h2>
                <div className="rounded-xl border border-border/60 bg-card/50 p-3 backdrop-blur-sm">
                    {publications.map(publication => (
                        <FadeIn key={publication.slug}>
                            <PublicationCard publication={publication} />
                        </FadeIn>
                    ))}
                </div>
            </FadeIn>
        </TocSection>
    );
}

export default async function Home() {
    const [landing, educations, experiences, projects, publications, settings] =
        await Promise.all([
            landingFind(),
            educationFind({ sort: ["endDate desc", "startDate desc"] }),
            experienceFind({ sort: ["endDate desc", "startDate desc"] }),
            projectFind({ sort: "endDate desc" }),
            publicationFind({ sort: "year desc" }),
            settingsFind(),
        ]);

    return (
        <TocProvider>
            <div className="flex flex-col">
                {landing.includeIntro && (
                    <IntroSection landing={landing} settings={settings} />
                )}
                <div className="mx-auto flex w-full max-w-7xl gap-8 p-4">
                    <main className="min-w-0 flex-1 space-y-16">
                        {landing.includeExperience && (
                            <ExperienceSection experiences={experiences} />
                        )}
                        {landing.includeEducation && (
                            <EducationSection educations={educations} />
                        )}
                        {landing.includeProjects && (
                            <ProjectsSection projects={projects} />
                        )}
                        {landing.includePublications && (
                            <PublicationsSection publications={publications} />
                        )}
                    </main>
                    <aside className="sticky top-24 hidden w-48 shrink-0 self-start xl:block">
                        <TocNav>
                            <TocNavItem id="experience">
                                <WrenchIcon /> Experience
                            </TocNavItem>
                            <TocNavItem id="education">
                                <GraduationCapIcon /> Education
                            </TocNavItem>
                            <TocNavItem id="projects">
                                <LightbulbIcon /> Projects
                            </TocNavItem>
                            <TocNavItem id="publications">
                                <BookOpenIcon /> Publications
                            </TocNavItem>
                        </TocNav>
                    </aside>
                </div>
            </div>
        </TocProvider>
    );
}
