import { format } from "date-fns";
import {
    CalendarIcon,
    ChevronRightIcon,
    ExternalLinkIcon,
    MapPinIcon,
} from "lucide-react";
import { Image } from "@/components/image";
import { Markdown } from "@/components/mdx/markdown";
import { Link } from "@/components/link";
import { Separator } from "@/components/ui/separator";
import { isReference } from "@/lib/sanity/utils";
import { cn } from "@/lib/utils";
import type { Experience } from "@/lib/validators/experience";

interface Props {
    experience: Experience;
    className?: string;
}
export function ExperienceCard({ experience, className }: Props) {
    const startDate = format(
        new Date(experience.startDate ?? experience._createdAt),
        "MMM yyyy",
    );
    const endDate = experience.endDate
        ? format(new Date(experience.endDate), "MMM yyyy")
        : "Present";

    return (
        <article
            className={cn(
                "group border-border/60 hover:bg-muted/30 relative -mx-3 border-b px-3 py-4 transition-all duration-200 last:border-b-0",
                className,
            )}
        >
            <div className="bg-primary absolute top-0 left-0 h-full w-0.5 scale-y-0 transition-transform duration-200 group-hover:scale-y-100" />
            <div className="text-muted-foreground mb-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs">
                <span className="group-hover:text-foreground/70 inline-flex items-center gap-1 tabular-nums transition-colors">
                    <CalendarIcon className="size-3" />
                    {startDate} - {endDate}
                </span>
                {experience.location && (
                    <>
                        <Separator
                            orientation="vertical"
                            className="data-[orientation=vertical]:h-auto"
                        />
                        <span className="group-hover:text-foreground/70 inline-flex items-center gap-1 transition-colors">
                            <MapPinIcon className="size-3" />
                            {experience.location}
                        </span>
                    </>
                )}
            </div>
            <div className="flex items-start gap-3">
                {experience.thumbnail?.asset &&
                    !isReference(experience.thumbnail.asset) && (
                        <Image
                            src={experience.thumbnail.asset}
                            alt={
                                experience.thumbnail?.alt ?? experience.company
                            }
                            width={48}
                            height={48}
                            className="ring-border/50 size-10 shrink-0 rounded-md shadow-sm ring-1 select-none"
                        />
                    )}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm leading-snug font-medium tracking-tight">
                            {experience.company}
                        </h3>
                        {experience.siteUrl && (
                            <Link
                                href={experience.siteUrl}
                                aria-label={`${experience.company} Website`}
                                className="flex size-4 items-center justify-center transition-all hover:-translate-y-0.5 hover:scale-110"
                            >
                                <ExternalLinkIcon className="size-3.5" />
                            </Link>
                        )}
                    </div>
                    <p className="text-muted-foreground group-hover:text-muted-foreground/80 text-xs transition-colors">
                        {experience.role}
                    </p>
                </div>
            </div>
            {experience.description && (
                <details className="group/details mt-3">
                    <summary className="text-muted-foreground/70 hover:text-foreground inline cursor-pointer list-none text-xs transition-colors">
                        <span className="inline-flex items-center gap-0.5 rounded-sm px-1 py-0.5">
                            <ChevronRightIcon className="size-3 transition-transform duration-200 group-open/details:rotate-90" />
                            Show More
                        </span>
                    </summary>
                    <div className="prose-li:my-px mt-2 px-2 py-1 text-xs leading-relaxed">
                        <Markdown
                            source={experience.description}
                            className="text-xs"
                        />
                    </div>
                </details>
            )}
        </article>
    );
}
