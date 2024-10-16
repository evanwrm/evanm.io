import { HoverButton } from "@/components/animation/hover-button";
import { Icon } from "@/components/icon";
import { Image } from "@/components/image";
import { Markdown } from "@/components/mdx/markdown";
import { Link } from "@/components/navigation/link";
import { isReference } from "@/lib/services/sanity/utils";
import { cn } from "@/lib/utils";
import { Education } from "@/lib/validators/Education";
import { format } from "date-fns";

interface Props {
    education: Education;
    className?: string;
}

export const EducationCard = ({ education, className }: Props) => {
    const startDate = format(new Date(education.startDate ?? education._createdAt), "MMM yyyy");
    const endDate = education.endDate ? format(new Date(education.endDate), "MMM yyyy") : "Present";

    return (
        <div
            className={cn("flex flex-col sm:flex-row sm:items-start sm:justify-between", className)}
        >
            <div className="flex flex-col">
                <div className="flex items-start">
                    {education.thumbnail?.asset && !isReference(education.thumbnail.asset) && (
                        <Image
                            image={education.thumbnail.asset}
                            alt={education.thumbnail.alt ?? education.school}
                            width={64}
                            height={64}
                            className="h-12 w-12 select-none rounded-md shadow"
                        />
                    )}
                    <div className="ml-4 flex flex-col items-start">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-base font-bold sm:text-lg">{education.school}</h2>
                            {education.siteUrl && (
                                <Link
                                    href={education.siteUrl}
                                    aria-label={`${education.school} Website`}
                                >
                                    <HoverButton>
                                        <Icon.RiExternalLinkLine className="h-4 w-4" />
                                    </HoverButton>
                                </Link>
                            )}
                        </div>
                        <span className="text-muted-foreground text-sm sm:text-base">
                            {education.degree}
                        </span>
                    </div>
                </div>
                {education.description && (
                    <div className="py-2 text-sm sm:text-base">
                        <Markdown source={education.description} />
                    </div>
                )}
            </div>
            <div className="mt-2 flex flex-row items-start justify-between sm:mt-0 sm:flex-col sm:items-end sm:justify-center">
                <span className="text-xs sm:text-sm">
                    {startDate} - {endDate}
                </span>
                <div className="flex flex-col items-end">
                    {education.location && (
                        <div className="text-muted-foreground flex items-center text-xs italic sm:mt-1 sm:text-sm">
                            <span className="font-semibold">{education.location}</span>
                            <Icon.HiOutlineLocationMarker className="ml-2 h-4 w-4" />
                        </div>
                    )}
                    {education.gpa && (
                        <div className="text-muted-foreground flex items-center text-xs italic sm:mt-1 sm:text-sm">
                            <span className="mr-1 font-semibold">{education.gpa}</span>
                            <span>GPA</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
