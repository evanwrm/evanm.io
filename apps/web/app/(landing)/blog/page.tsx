import { EyeIcon, FileTextIcon, PenLineIcon } from "lucide-react";
import type { Metadata } from "next";
import { FadeIn } from "@/components/animation/fade-in";
import { ArticleSearch } from "@/components/article-search";
import { articleFind } from "@/lib/services/sanity/queries";

export const revalidate = 60;
export const metadata: Metadata = {
    title: "Blog",
};

export default async function Blog() {
    const articles = await articleFind({ sort: "_createdAt desc" });
    const totalWords = articles.reduce((sum, a) => sum + a.stats.words, 0);
    const totalViews = articles.reduce((sum, a) => sum + a.stats.views, 0);

    return (
        <div className="mx-auto w-full max-w-3xl px-4 py-12">
            <FadeIn className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-muted-foreground text-xs">
                    <div className="flex items-center gap-1.5">
                        <FileTextIcon className="size-3" />
                        <span className="font-medium text-foreground">
                            {articles.length}
                        </span>
                        <span>articles</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <PenLineIcon className="size-3" />
                        <span className="font-medium text-foreground">
                            {totalWords.toLocaleString()}
                        </span>
                        <span>words</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <EyeIcon className="size-3" />
                        <span className="font-medium text-foreground">
                            {totalViews.toLocaleString()}
                        </span>
                        <span>views</span>
                    </div>
                </div>
                <ArticleSearch articles={articles} />
            </FadeIn>
        </div>
    );
}
