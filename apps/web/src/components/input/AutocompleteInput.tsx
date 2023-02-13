"use client";

import { fuzzySearch } from "@/lib/utils/search";
import { cn } from "@/lib/utils/styles";
import { useCallback, useState } from "react";

interface Props<T = string> {
    placeholder?: string;
    options: T[];
    getSearchContext?: (option: T) => string;
    onChange?: (results: T[]) => void;
}

const AutocompleteInput = <T = string,>({
    placeholder = "Search Query...",
    options,
    getSearchContext,
    onChange
}: Props<T>) => {
    const [query, setQuery] = useState("");
    const [, setResults] = useState<T[]>([]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const query = e.target.value;
            const results = fuzzySearch(query, options, getSearchContext);
            const resultOptions = results.map(result => result.document);

            setQuery(query);
            setResults(resultOptions);
            onChange?.(resultOptions);
        },
        [options, getSearchContext, onChange]
    );

    return (
        <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleChange}
            className={cn(
                "placeholder:text-base-content flex h-12 w-full py-2 px-3 text-sm transition",
                "border-base-200 rounded-md border bg-transparent",
                "focus:ring-offset-base-100 ring-base-300 outline-none ring-offset-0 focus:ring-2 focus:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50"
            )}
        />
    );
};

export default AutocompleteInput;
