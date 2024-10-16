import { HoverButton } from "@/components/animation/hover-button";
import { Icon } from "@/components/icon";
import { Image } from "@/components/image";
import { Markdown } from "@/components/mdx/markdown";
import { Link } from "@/components/navigation/link";
import { isReference } from "@/lib/services/sanity/utils";
import { cn } from "@/lib/utils";
import { Experience } from "@/lib/validators/Experience";
import { format } from "date-fns";

interface Props {
    experience: Experience;
    className?: string;
}

export const ExperienceCard = ({ experience, className }: Props) => {
    const startDate = format(new Date(experience.startDate ?? experience._createdAt), "MMM yyyy");
    const endDate = experience.endDate
        ? format(new Date(experience.endDate), "MMM yyyy")
        : "Present";

    return (
        <div
            className={cn("flex flex-col sm:flex-row sm:items-start sm:justify-between", className)}
        >
            <div className="flex flex-col">
                <div className="flex items-start">
                    {experience.thumbnail?.asset && !isReference(experience.thumbnail.asset) && (
                        <Image
                            image={experience.thumbnail?.asset}
                            alt={experience.thumbnail?.alt ?? experience.company}
                            width={128}
                            height={128}
                            className="h-12 w-12 select-none rounded-md shadow"
                        />
                    )}
                    <div className="ml-4 flex flex-col items-start">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-base font-bold sm:text-lg">{experience.company}</h2>
                            {experience.siteUrl && (
                                <Link
                                    href={experience.siteUrl}
                                    aria-label={`${experience.company} Website`}
                                >
                                    <HoverButton>
                                        <Icon.RiExternalLinkLine className="h-4 w-4" />
                                    </HoverButton>
                                </Link>
                            )}
                        </div>
                        <span className="text-muted-foreground text-sm sm:text-base">
                            {experience.role}
                        </span>
                    </div>
                </div>
                {experience.description && (
                    <div className="py-2 text-sm sm:text-base">
                        <Markdown source={experience.description} />
                    </div>
                )}
            </div>
            <div className="mt-2 flex flex-row items-start justify-between sm:mt-0 sm:flex-col sm:items-end sm:justify-center">
                <span className="text-xs sm:text-sm">
                    {startDate} - {endDate}
                </span>
                {experience.location && (
                    <div className="text-muted-foreground flex items-center text-xs italic sm:mt-1 sm:text-sm">
                        <span className="font-semibold">{experience.location}</span>
                        <Icon.HiOutlineLocationMarker className="ml-2 h-4 w-4" />
                    </div>
                )}
            </div>
        </div>
    );
};
