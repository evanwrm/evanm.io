import { Icon, getIcon } from "@/components/icon";
import { Link } from "@/components/navigation/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Article } from "@/lib/validators/Article";
import { formatDistance } from "date-fns";

interface Props {
    article: Article;
    className?: string;
}

export const BlogCard = ({ article, className }: Props) => {
    return (
        <div
            className={cn(
                "flex flex-col items-start justify-between sm:flex-row sm:items-center",
                className
            )}
        >
            <div className="flex w-full flex-col sm:w-auto">
                <Link
                    href={`/blog/${article.slug}`}
                    aria-label={`Read ${article.title}`}
                    className="text-foreground/80 hover:text-foreground transition"
                >
                    <h2 className="text-base font-bold sm:text-lg">{article.title}</h2>
                </Link>
                <div className="my-2 flex flex-wrap gap-1">
                    {article.tags?.map(tag => {
                        const SkillIcon = tag.iconId ? getIcon(tag.iconId) : null;
                        return (
                            <Badge
                                key={tag.name}
                                variant="outline"
                                className="rounded-full text-xs"
                            >
                                {SkillIcon && <SkillIcon className="mr-1" />}
                                {tag.name}
                            </Badge>
                        );
                    })}
                </div>
                {article.logline && (
                    <p className="prose line-clamp-3 text-xs sm:text-sm">{article.logline}</p>
                )}
            </div>
            <div className="mt-2 flex w-full flex-row items-start justify-between sm:mt-0 sm:w-auto sm:flex-col sm:items-end sm:justify-center">
                <span className="text-xs sm:text-sm">
                    {formatDistance(new Date(article._createdAt), new Date())} ago
                </span>
                <div className="mt-1 flex flex-col items-end">
                    <div className="text-muted-foreground flex items-center justify-center text-xs italic sm:text-sm">
                        <span className="mr-1 font-semibold">
                            {Math.ceil(article.stats.time / 60000)}
                        </span>
                        <span>min read</span>
                        <Icon.MdAccessTime className="ml-2 h-4 w-4" />
                    </div>
                    <div className="text-muted-foreground flex items-center justify-center text-xs italic sm:text-sm">
                        <span className="mr-1 font-semibold">{Math.ceil(article.stats.views)}</span>
                        <span>views</span>
                        <Icon.HiOutlineEye className="ml-2 h-4 w-4" />
                    </div>
                </div>
            </div>
        </div>
    );
};
