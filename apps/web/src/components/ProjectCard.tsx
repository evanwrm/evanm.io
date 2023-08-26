import ResponsiveButton from "@/components/animation/ResponsiveButton";
import Tilt from "@/components/animation/Tilt";
import Icon, { getIconAliased } from "@/components/Icon";
import { Image } from "@/components/Image";
import NavLink from "@/components/navigation/NavLink";
import { isReference } from "@/lib/services/sanity/utils";
import { cn } from "@/lib/utils/styles";
import { Project } from "@/lib/validators/Project";
import { addYears } from "date-fns";

interface Props {
    project: Project;
}

const ProjectCard = ({ project }: Props) => {
    const RepositoryIcon = project.repositoryUrl && getIconAliased(project.repositoryUrl);
    const isNew =
        new Date(project.endDate ?? project.startDate ?? project._createdAt) >
        addYears(new Date(), -1);

    return (
        <Tilt className="bg-base-200/50 h-full max-h-screen" tiltStrength={5}>
            <div
                className={cn(
                    "card group flex h-full w-full flex-col items-stretch rounded-xl antialiased shadow-md",
                    "border-base-content/10 hover:ring-primary ring-offset-base-100 border ring-offset-0 transition duration-500 hover:ring hover:ring-offset-4"
                )}
            >
                {project.thumbnail && !isReference(project.thumbnail.asset) && (
                    <figure className="bg-base-100 h-screen max-h-48 overflow-clip">
                        <Image
                            image={project.thumbnail.asset}
                            alt={project.thumbnail.alt ?? project.title}
                            width={426}
                            height={240}
                            className="h-full w-full transition duration-500 will-change-transform group-hover:scale-105"
                        />
                    </figure>
                )}
                <div className="card-body w-full gap-y-8 shadow-inner">
                    <div className="flex w-full items-center gap-4">
                        <h2 className="text-base-content text-lg font-semibold">{project.title}</h2>
                        {isNew && <div className="badge badge-primary">NEW</div>}
                        <div className="flex flex-1 justify-end gap-4">
                            {project.repositoryUrl && RepositoryIcon && (
                                <NavLink
                                    href={project.repositoryUrl}
                                    aria-label="Repository"
                                    key={project.repositoryUrl}
                                >
                                    <ResponsiveButton className="text-base-content flex opacity-80">
                                        <RepositoryIcon className="h-6 w-6" />
                                    </ResponsiveButton>
                                </NavLink>
                            )}
                            {project.siteUrl && (
                                <NavLink
                                    href={project.siteUrl}
                                    aria-label="Live website"
                                    key={project.siteUrl}
                                >
                                    <ResponsiveButton className="text-base-content flex opacity-80">
                                        <Icon.RiExternalLinkLine className="h-6 w-6" />
                                    </ResponsiveButton>
                                </NavLink>
                            )}
                        </div>
                    </div>
                    <p className="prose text-left">{project.logline}</p>
                    <div className="card-actions justify-end">
                        {project.skills?.map(skill => {
                            if (isReference(skill)) return null;
                            const SkillIcon = getIconAliased(skill.iconId);

                            return (
                                <div
                                    className="badge text-base-content hover:text-primary focus:text-primary gap-2 py-3 transition"
                                    key={skill.slug}
                                >
                                    {SkillIcon && <SkillIcon className="inline-block h-4 w-4" />}
                                    {skill.name}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Tilt>
    );
};

export default ProjectCard;
