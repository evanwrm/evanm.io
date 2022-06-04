import React from "react";
import { Project } from "../interfaces/Project";

interface Props {
    project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }: Props) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {project.name}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{project.logline}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
