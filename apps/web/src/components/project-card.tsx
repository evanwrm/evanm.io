import { HoverButton } from "@/components/animation/hover-button";
import { Tilt } from "@/components/animation/tilt";
import { Icon, getIcon } from "@/components/icon";
import { Image } from "@/components/image";
import { Link } from "@/components/navigation/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { isReference } from "@/lib/services/sanity/utils";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/validators/project";
import { addYears } from "date-fns";

interface Props {
    project: Project;
}

export const ProjectCard = ({ project }: Props) => {
    const RepositoryIcon = project.repositoryUrl && getIcon(project.repositoryUrl);
    const newThreshold = addYears(new Date(), -1);
    const isNew =
        new Date(project.endDate ?? project.startDate ?? project._createdAt) > newThreshold;

    return (
        <Tilt tiltStrength={5} className="h-full max-h-screen bg-background">
            <Card
                className={cn(
                    "group flex h-full flex-col overflow-hidden",
                    "border ring-offset-0 ring-offset-background transition duration-500 hover:ring hover:ring-input hover:ring-offset-4"
                )}
            >
                {project.thumbnail && !isReference(project.thumbnail.asset) && (
                    <Image
                        src={project.thumbnail.asset}
                        alt={project.thumbnail.alt ?? project.title}
                        width={426}
                        height={240}
                        className="h-48 w-full transition duration-500 will-change-transform group-hover:scale-105"
                    />
                )}
                <CardHeader>
                    <div className="flex w-full items-center gap-4">
                        <CardTitle>{project.title}</CardTitle>
                        <div className="flex flex-1 justify-end gap-2">
                            {project.repositoryUrl && RepositoryIcon && (
                                <Link href={project.repositoryUrl} aria-label="Repository">
                                    <HoverButton>
                                        <RepositoryIcon className="h-6 w-6" />
                                    </HoverButton>
                                </Link>
                            )}
                            {project.siteUrl && (
                                <Link href={project.siteUrl} aria-label="Live website">
                                    <HoverButton>
                                        <Icon.RiExternalLinkLine className="h-6 w-6" />
                                    </HoverButton>
                                </Link>
                            )}
                            {isNew && (
                                <Badge
                                    variant="secondary"
                                    className="bg-red-600 text-white hover:bg-red-600"
                                >
                                    NEW
                                </Badge>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="prose text-left">{project.logline}</p>
                </CardContent>
                <CardFooter className="flex flex-1 flex-wrap items-end gap-2">
                    {project.skills?.map(skill => {
                        if (isReference(skill)) return null;
                        const SkillIcon = getIcon(skill.iconId);
                        return SkillIcon ? (
                            <Badge key={skill.name} variant="outline" className="rounded-full">
                                <SkillIcon className="mr-2" />
                                {skill.name}
                            </Badge>
                        ) : null;
                    })}
                </CardFooter>
            </Card>
        </Tilt>
    );
};
