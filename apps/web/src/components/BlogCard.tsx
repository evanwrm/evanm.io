import NavLink from "@/components/navigation/NavLink";
import { Article } from "@/lib/validators/Article";
import { formatDistance } from "date-fns";
import { getIconAliased } from "./Icon";

interface Props {
    article: Article;
}

const BlogCard = ({ article }: Props) => {
    return (
        <div className="border-base-200 w-full border-b border-solid p-2" key={article.slug}>
            <div className="flex flex-row items-center justify-between">
                <div>
                    <NavLink
                        href={`/blog/${article.slug}`}
                        aria-label={`Read ${article.title}`}
                        className="opacity-80 transition hover:opacity-100"
                    >
                        <h2 className="text-3xl">{article.title}</h2>
                    </NavLink>
                    <div className="mt-2 p-2">
                        {article.tags?.map(tag => {
                            const SkillIcon = tag.iconId ? getIconAliased(tag.iconId) : null;

                            return (
                                <div
                                    className="badge badge-outline text-base-content hover:text-primary focus:text-primary gap-2 py-3 transition"
                                    key={tag.name}
                                >
                                    {SkillIcon && <SkillIcon className="inline-block h-4 w-4" />}
                                    {tag.name}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col items-end justify-center">
                    <span>{formatDistance(new Date(article._createdAt), new Date())} ago</span>
                    <div className="italic opacity-80">
                        <span className="mr-1 font-semibold">
                            {Math.ceil(article.stats.time / 1000)}
                        </span>
                        <span>min read</span>
                    </div>
                </div>
            </div>
            <div className="py-2">
                <p className="prose line-clamp-3">{article.logline}</p>
            </div>
        </div>
    );
};

export default BlogCard;
