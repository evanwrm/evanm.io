import Icon, { getIconAliased } from "@/components/Icon";
import NavLink from "@/components/navigation/NavLink";
import { Article } from "@/lib/validators/Article";
import { formatDistance } from "date-fns";

interface Props {
    article: Article;
}

const BlogCard = ({ article }: Props) => {
    return (
        <div className="border-base-200 w-full border-t border-solid py-2">
            <div className="flex flex-row items-center justify-between">
                <div>
                    <NavLink
                        href={`/blog/${article.slug}`}
                        aria-label={`Read ${article.title}`}
                        className="opacity-80 transition hover:opacity-100"
                    >
                        <h2 className="text-3xl font-bold">{article.title}</h2>
                    </NavLink>
                    <div className="mt-2 pb-2 pt-1">
                        {article.tags?.map(tag => {
                            const SkillIcon = tag.iconId ? getIconAliased(tag.iconId) : null;

                            return (
                                <div
                                    className="badge text-base-content hover:text-primary focus:text-primary gap-2 py-3 transition"
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
                    <span className="opacity-80">
                        {formatDistance(new Date(article._createdAt), new Date())} ago
                    </span>
                    <div className="mt-1 flex items-center justify-center text-sm italic opacity-60">
                        <span className="mr-1 font-semibold">
                            {Math.ceil(article.stats.time / 1000)}
                        </span>
                        <span>min read</span>
                        <Icon.MdAccessTime className="ml-2 h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-center text-sm italic opacity-60">
                        <span className="mr-1 font-semibold">{Math.ceil(article.stats.views)}</span>
                        <span>views</span>
                        <Icon.HiOutlineEye className="ml-2 h-4 w-4" />
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
