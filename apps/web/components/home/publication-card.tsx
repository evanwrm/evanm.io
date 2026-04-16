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
import { ButtonLink } from "@/components/link";
import { Separator } from "@/components/ui/separator";
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

    return (
        <article className="group border-border/60 hover:bg-muted/30 relative -mx-3 border-b px-3 py-4 transition-all duration-200 last:border-b-0">
            <div className="bg-primary absolute top-0 left-0 h-full w-0.5 scale-y-0 transition-transform duration-200 group-hover:scale-y-100" />
            <div className="text-muted-foreground mb-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs">
                <span className="group-hover:text-foreground/70 inline-flex items-center gap-1 tabular-nums transition-colors">
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
                            className="group-hover:text-foreground/70 inline-flex max-w-48 items-center gap-1 transition-colors"
                            title={venue}
                        >
                            <BookOpenIcon className="size-3 shrink-0" />
                            <span className="truncate">{venue}</span>
                        </span>
                    </>
                )}
                {!!publication.award && (
                    <>
                        <Separator
                            orientation="vertical"
                            className="data-[orientation=vertical]:h-auto"
                        />
                        <span
                            className="inline-flex items-center gap-1 rounded-sm bg-linear-to-r from-amber-500/20 to-orange-500/20 px-1.5 py-0.5 text-amber-600 ring-1 ring-amber-500/30 dark:text-amber-400"
                            title={publication.award}
                        >
                            <StarIcon className="size-3" fill="currentColor" />
                            <span className="text-[10px] font-medium tracking-wide uppercase">
                                Award
                            </span>
                        </span>
                    </>
                )}
                {isNew && (
                    <>
                        <Separator
                            orientation="vertical"
                            className="data-[orientation=vertical]:h-auto"
                        />
                        <span className="relative rounded-sm bg-linear-to-r from-emerald-500/20 to-teal-500/20 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-emerald-600 uppercase ring-1 ring-emerald-500/30 dark:text-emerald-400">
                            <span className="absolute inset-0 animate-pulse rounded-sm bg-emerald-500/10" />
                            <span className="relative">New</span>
                        </span>
                    </>
                )}
            </div>
            <h3 className="mb-1.5 text-sm leading-snug font-medium tracking-tight">
                {publication.title}
            </h3>
            <p
                className="text-muted-foreground group-hover:text-muted-foreground/80 mb-2 flex items-center gap-1 text-xs transition-colors"
                title={authors}
            >
                <UsersIcon className="size-3 shrink-0" />
                <span className="line-clamp-1">{authors}</span>
            </p>
            {publication.abstract && (
                <details className="group/details">
                    <summary className="text-muted-foreground hover:text-foreground inline cursor-pointer list-none text-xs transition-colors">
                        <span className="inline-flex items-center gap-0.5 rounded-sm px-1 py-0.5">
                            <ChevronRightIcon className="size-3 transition-transform duration-200 group-open/details:rotate-90" />
                            Abstract
                        </span>
                    </summary>
                    <p className="border-primary/30 bg-muted/30 text-muted-foreground mt-2 border-l-2 py-2 pr-3 pl-3 text-xs leading-relaxed">
                        {publication.abstract}
                    </p>
                </details>
            )}
            <div className="mt-3 flex items-center gap-2">
                {publication.url && (
                    <ButtonLink
                        href={publication.url}
                        variant="ghost"
                        size="sm"
                        className="text-foreground/70 px-2 text-xs"
                    >
                        <ExternalLinkIcon className="size-3" />
                        <span className="font-medium">Source</span>
                    </ButtonLink>
                )}
                {publication.pdf && (
                    <ButtonLink
                        href={publication.pdf}
                        variant="ghost"
                        size="sm"
                        className="text-foreground/70 px-2 text-xs"
                    >
                        <FileIcon className="size-3" />
                        <span className="font-medium">PDF</span>
                    </ButtonLink>
                )}
            </div>
        </article>
    );
};
