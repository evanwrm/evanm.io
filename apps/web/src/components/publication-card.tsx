import { HoverButton } from "@/components/animation/hover-button";
import { Icon } from "@/components/icon";
import { Link } from "@/components/navigation/link";
import { Badge } from "@/components/ui/badge";
import { Publication } from "@/lib/validators/Publication";
import { addYears } from "date-fns";

interface Props {
    publication: Publication;
}

const PublicationCard = ({ publication }: Props) => {
    const isNew = new Date(publication.year ?? publication._createdAt) > addYears(new Date(), -1);

    return (
        <div className="bg-background flex rounded-xl border p-4 shadow">
            <div className="flex flex-1 flex-col justify-start">
                <div className="flex items-center justify-start gap-4">
                    <h2 className="text-lg font-semibold">{publication.title}</h2>
                    {isNew && (
                        <Badge variant="secondary" className="bg-red-600 text-white">
                            NEW
                        </Badge>
                    )}
                </div>
                <div className="text-sm">{publication.authors.join(", ")}</div>
            </div>
            <div className="flex items-center justify-end">
                <div className="flex flex-1 justify-end gap-4">
                    {publication.url && (
                        <Link
                            href={publication.url}
                            aria-label="Official Publication"
                            className="text-foreground/80 hover:text-foreground"
                        >
                            <HoverButton>
                                <Icon.RiExternalLinkLine className="h-6 w-6" />
                            </HoverButton>
                        </Link>
                    )}
                    {publication.pdf && (
                        <Link
                            href={publication.pdf}
                            aria-label="PDF"
                            className="text-foreground/80 hover:text-foreground"
                        >
                            <HoverButton>
                                <Icon.FaFilePdf className="h-6 w-6" />
                            </HoverButton>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PublicationCard;
