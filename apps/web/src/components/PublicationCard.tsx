import { Publication } from "../validators/Publication";

interface Props {
    publication: Publication;
}

const PublicationCard = ({ publication }: Props) => {
    return <span>{publication.title}</span>;
};

export default PublicationCard;
