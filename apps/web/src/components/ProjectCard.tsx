import React from "react";
import { getRepositoryIcon } from "../lib/icons";
import { Project } from "../validators/Project";
import Icon from "./Icon";
import { Image } from "./Image";
import NavLink from "./NavLink";
import Tilt from "./Tilt";

interface Props {
    project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }: Props) => {
    return (
        <Tilt className="w-96" tiltStrength={5}>
            <div className="w-full h-full antialiased transition shadow-xl card group bg-base-200/50 hover:ring hover:ring-secondary ring-offset-base-100 ring-offset-0 hover:ring-offset-4">
                {project.thumbnail && (
                    <figure className="h-screen max-h-48 bg-base-100 overflow-clip">
                        <Image
                            image={project.thumbnail}
                            alt={project.name}
                            className="transition group-hover:scale-105"
                        />
                    </figure>
                )}
                <div className="w-full shadow-inner card-body">
                    <div className="flex items-center w-full gap-4">
                        <h2 className="card-title">{project.name}</h2>
                        <div className="badge badge-secondary">NEW</div>
                        <div className="flex justify-end flex-1 gap-4">
                            {project.repository && (
                                <NavLink
                                    href={project.repository}
                                    aria-label="Repository"
                                    key={project.repository}
                                >
                                    <Icon
                                        icon={getRepositoryIcon(project.repository)}
                                        className="w-6 h-6 transition opacity-80 hover:-translate-y-1 hover:scale-110 hover:opacity-100 focus:opacity-100"
                                    />
                                </NavLink>
                            )}
                            {project.liveSite && (
                                <NavLink
                                    href={project.liveSite}
                                    aria-label="Live website"
                                    key={project.liveSite}
                                >
                                    <Icon
                                        icon={"RiExternalLinkLine"}
                                        className="w-6 h-6 transition opacity-80 hover:-translate-y-1 hover:scale-110 hover:opacity-100 focus:opacity-100"
                                    />
                                </NavLink>
                            )}
                        </div>
                    </div>
                    <p>{project.logline}</p>
                    <div className="justify-end card-actions">
                        {project.skills?.map(skill => (
                            <div
                                className="gap-2 py-3 transition badge badge-outline hover:text-primary focus:text-primary"
                                key={skill.skillId}
                            >
                                <Icon className="inline-block w-4 h-4" icon={skill.iconId} />
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
