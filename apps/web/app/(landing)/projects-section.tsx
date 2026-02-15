"use client";

import { ChevronRightIcon, LightbulbIcon } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/animation/fade-in";
import { ProjectCard } from "@/components/project-card";
import { TocSection } from "@/components/toc";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/validators/project";

interface ProjectsSectionProps {
    projects: Project[];
    maxVisible?: number;
}
export function ProjectsSection({
    projects,
    maxVisible = 6,
}: ProjectsSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
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
                        <button
                            type="button"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="inline cursor-pointer text-muted-foreground/70 text-xs transition-colors hover:text-foreground"
                        >
                            <span className="inline-flex items-center gap-0.5 rounded-sm px-1 py-0.5">
                                <ChevronRightIcon
                                    className={cn(
                                        "size-3 transition-transform duration-200",
                                        { "rotate-90": isExpanded },
                                    )}
                                />
                                {isExpanded ? "Show Less" : "Show More"}
                            </span>
                        </button>
                    )}
                </div>
            </FadeIn>
        </TocSection>
    );
}
