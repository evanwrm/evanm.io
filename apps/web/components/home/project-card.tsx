import { addYears, format } from "date-fns";
import { CalendarIcon, ExternalLinkIcon } from "lucide-react";
import { getIcon } from "@/components/icon";
import { Image } from "@/components/image";
import { Link } from "@/components/link";
import { Badge } from "@/components/ui/badge";
import { isReference } from "@/lib/sanity/utils";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/validators/project";

interface Props {
    project: Project;
    maxSkillsToShow?: number;
}

export const ProjectCard = ({ project, maxSkillsToShow = 6 }: Props) => {
    const RepositoryIcon =
        project.repositoryUrl && getIcon(project.repositoryUrl);
    const newThreshold = addYears(new Date(), -1);
    const projectDate = project.endDate ?? project.startDate;
    const isNew = new Date(projectDate ?? project._createdAt) > newThreshold;

    return (
        <div
            className={cn(
                "group flex h-full flex-col gap-4 overflow-hidden rounded-xl",
                "border-border/60 bg-card/50 text-card-foreground border pb-6 shadow-sm backdrop-blur-sm",
                "ring-offset-background transition-all duration-300",
                "hover:border-border hover:bg-card hover:ring-ring/20 hover:ring-2 hover:ring-offset-2",
            )}
        >
            {project.thumbnail && !isReference(project.thumbnail.asset) ? (
                <div className="relative h-40 overflow-hidden">
                    <Image
                        src={project.thumbnail.asset}
                        alt={project.thumbnail.alt ?? project.title}
                        width={426}
                        height={160}
                        quality="high"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            ) : (
                <div className="pt-2" />
            )}
            <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6">
                <div className="flex items-center gap-2">
                    <div className="text-sm leading-snug font-semibold tracking-tight">
                        {project.title}
                    </div>
                    {project.repositoryUrl && RepositoryIcon && (
                        <Link
                            href={project.repositoryUrl}
                            aria-label="Repository"
                            className="flex size-4 items-center justify-center transition-all hover:-translate-y-0.5 hover:scale-110"
                        >
                            <RepositoryIcon className="size-3.5" />
                        </Link>
                    )}
                    {project.siteUrl && (
                        <Link
                            href={project.siteUrl}
                            aria-label="Live site"
                            className="flex size-4 items-center justify-center transition-all hover:-translate-y-0.5 hover:scale-110"
                        >
                            <ExternalLinkIcon className="size-3.5" />
                        </Link>
                    )}
                    {projectDate && (
                        <span className="text-muted-foreground ml-auto inline-flex shrink-0 items-center gap-1 font-mono text-xs tabular-nums">
                            <CalendarIcon className="h-3 w-3" />
                            {format(new Date(projectDate), "MMM yyyy")}
                        </span>
                    )}
                    {isNew && (
                        <span className="relative shrink-0 rounded-sm bg-linear-to-r from-emerald-500/20 to-teal-500/20 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-emerald-600 uppercase ring-1 ring-emerald-500/30 dark:text-emerald-400">
                            <span className="absolute inset-0 animate-pulse rounded-sm bg-emerald-500/10" />
                            <span className="relative">New</span>
                        </span>
                    )}
                </div>
            </div>
            <div className="px-6">
                <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                    {project.logline}
                </p>
            </div>
            {project.skills && project.skills.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-1 px-6">
                    {project.skills.slice(0, maxSkillsToShow).map(skill => {
                        if (isReference(skill)) return null;
                        const SkillIcon = getIcon(skill.iconId);
                        return (
                            <Badge
                                key={skill.name}
                                variant="secondary"
                                className="bg-muted/50 text-muted-foreground hover:text-foreground text-[10px]"
                            >
                                {SkillIcon && (
                                    <SkillIcon className="h-2.5 w-2.5" />
                                )}
                                {skill.name}
                            </Badge>
                        );
                    })}
                    {project.skills.length > maxSkillsToShow && (
                        <Badge
                            variant="secondary"
                            className="bg-muted/50 text-muted-foreground text-[10px]"
                        >
                            +{project.skills.length - maxSkillsToShow}
                        </Badge>
                    )}
                </div>
            )}
        </div>
    );
};
