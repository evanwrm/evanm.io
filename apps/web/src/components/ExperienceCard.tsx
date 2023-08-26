import Icon from "@/components/Icon";
import { Image } from "@/components/Image";
import MdxMarkdown from "@/components/mdx/MdxMarkdown";
import NavLink from "@/components/navigation/NavLink";
import { isReference } from "@/lib/services/sanity/utils";
import { Experience } from "@/lib/validators/Experience";
import { format } from "date-fns";

interface Props {
    experience: Experience;
}

const ExperienceCard = ({ experience }: Props) => {
    return (
        <div className="border-base-200 w-full border-t border-solid py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                    {experience.thumbnail && !isReference(experience.thumbnail.asset) && (
                        <figure className="bg-base-100 h-12 w-12 overflow-clip rounded-full shadow transition duration-500 will-change-transform hover:scale-105">
                            <Image
                                image={experience.thumbnail.asset}
                                alt={experience.thumbnail.alt ?? experience.company}
                                width={426}
                                height={240}
                                className="h-full w-full object-contain"
                            />
                        </figure>
                    )}
                    <div className="ml-4 flex flex-col items-start justify-evenly">
                        {experience.siteUrl ? (
                            <NavLink
                                href={experience.siteUrl}
                                aria-label={`${experience.company} Website`}
                                className="opacity-80 transition hover:opacity-100"
                            >
                                <h2 className="text-xl font-semibold">{experience.company}</h2>
                            </NavLink>
                        ) : (
                            <h2 className="text-xl font-semibold">{experience.company}</h2>
                        )}
                        <span className="opacity-80">{experience.role}</span>
                    </div>
                </div>
                <div className="flex flex-col items-end justify-center">
                    <span className="opacity-80">
                        {format(
                            new Date(experience.startDate ?? experience._createdAt),
                            "MMM yyyy"
                        )}{" "}
                        -{" "}
                        {experience.endDate
                            ? format(new Date(experience.endDate), "MMM yyyy")
                            : "Present"}
                    </span>
                    {experience.location && (
                        <div className="flex items-center justify-center text-sm italic opacity-60">
                            <span className="font-semibold">{experience.location}</span>
                            <Icon.HiOutlineLocationMarker className="ml-2 h-4 w-4" />
                        </div>
                    )}
                </div>
            </div>
            {experience.description && (
                <div className="py-2">
                    <MdxMarkdown source={experience.description} />
                </div>
            )}
        </div>
    );
};

export default ExperienceCard;
