"use client";

import FadeIn from "@/components/animation/FadeIn.";
import BlogCard from "@/components/BlogCard";
import AutocompleteInput from "@/components/input/AutocompleteInput";
import { Article } from "@/lib/validators/Article";
import { useState } from "react";

interface Props {
    articles: Article[];
}

const ArticleSearch = ({ articles }: Props) => {
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);

    const handleFilter = (filteredArticles: Article[]) => {
        setFilteredArticles(filteredArticles);
    };

    return (
        <>
            <div className="w-full p-2">
                <AutocompleteInput
                    options={articles}
                    getSearchContext={article =>
                        [
                            article.title,
                            article.logline,
                            article.tags?.flatMap(tag => [tag.name]).join(" ")
                        ].join(" ")
                    }
                    onChange={handleFilter}
                />
                <p className="py-2 text-sm opacity-80">Search for articles.</p>
            </div>
            <div className="my-6 w-full">
                {filteredArticles.length ? (
                    filteredArticles.map(article => (
                        <FadeIn key={article.slug}>
                            <BlogCard article={article} />
                        </FadeIn>
                    ))
                ) : (
                    <span className="opacity-80">No articles found.</span>
                )}
            </div>
        </>
    );
};

export default ArticleSearch;
