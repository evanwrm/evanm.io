"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { FadeIn } from "@/components/animation/fade-in";
import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";
import { fuzzySearch } from "@/lib/search";
import type { Article } from "@/lib/validators/article";

interface Props {
    articles: Article[];
}
export function ArticleSearch({ articles }: Props) {
    const [query, setQuery] = useState("");
    const [filteredArticles, setFilteredArticles] =
        useState<Article[]>(articles);

    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setQuery(value);
            if (!value.trim()) {
                setFilteredArticles(articles);
                return;
            }
            const results = fuzzySearch(value, articles, article =>
                [
                    article.title,
                    article.logline,
                    article.tags?.map(tag => tag.name).join(" "),
                ].join(" "),
            );
            setFilteredArticles(results.map(r => r.document));
        },
        [articles],
    );

    const clearSearch = () => {
        setQuery("");
        setFilteredArticles(articles);
    };

    return (
        <div className="flex flex-col gap-4">
            <InputGroup className="h-11 rounded-xl border-border/60 bg-card/50 backdrop-blur-sm transition-all focus-within:border-primary/50 focus-within:bg-card/80">
                <InputGroupAddon align="inline-start">
                    <InputGroupText>
                        <SearchIcon />
                    </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                    placeholder="Search articles..."
                    value={query}
                    onChange={handleSearch}
                />
                {query && (
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton
                            size="icon-xs"
                            onClick={clearSearch}
                            aria-label="Clear search"
                        >
                            <XIcon />
                        </InputGroupButton>
                    </InputGroupAddon>
                )}
            </InputGroup>
            {query && (
                <p className="ml-1 font-mono text-muted-foreground text-xs">
                    {filteredArticles.length} result
                    {filteredArticles.length === 1 ? "" : "s"}
                </p>
            )}
            <div className="rounded-xl border border-border/60 bg-card/50 p-3 backdrop-blur-sm">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map(article => (
                        <FadeIn key={article.slug}>
                            <BlogCard article={article} />
                        </FadeIn>
                    ))
                ) : (
                    <Empty className="border-0 py-12">
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <SearchIcon />
                            </EmptyMedia>
                            <EmptyTitle>No articles found</EmptyTitle>
                            <EmptyDescription>
                                Try a different search term or{" "}
                                <Button
                                    variant="link"
                                    onClick={clearSearch}
                                    className="px-1 font-medium text-primary hover:underline"
                                >
                                    clear your search
                                </Button>
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                )}
            </div>
        </div>
    );
}
