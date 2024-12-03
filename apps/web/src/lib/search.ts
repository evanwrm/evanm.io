import { defaultFilter } from "cmdk";

interface SearchResults<T = string> {
    score: number;
    document: T;
    context: string;
}

export const fuzzySearch = <T = string>(
    query: string,
    documents: T[],
    getSearchContext?: (option: T) => string
) => {
    const contexts = documents.map(
        getSearchContext ?? ((option: T) => (typeof option === "string" ? option : ""))
    );
    const results: SearchResults<T>[] = [];

    for (let i = 0; i < documents.length; i++) {
        const document = documents[i];
        const context = contexts[i];
        const score = defaultFilter?.(context, query, []) ?? 0;
        if (score > 0) {
            results.push({ score, document, context });
        }
    }

    // sort by score
    const rankedResults = results.sort(function (a, b) {
        if (a.score === b.score) return a.context.localeCompare(b.context);
        return b.score - a.score;
    });

    return rankedResults;
};
