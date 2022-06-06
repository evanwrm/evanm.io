import React from "react";
import { Project } from "../interfaces/Project";
import { getRepositoryIcon } from "../lib/icons";
import Icon from "./Icon";
import { Image } from "./Image";

interface Props {
    project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }: Props) => {
    return (
        <div className="card group w-96 bg-base-200/50 shadow-xl transition hover:ring hover:ring-secondary ring-offset-base-100 ring-offset-0 hover:ring-offset-4">
            {project.thumbnail && (
                <figure className="h-screen max-h-48 bg-base-100 overflow-clip">
                    <Image
                        image={project.thumbnail}
                        alt={project.name}
                        className="transition group-hover:scale-105"
                    />
                </figure>
            )}
            <div className="card-body shadow-inner w-full">
                <div className="w-full flex items-center gap-4">
                    <h2 className="card-title">{project.name}</h2>
                    <div className="badge badge-secondary">NEW</div>
                    <div className="flex-1 flex gap-4 justify-end">
                        {project.repository && (
                            <a
                                href={project.repository}
                                aria-label={`Repository`}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={project.repository}
                            >
                                <Icon
                                    icon={getRepositoryIcon(project.repository)}
                                    className="w-6 h-6 opacity-80 transition hover:-translate-y-1 hover:scale-110 hover:opacity-100 focus:opacity-100"
                                />
                            </a>
                        )}
                        {project.liveSite && (
                            <a
                                href={project.liveSite}
                                aria-label={`Live website`}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={project.liveSite}
                            >
                                <Icon
                                    icon={"RiExternalLinkLine"}
                                    className="w-6 h-6 opacity-80 transition hover:-translate-y-1 hover:scale-110 hover:opacity-100 focus:opacity-100"
                                />
                            </a>
                        )}
                    </div>
                </div>
                <p>{project.logline}</p>
                <div className="card-actions justify-end">
                    {project.skills?.map(skill => (
                        <div
                            className="badge badge-outline gap-2 py-3 transition hover:text-primary focus:text-primary"
                            key={skill.skillId}
                        >
                            <Icon className="inline-block w-4 h-4" icon={skill.iconId} />
                            {skill.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
