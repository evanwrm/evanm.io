import { format } from "date-fns";
import {
    CalendarIcon,
    ChevronRightIcon,
    ExternalLinkIcon,
    GraduationCapIcon,
    MapPinIcon,
} from "lucide-react";
import { Image } from "@/components/image";
import { Markdown } from "@/components/mdx/markdown";
import { Link } from "@/components/link";
import { Separator } from "@/components/ui/separator";
import { isReference } from "@/lib/sanity/utils";
import { cn } from "@/lib/utils";
import type { Education } from "@/lib/validators/education";

interface Props {
    education: Education;
    className?: string;
}
export function EducationCard({ education, className }: Props) {
    const startDate = format(
        new Date(education.startDate ?? education._createdAt),
        "MMM yyyy",
    );
    const endDate = education.endDate
        ? format(new Date(education.endDate), "MMM yyyy")
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
                {education.location && (
                    <>
                        <Separator
                            orientation="vertical"
                            className="data-[orientation=vertical]:h-auto"
                        />
                        <span className="group-hover:text-foreground/70 inline-flex items-center gap-1 transition-colors">
                            <MapPinIcon className="size-3" />
                            {education.location}
                        </span>
                    </>
                )}
                {education.gpa && (
                    <>
                        <Separator
                            orientation="vertical"
                            className="data-[orientation=vertical]:h-auto"
                        />
                        <span className="group-hover:text-foreground/70 inline-flex items-center gap-1 transition-colors">
                            <GraduationCapIcon className="size-3" />
                            {education.gpa} GPA
                        </span>
                    </>
                )}
            </div>
            <div className="flex items-start gap-3">
                {education.thumbnail?.asset &&
                    !isReference(education.thumbnail.asset) && (
                        <Image
                            src={education.thumbnail.asset}
                            alt={education.thumbnail?.alt ?? education.school}
                            width={48}
                            height={48}
                            className="ring-border/50 size-10 shrink-0 rounded-md shadow-sm ring-1 select-none"
                        />
                    )}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm leading-snug font-medium tracking-tight">
                            {education.school}
                        </h3>
                        {education.siteUrl && (
                            <Link
                                href={education.siteUrl}
                                aria-label={`${education.school} Website`}
                                className="flex size-4 items-center justify-center transition-all hover:-translate-y-0.5 hover:scale-110"
                            >
                                <ExternalLinkIcon className="size-3.5" />
                            </Link>
                        )}
                    </div>
                    <p className="text-muted-foreground group-hover:text-muted-foreground/80 text-xs transition-colors">
                        {education.degree}
                    </p>
                </div>
            </div>
            {education.description && (
                <details className="group/details mt-3">
                    <summary className="text-muted-foreground hover:text-foreground inline cursor-pointer list-none text-xs transition-colors">
                        <span className="inline-flex items-center gap-0.5 rounded-sm px-1 py-0.5">
                            <ChevronRightIcon className="size-3 transition-transform duration-200 group-open/details:rotate-90" />
                            Show More
                        </span>
                    </summary>
                    <div className="prose-li:my-px mt-2 px-2 py-1 text-xs leading-relaxed">
                        <Markdown
                            source={education.description}
                            className="text-xs"
                        />
                    </div>
                </details>
            )}
        </article>
    );
}
