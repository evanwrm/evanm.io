import { formatDistance } from "date-fns";
import { ArrowRightIcon, ClockIcon, EyeIcon } from "lucide-react";
import { getIcon } from "@/components/icon";
import { Image } from "@/components/image";
import { Link } from "@/components/navigation/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { isReference } from "@/lib/services/sanity/utils";
import { cn } from "@/lib/utils";
import type { Article } from "@/lib/validators/article";

interface Props {
    article: Article;
    className?: string;
}

export function BlogCard({ article, className }: Props) {
    const readingTime = Math.ceil(article.stats.time / 60000);

    return (
        <Link
            href={`/blog/${article.slug}`}
            aria-label={`Read ${article.title}`}
        >
            <article
                className={cn(
                    "group relative -mx-3 border-border/60 border-b px-3 py-4 transition-all duration-200 last:border-b-0 hover:bg-muted/30",
                    className,
                )}
            >
                <div className="absolute top-0 left-0 h-full w-0.5 scale-y-0 bg-primary transition-transform duration-200 group-hover:scale-y-100" />
                <div className="flex gap-4">
                    {article.thumbnail?.asset &&
                        !isReference(article.thumbnail.asset) && (
                            <div className="hidden shrink-0 sm:block">
                                <Image
                                    src={article.thumbnail.asset}
                                    alt={
                                        article.thumbnail?.alt ?? article.title
                                    }
                                    width={64}
                                    height={64}
                                    className="size-16 rounded-lg object-cover ring-1 ring-border/50 transition-transform duration-200 group-hover:scale-[1.02] sm:h-20 sm:w-28"
                                />
                            </div>
                        )}
                    <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap gap-2 font-mono text-muted-foreground text-xs">
                            <span className="tabular-nums transition-colors group-hover:text-foreground/70">
                                {formatDistance(
                                    new Date(article._createdAt),
                                    new Date(),
                                    { addSuffix: true },
                                )}
                            </span>
                            <Separator
                                orientation="vertical"
                                className="data-[orientation=vertical]:h-auto"
                            />
                            <span className="inline-flex items-center gap-1">
                                <ClockIcon className="size-3" />
                                {readingTime} min read
                            </span>
                            <Separator
                                orientation="vertical"
                                className="data-[orientation=vertical]:h-auto"
                            />
                            <span className="inline-flex items-center gap-1">
                                <EyeIcon className="size-3" />
                                {article.stats.views.toLocaleString()} views
                            </span>
                        </div>
                        <h2 className="mb-1 font-semibold text-foreground/90 text-sm leading-snug tracking-tight transition-colors group-hover:text-foreground sm:text-base">
                            {article.title}
                        </h2>
                        {article.logline && (
                            <p className="mb-3 line-clamp-2 text-muted-foreground text-xs leading-relaxed sm:text-sm">
                                {article.logline}
                            </p>
                        )}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap gap-1.5">
                                {article.tags?.slice(0, 3).map(tag => {
                                    const TagIcon = tag.iconId
                                        ? getIcon(tag.iconId)
                                        : null;
                                    return (
                                        <Badge
                                            key={tag.name}
                                            variant="outline"
                                            className="rounded-full border-border/50 bg-background/50 px-2 py-0.5 font-normal text-[10px] transition-colors group-hover:border-border"
                                        >
                                            {TagIcon && (
                                                <TagIcon className="mr-1 size-2.5" />
                                            )}
                                            {tag.name}
                                        </Badge>
                                    );
                                })}
                                {article.tags && article.tags.length > 3 && (
                                    <Badge
                                        variant="outline"
                                        className="rounded-full border-border/50 bg-background/50 px-2 py-0.5 font-normal text-[10px]"
                                    >
                                        +{article.tags.length - 3}
                                    </Badge>
                                )}
                            </div>
                            <span className="inline-flex items-center gap-1 text-muted-foreground text-xs opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary group-hover:opacity-100">
                                Read more
                                <ArrowRightIcon className="size-3" />
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
