import Icon from "@/components/Icon";
import { Image } from "@/components/Image";
import MdxMarkdown from "@/components/mdx/MdxMarkdown";
import NavLink from "@/components/navigation/NavLink";
import { isReference } from "@/lib/services/sanity/utils";
import { Education } from "@/lib/validators/Education";
import { format } from "date-fns";

interface Props {
    education: Education;
}

const EducationCard = ({ education }: Props) => {
    return (
        <div className="border-base-200 w-full border-t border-solid py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                    {education.thumbnail && !isReference(education.thumbnail.asset) && (
                        <figure className="bg-base-100 h-12 w-12 overflow-clip rounded-full shadow transition duration-500 hover:scale-105">
                            <Image
                                image={education.thumbnail.asset}
                                alt={education.thumbnail.alt ?? education.school}
                                width={426}
                                height={240}
                                className="h-full w-full object-contain"
                            />
                        </figure>
                    )}
                    <div className="ml-4 flex flex-col items-start justify-evenly">
                        {education.siteUrl ? (
                            <NavLink
                                href={education.siteUrl}
                                aria-label={`${education.school} Website`}
                                className="opacity-80 transition hover:opacity-100"
                            >
                                <h2 className="text-xl font-semibold">{education.school}</h2>
                            </NavLink>
                        ) : (
                            <h2 className="text-xl font-semibold">{education.school}</h2>
                        )}
                        <span className="opacity-80">{education.degree}</span>
                    </div>
                </div>
                <div className="flex flex-col items-end justify-center">
                    <span className="opacity-80">
                        {format(new Date(education.startDate ?? education._createdAt), "MMM yyyy")}{" "}
                        -{" "}
                        {education.endDate
                            ? format(new Date(education.endDate), "MMM yyyy")
                            : "Present"}
                    </span>
                    {education.location && (
                        <div className="flex items-center justify-center text-sm italic opacity-60">
                            <span className="font-semibold">{education.location}</span>
                            <Icon.HiOutlineLocationMarker className="ml-2 h-4 w-4" />
                        </div>
                    )}
                    {education.gpa && (
                        <div className="flex items-center justify-center text-sm italic opacity-60">
                            <span className="mr-1 font-semibold">{education.gpa}</span>
                            <span>GPA</span>
                        </div>
                    )}
                </div>
            </div>
            {education.description && (
                <div className="py-2">
                    <MdxMarkdown source={education.description} />
                </div>
            )}
        </div>
    );
};

export default EducationCard;
