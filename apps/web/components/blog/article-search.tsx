import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { BlogCard } from "@/components/blog/blog-card";
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
import { useTranslations } from "@/lib/i18n";
import { fuzzySearch } from "@/lib/search";
import type { Article } from "@/lib/validators/article";

interface Props {
    articles: Article[];
}
export function ArticleSearch({ articles }: Props) {
    const { t, formatNumber } = useTranslations();
    const [query, setQuery] = useState("");
    const [filteredArticles, setFilteredArticles] =
        useState<Article[]>(articles);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    };

    const clearSearch = () => {
        setQuery("");
        setFilteredArticles(articles);
    };

    return (
        <div className="flex flex-col gap-4">
            <InputGroup className="border-border/60 bg-card/50 focus-within:border-primary/50 focus-within:bg-card/80 h-11 rounded-xl backdrop-blur-sm transition-all">
                <InputGroupAddon align="inline-start">
                    <InputGroupText>
                        <SearchIcon />
                    </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                    placeholder={t("blog.searchPlaceholder")}
                    value={query}
                    onChange={handleSearch}
                />
                {query && (
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton
                            size="icon-xs"
                            onClick={clearSearch}
                            aria-label={t("blog.clearSearch")}
                        >
                            <XIcon />
                        </InputGroupButton>
                    </InputGroupAddon>
                )}
            </InputGroup>
            {query && (
                <p className="text-muted-foreground ml-1 font-mono text-xs">
                    {formatNumber(filteredArticles.length)}{" "}
                    {filteredArticles.length === 1
                        ? t("blog.result")
                        : t("blog.results")}
                </p>
            )}
            <div className="border-border/60 bg-card/50 rounded-xl border p-3 backdrop-blur-sm">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map(article => (
                        <BlogCard key={article.slug} article={article} />
                    ))
                ) : (
                    <Empty className="border-0 py-12">
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <SearchIcon />
                            </EmptyMedia>
                            <EmptyTitle>{t("blog.noArticlesFound")}</EmptyTitle>
                            <EmptyDescription>
                                {t("blog.noArticlesDescription")}{" "}
                                <Button
                                    variant="link"
                                    onClick={clearSearch}
                                    className="text-primary px-1 font-medium hover:underline"
                                >
                                    {t("blog.clearYourSearch")}
                                </Button>
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                )}
            </div>
        </div>
    );
}
