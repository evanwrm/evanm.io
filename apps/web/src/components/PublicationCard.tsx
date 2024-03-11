import Icon from "@/components/Icon";
import ResponsiveButton from "@/components/animation/ResponsiveButton";
import NavLink from "@/components/navigation/NavLink";
import { Publication } from "@/lib/validators/Publication";
import { addYears } from "date-fns";

interface Props {
    publication: Publication;
}

const PublicationCard = ({ publication }: Props) => {
    const isNew = new Date(publication.year ?? publication._createdAt) > addYears(new Date(), -1);

    return (
        <div className="h-full w-full transition duration-300 will-change-transform hover:scale-105">
            <div className="bg-base-200/50 border-base-content/10 flex h-full w-full rounded-xl border p-4 shadow-md">
                <div className="flex flex-1 flex-col justify-start">
                    <div className="flex items-center justify-start gap-4">
                        <h2 className="text-base-content text-lg font-semibold">
                            {publication.title}
                        </h2>
                        {isNew && <div className="badge badge-primary">NEW</div>}
                    </div>
                    <div className="text-base-content text-sm">
                        {publication.authors.join(", ")}
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <div className="flex flex-1 justify-end gap-4">
                        {publication.url && (
                            <NavLink
                                href={publication.url}
                                aria-label="Official Publication"
                                key={publication.url}
                            >
                                <ResponsiveButton className="text-base-content flex opacity-80">
                                    <Icon.RiExternalLinkLine className="h-6 w-6" />
                                </ResponsiveButton>
                            </NavLink>
                        )}
                        {publication.pdf && (
                            <NavLink href={publication.pdf} aria-label="PDF" key={publication.pdf}>
                                <ResponsiveButton className="text-base-content flex opacity-80">
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
