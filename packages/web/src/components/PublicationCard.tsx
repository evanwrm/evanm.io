import React from "react";
import { Project } from "../interfaces/Project";

interface Props {
    project: Project;
}

const PublicationCard: React.FC<Props> = ({ project }: Props) => {
    return <span>{project.name}</span>;
};

export default PublicationCard;
