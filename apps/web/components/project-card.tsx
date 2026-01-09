import { addYears, format } from "date-fns";
import { CalendarIcon, ExternalLinkIcon } from "lucide-react";
import { HoverButton } from "@/components/animation/hover-button";
import { Tilt } from "@/components/animation/tilt";
import { getIcon } from "@/components/icon";
import { Image } from "@/components/image";
import { Link } from "@/components/navigation/link";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { isReference } from "@/lib/services/sanity/utils";
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
        <Tilt tiltStrength={4} className="h-full">
            <Card
                className={cn(
                    "group h-full gap-4 overflow-hidden pt-0",
                    "border border-border/60 bg-card/50 backdrop-blur-sm",
                    "ring-offset-background transition-all duration-300",
                    "hover:border-border hover:bg-card hover:ring-2 hover:ring-ring/20 hover:ring-offset-2",
                )}
            >
                {project.thumbnail && !isReference(project.thumbnail.asset) && (
                    <div className="relative h-40 overflow-hidden">
                        <Image
                            src={project.thumbnail.asset}
                            alt={project.thumbnail.alt ?? project.title}
                            width={426}
                            height={160}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                )}
                <CardHeader className="flex items-center gap-2 space-y-0 pb-2">
                    <CardTitle className="text-sm leading-snug tracking-tight">
                        {project.title}
                    </CardTitle>
                    {project.repositoryUrl && RepositoryIcon && (
                        <Link
                            href={project.repositoryUrl}
                            aria-label="Repository"
                        >
                            <HoverButton className="flex size-4 items-center justify-center">
                                <RepositoryIcon className="size-3.5" />
                            </HoverButton>
                        </Link>
                    )}
                    {project.siteUrl && (
                        <Link href={project.siteUrl} aria-label="Live site">
                            <HoverButton className="flex size-4 items-center justify-center">
                                <ExternalLinkIcon className="size-3.5" />
                            </HoverButton>
                        </Link>
                    )}
                    {projectDate && (
                        <span className="ml-auto inline-flex shrink-0 items-center gap-1 font-mono text-muted-foreground text-xs tabular-nums">
                            <CalendarIcon className="h-3 w-3" />
                            {format(new Date(projectDate), "MMM yyyy")}
                        </span>
                    )}
                    {isNew && (
                        <span className="relative shrink-0 rounded-sm bg-linear-to-r from-emerald-500/20 to-teal-500/20 px-1.5 py-0.5 font-medium text-[10px] text-emerald-600 uppercase tracking-wide ring-1 ring-emerald-500/30 dark:text-emerald-400">
                            <span className="absolute inset-0 animate-pulse rounded-sm bg-emerald-500/10" />
                            <span className="relative">New</span>
                        </span>
                    )}
                </CardHeader>
                <CardContent>
                    <p className="line-clamp-2 text-muted-foreground text-xs leading-relaxed">
                        {project.logline}
                    </p>
                </CardContent>
                {project.skills && project.skills.length > 0 && (
                    <CardFooter className="mt-auto flex flex-wrap gap-1 pt-0">
                        {project.skills.slice(0, maxSkillsToShow).map(skill => {
                            if (isReference(skill)) return null;
                            const SkillIcon = getIcon(skill.iconId);
                            return (
                                <Badge
                                    key={skill.name}
                                    variant="secondary"
                                    className="bg-muted/50 text-[10px] text-muted-foreground hover:text-foreground"
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
                                className="bg-muted/50 text-[10px] text-muted-foreground"
                            >
                                +{project.skills.length - maxSkillsToShow}
                            </Badge>
                        )}
                    </CardFooter>
                )}
            </Card>
        </Tilt>
    );
};
