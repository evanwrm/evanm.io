"use client";

import { FadeIn } from "@/components/animation/fade-in";
import { BlogCard } from "@/components/blog-card";
import { AutocompleteInput } from "@/components/input/autocomplete-input";
import { Label } from "@/components/ui/label";
import { Article } from "@/lib/validators/Article";
import { useState } from "react";

interface Props {
    articles: Article[];
}

export const ArticleSearch = ({ articles }: Props) => {
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);

    const handleFilter = (filteredArticles: Article[]) => {
        setFilteredArticles(filteredArticles);
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col p-2">
                <Label htmlFor="article-search" className="mb-4">
                    Search for articles.
                </Label>
                <AutocompleteInput
                    id="article-search"
                    options={articles}
                    getSearchContext={article =>
                        [
                            article.title,
                            article.logline,
                            article.tags?.flatMap(tag => [tag.name]).join(" ")
                        ].join(" ")
                    }
                    onValueChange={handleFilter}
                />
            </div>
            <div className="mt-4 flex flex-col p-2">
                {filteredArticles.length ? (
                    filteredArticles.map(article => (
                        <FadeIn key={article.slug} className="border-t first:border-none">
                            <BlogCard article={article} className="prose-li:my-px my-4" />
                        </FadeIn>
                    ))
                ) : (
                    <span>No articles found.</span>
                )}
            </div>
        </div>
    );
};
