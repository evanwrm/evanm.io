import { format } from "date-fns";
import { CalendarIcon, ClockIcon, EyeIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ViewCounter from "@/components/analytics/view-counter";
import { getIcon } from "@/components/icon";
import { Image } from "@/components/image";
import { Markdown } from "@/components/mdx/markdown";
import { Link } from "@/components/navigation/link";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    articleFind,
    articleFindOne,
    settingsFind,
} from "@/lib/services/sanity/queries";
import { isReference } from "@/lib/services/sanity/utils";

type Params = { slug: string };
interface Props {
    params: Promise<Params>;
}

export const revalidate = 60;
export const generateMetadata = async ({
    params,
}: Props): Promise<Metadata> => {
    const slug = (await params).slug;
    const article = await articleFindOne({ slug });
    return { title: article?.title };
};

export default async function BlogPost({ params }: Props) {
    const slug = (await params).slug;
    const [article, settings] = await Promise.all([
        articleFindOne({ slug }),
        settingsFind(),
    ]);
    if (!article) return notFound();

    const readingTime = Math.ceil(article.stats.time / 60000);

    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-12">
            <Breadcrumb className="mb-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/blog">Blog</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{article.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-col gap-4">
                <h1 className="text-balance font-extrabold text-4xl tracking-tight lg:text-5xl">
                    {article.title}
                </h1>
                <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-muted-foreground text-xs">
                    {settings.avatar &&
                        !isReference(settings.avatar?.asset) && (
                            <div className="flex items-center gap-2">
                                <Image
                                    src={settings.avatar.asset}
                                    alt={settings.avatar.alt ?? "Author"}
                                    width={20}
                                    height={20}
                                    className="rounded-full ring-1 ring-border/50"
                                />
                                <span className="font-medium text-foreground">
                                    {settings.firstName} {settings.lastName}
                                </span>
                            </div>
                        )}
                    <Separator
                        orientation="vertical"
                        className="data-[orientation=vertical]:h-auto"
                    />
                    <div className="flex items-center gap-1.5">
                        <CalendarIcon className="size-3.5" />
                        <span>
                            {format(
                                new Date(article._createdAt),
                                "MMM dd, yyyy",
                            )}
                        </span>
                    </div>
                    <Separator
                        orientation="vertical"
                        className="data-[orientation=vertical]:h-auto"
                    />
                    <div className="flex items-center gap-1.5">
                        <ClockIcon className="size-3.5" />
                        <span>{readingTime} min read</span>
                    </div>
                    <Separator
                        orientation="vertical"
                        className="data-[orientation=vertical]:h-auto"
                    />
                    <div className="flex items-center gap-1.5">
                        <EyeIcon className="size-3.5" />
                        <span>
                            {article.stats.views.toLocaleString()} views
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {article.tags.map(tag => {
                            const TagIcon = tag.iconId
                                ? getIcon(tag.iconId)
                                : null;
                            return (
                                <Badge
                                    key={tag.name}
                                    variant="outline"
                                    className="rounded-full border-border/50 bg-background/50 px-2 py-0.5 font-normal text-[10px]"
                                >
                                    {TagIcon && (
                                        <TagIcon className="mr-1 size-2.5" />
                                    )}
                                    {tag.name}
                                </Badge>
                            );
                        })}
                    </div>
                )}
            </div>
            {article.thumbnail && !isReference(article.thumbnail.asset) && (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/60 bg-muted/30 shadow-sm">
                    <Image
                        src={article.thumbnail.asset}
                        alt={article.thumbnail.alt ?? article.title}
                        width={1200}
                        height={630}
                        className="h-full w-full object-cover"
                    />
                </div>
            )}
            <Markdown source={article.content} className="mt-12 mb-8" />
            <ViewCounter documentId={article._id} />
        </div>
    );
}

export const generateStaticParams = async (): Promise<Params[]> => {
    const slugs: string[] = [];
    const pageSize = 100;
    for (let page = 1; ; page++) {
        const articles = await articleFind({
            sort: "_createdAt desc",
            pagination: { page, pageSize },
        });
        slugs.push(...articles.map(article => article.slug));
        if (articles.length < pageSize) break;
    }
    return slugs.map(slug => ({ slug }));
};
