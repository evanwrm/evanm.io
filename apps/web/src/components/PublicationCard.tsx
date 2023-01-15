import NavLink from "@/components/navigation/NavLink";
import { Publication } from "@/lib/validators/Publication";
import { addYears } from "date-fns";
import ResponsiveButton from "./animation/ResponsiveButton";
import Icon from "./Icon";

interface Props {
    publication: Publication;
}

const PublicationCard = ({ publication }: Props) => {
    const isNew = new Date(publication.year ?? publication._createdAt) > addYears(new Date(), -1);

    return (
        <div className="w-full h-full hover:scale-105 transition">
            <div className="flex bg-base-200/50 h-full border w-full p-4 rounded-xl shadow-md border-base-content/10">
                <div className="flex flex-1 justify-start flex-col">
                    <div className="flex items-center justify-start gap-4">
                        <h2 className="text-lg font-semibold text-base-content">
                            {publication.title}
                        </h2>
                        {isNew && <div className="badge badge-secondary">NEW</div>}
                    </div>
                    <div className="text-sm text-base-content">
                        {publication.authors.join(", ")}
                    </div>
                </div>
                <div className="flex justify-end items-center">
                    <div className="flex flex-1 justify-end gap-4">
                        {publication.url && (
                            <NavLink
                                href={publication.url}
                                aria-label="Official Publication"
                                key={publication.url}
                            >
                                <ResponsiveButton className="flex opacity-80 text-base-content">
                                    <Icon.RiExternalLinkLine className="h-6 w-6" />
                                </ResponsiveButton>
                            </NavLink>
                        )}
                        {publication.pdf && (
                            <NavLink href={publication.pdf} aria-label="PDF" key={publication.pdf}>
                                <ResponsiveButton className="flex opacity-80 text-base-content">
                                    <Icon.FaFilePdf className="h-6 w-6" />
                                </ResponsiveButton>
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicationCard;
