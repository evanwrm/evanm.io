import { addYears } from "date-fns";
import {
    BookOpenIcon,
    CalendarIcon,
    ChevronRightIcon,
    ExternalLinkIcon,
    FileIcon,
    StarIcon,
    UsersIcon,
} from "lucide-react";
import { Link } from "@/components/navigation/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Publication } from "@/lib/validators/publication";

interface Props {
    publication: Publication;
}

export const PublicationCard = ({ publication }: Props) => {
    const isNew =
        new Date(publication.year ?? publication._createdAt) >
        addYears(new Date(), -1);
    const venue = publication.journal || publication.booktitle;
    const authors = publication.authors.join(", ");
    const hasAward = !!publication.award;

    return (
        <article className="group relative -mx-3 border-border/60 border-b px-3 py-4 transition-all duration-200 last:border-b-0 hover:bg-muted/30">
            <div className="absolute top-0 left-0 h-full w-0.5 scale-y-0 bg-primary transition-transform duration-200 group-hover:scale-y-100" />
            <div className="mb-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-muted-foreground text-xs">
                <span className="inline-flex items-center gap-1 tabular-nums transition-colors group-hover:text-foreground/70">
                    <CalendarIcon className="size-3" />
                    {publication.year ?? "—"}
                </span>
                {venue && (
                    <>
                        <Separator
                            orientation="vertical"
                            className="data-[orientation=vertical]:h-auto"
                        />
                        <span
                            className="inline-flex max-w-48 items-center gap-1 transition-colors group-hover:text-foreground/70"
                            title={venue}
                        >
                            <BookOpenIcon className="size-3 shrink-0" />
                            <span className="truncate">{venue}</span>
                        </span>
                    </>
                )}
                {hasAward && (
                    <>
                        <Separator
                            orientation="vertical"
                            className="data-[orientation=vertical]:h-auto"
                        />
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="inline-flex items-center gap-1 rounded-sm bg-linear-to-r from-amber-500/20 to-orange-500/20 px-1.5 py-0.5 text-amber-600 ring-1 ring-amber-500/30 dark:text-amber-400">
                                    <StarIcon className="size-3 fill-current" />
                                    <span className="font-medium text-[10px] uppercase tracking-wide">
                                        Award
                                    </span>
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>{publication.award}</TooltipContent>
                        </Tooltip>
                    </>
                )}
                {isNew && (
                    <>
                        <Separator
                            orientation="vertical"
                            className="data-[orientation=vertical]:h-auto"
                        />
                        <span className="relative rounded-sm bg-linear-to-r from-emerald-500/20 to-teal-500/20 px-1.5 py-0.5 font-medium text-[10px] text-emerald-600 uppercase tracking-wide ring-1 ring-emerald-500/30 dark:text-emerald-400">
                            <span className="absolute inset-0 animate-pulse rounded-sm bg-emerald-500/10" />
                            <span className="relative">New</span>
                        </span>
                    </>
                )}
            </div>
            <h3 className="mb-1.5 font-medium text-sm leading-snug tracking-tight">
                {publication.title}
            </h3>
            <p
                className="mb-2 flex items-center gap-1 text-muted-foreground text-xs transition-colors group-hover:text-muted-foreground/80"
                title={authors}
            >
                <UsersIcon className="size-3 shrink-0" />
                <span className="line-clamp-1">{authors}</span>
            </p>
            {publication.abstract && (
                <details className="group/details">
                    <summary className="inline cursor-pointer list-none text-muted-foreground/70 text-xs transition-colors hover:text-foreground">
                        <span className="inline-flex items-center gap-0.5 rounded-sm px-1 py-0.5">
                            <ChevronRightIcon className="size-3 transition-transform duration-200 group-open/details:rotate-90" />
                            Abstract
                        </span>
                    </summary>
                    <p className="mt-2 border-primary/30 border-l-2 bg-muted/30 py-2 pr-3 pl-3 text-muted-foreground text-xs leading-relaxed">
                        {publication.abstract}
                    </p>
                </details>
            )}
            <div className="mt-3 flex items-center gap-2">
                {publication.url && (
                    <Button variant="ghost" size="sm" asChild>
                        <Link
                            href={publication.url}
                            className="px-2 text-foreground/70 text-xs"
                        >
                            <ExternalLinkIcon className="size-3 transition-transform group-hover/link:scale-110" />
                            <span className="font-medium">Source</span>
                        </Link>
                    </Button>
                )}
                {publication.pdf && (
                    <Button variant="ghost" size="sm" asChild>
                        <Link
                            href={publication.pdf}
                            className="px-2 text-foreground/70 text-xs"
                        >
                            <FileIcon className="size-3 transition-transform group-hover/link:scale-110" />
                            <span className="font-medium">PDF</span>
                        </Link>
                    </Button>
                )}
            </div>
        </article>
    );
};
