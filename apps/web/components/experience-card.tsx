import { format } from "date-fns";
import {
    CalendarIcon,
    ChevronRightIcon,
    ExternalLinkIcon,
    MapPinIcon,
} from "lucide-react";
import { HoverButton } from "@/components/animation/hover-button";
import { Image } from "@/components/image";
import { Markdown } from "@/components/mdx/markdown";
import { Link } from "@/components/navigation/link";
import { Separator } from "@/components/ui/separator";
import { isReference } from "@/lib/services/sanity/utils";
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
                "group relative -mx-3 border-border/60 border-b px-3 py-4 transition-all duration-200 last:border-b-0 hover:bg-muted/30",
                className,
            )}
        >
            <div className="absolute top-0 left-0 h-full w-0.5 scale-y-0 bg-primary transition-transform duration-200 group-hover:scale-y-100" />
            <div className="mb-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-muted-foreground text-xs">
                <span className="inline-flex items-center gap-1 tabular-nums transition-colors group-hover:text-foreground/70">
                    <CalendarIcon className="size-3" />
                    {startDate} - {endDate}
                </span>
                {experience.location && (
                    <>
                        <Separator
                            orientation="vertical"
                            className="data-[orientation=vertical]:h-auto"
                        />
                        <span className="inline-flex items-center gap-1 transition-colors group-hover:text-foreground/70">
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
                            className="size-10 shrink-0 select-none rounded-md shadow-sm ring-1 ring-border/50"
                        />
                    )}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-medium text-sm leading-snug tracking-tight">
                            {experience.company}
                        </h3>
                        {experience.siteUrl && (
                            <Link
                                href={experience.siteUrl}
                                aria-label={`${experience.company} Website`}
                            >
                                <HoverButton className="flex size-4 items-center justify-center">
                                    <ExternalLinkIcon className="size-3.5" />
                                </HoverButton>
                            </Link>
                        )}
                    </div>
                    <p className="text-muted-foreground text-xs transition-colors group-hover:text-muted-foreground/80">
                        {experience.role}
                    </p>
                </div>
            </div>
            {experience.description && (
                <details className="group/details mt-3">
                    <summary className="inline cursor-pointer list-none text-muted-foreground/70 text-xs transition-colors hover:text-foreground">
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
