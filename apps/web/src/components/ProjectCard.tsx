import React from "react";
import { getRepositoryIcon } from "../lib/icons";
import { Project } from "../validators/Project";
import ResponsiveButton from "./animations/ResponsiveButton";
import Icon from "./Icon";
import { Image } from "./Image";
import NavLink from "./navigation/NavLink";
import Tilt from "./Tilt";

interface Props {
    project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }: Props) => {
    return (
        <Tilt className="max-h-screen" tiltStrength={5}>
            <div className="border-base-content/10 card bg-base-200/50 hover:ring-secondary ring-offset-base-100 group h-full w-full rounded-xl border antialiased shadow-xl ring-offset-0 transition hover:ring hover:ring-offset-4">
                {project.thumbnail && (
                    <figure className="bg-base-100 h-screen max-h-48 overflow-clip">
                        <Image
                            image={project.thumbnail}
                            alt={project.name}
                            className="transition group-hover:scale-105"
                        />
                    </figure>
                )}
                <div className="card-body w-full gap-y-8 shadow-inner">
                    <div className="flex w-full items-center gap-4">
                        <h2 className="card-title">{project.name}</h2>
                        <div className="badge badge-secondary">NEW</div>
                        <div className="flex flex-1 justify-end gap-4">
                            {project.repository && (
                                <NavLink
                                    href={project.repository}
                                    aria-label="Repository"
                                    key={project.repository}
                                >
                                    <ResponsiveButton className="flex opacity-80">
                                        <Icon
                                            icon={getRepositoryIcon(project.repository)}
                                            className="h-6 w-6"
                                        />
                                    </ResponsiveButton>
                                </NavLink>
                            )}
                            {project.liveSite && (
                                <NavLink
                                    href={project.liveSite}
                                    aria-label="Live website"
                                    key={project.liveSite}
                                >
                                    <ResponsiveButton className="flex opacity-80">
                                        <Icon icon={"RiExternalLinkLine"} className="h-6 w-6" />
                                    </ResponsiveButton>
                                </NavLink>
                            )}
                        </div>
                    </div>
                    <p className="prose text-left">{project.logline}</p>
                    <div className="card-actions justify-end">
                        {project.skills?.map(skill => (
                            <div
                                className="badge badge-outline hover:text-primary focus:text-primary gap-2 py-3 transition"
                                key={skill.skillId}
                            >
                                <Icon className="inline-block h-4 w-4" icon={skill.iconId} />
                                {skill.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Tilt>
    );
};

export default ProjectCard;
