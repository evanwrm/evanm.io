import React from "react";
import { Publication } from "../interfaces/Publication";

interface Props {
    publication: Publication;
}

const PublicationCard: React.FC<Props> = ({ publication }: Props) => {
    return <span>{publication.title}</span>;
};

export default PublicationCard;
