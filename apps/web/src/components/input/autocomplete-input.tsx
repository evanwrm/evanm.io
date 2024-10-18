"use client";

import { Input } from "@/components/ui/input";
import { fuzzySearch } from "@/lib/search";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

interface Props<T = string> extends React.InputHTMLAttributes<HTMLInputElement> {
    options: T[];
    getSearchContext?: (option: T) => string;
    onValueChange?: (results: T[]) => void;
}

export function AutocompleteInput<T = string>({
    placeholder = "Search...",
    options,
    getSearchContext,
    onValueChange,
    className,
    ...props
}: Props<T>) {
    const [query, setQuery] = useState("");
    const [, setResults] = useState<T[]>([]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const query = e.target.value;
            const results = fuzzySearch(query, options, getSearchContext);
            const resultOptions = results.map(result => result.document);

            setQuery(query);
            setResults(resultOptions);
            onValueChange?.(resultOptions);
        },
        [options, getSearchContext, onValueChange]
    );

    return (
        <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleChange}
            className={cn(
                "focus:ring-offset-background !ring-input h-12 ring-offset-0 transition focus:ring-2 focus:ring-offset-2",
                className
            )}
            {...props}
        />
    );
}
