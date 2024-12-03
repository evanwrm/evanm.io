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
        const score = commandScore(context, query, []);
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

// copy original code cmdk since its not exported as a module
// https://github.com/pacocoursey/cmdk/blob/main/cmdk/src/command-score.ts

const SCORE_CONTINUE_MATCH = 1;
const SCORE_SPACE_WORD_JUMP = 0.9;
const SCORE_NON_SPACE_WORD_JUMP = 0.8;
const SCORE_CHARACTER_JUMP = 0.17;
const SCORE_TRANSPOSITION = 0.1;
const PENALTY_SKIPPED = 0.999;
const PENALTY_CASE_MISMATCH = 0.9999;
// const PENALTY_DISTANCE_FROM_START = 0.9;
const PENALTY_NOT_COMPLETE = 0.99;

const IS_GAP_REGEXP = /[\\\/_+.#"@\[\(\{&]/;
const COUNT_GAPS_REGEXP = /[\\\/_+.#"@\[\(\{&]/g;
const IS_SPACE_REGEXP = /[\s-]/;
const COUNT_SPACE_REGEXP = /[\s-]/g;

function commandScoreInner(
    value: string,
    abbreviation: string,
    lowerString: string,
    lowerAbbreviation: string,
    stringIndex: number,
    abbreviationIndex: number,
    memoizedResults: Record<string, number>
) {
    if (abbreviationIndex === abbreviation.length) {
        if (stringIndex === value.length) return SCORE_CONTINUE_MATCH;
        return PENALTY_NOT_COMPLETE;
    }

    const memoizeKey = `${stringIndex},${abbreviationIndex}`;
    if (memoizedResults[memoizeKey] !== undefined) return memoizedResults[memoizeKey];

    const abbreviationChar = lowerAbbreviation.charAt(abbreviationIndex);
    let index = lowerString.indexOf(abbreviationChar, stringIndex);
    let highScore = 0;

    let score, transposedScore, wordBreaks, spaceBreaks;

    while (index >= 0) {
        score = commandScoreInner(
            value,
            abbreviation,
            lowerString,
            lowerAbbreviation,
            index + 1,
            abbreviationIndex + 1,
            memoizedResults
        );
        if (score > highScore) {
            if (index === stringIndex) score *= SCORE_CONTINUE_MATCH;
            else if (IS_GAP_REGEXP.test(value.charAt(index - 1))) {
                score *= SCORE_NON_SPACE_WORD_JUMP;
                wordBreaks = value.slice(stringIndex, index - 1).match(COUNT_GAPS_REGEXP);
                if (wordBreaks && stringIndex > 0)
                    score *= Math.pow(PENALTY_SKIPPED, wordBreaks.length);
            } else if (IS_SPACE_REGEXP.test(value.charAt(index - 1))) {
                score *= SCORE_SPACE_WORD_JUMP;
                spaceBreaks = value.slice(stringIndex, index - 1).match(COUNT_SPACE_REGEXP);
                if (spaceBreaks && stringIndex > 0)
                    score *= Math.pow(PENALTY_SKIPPED, spaceBreaks.length);
            } else {
                score *= SCORE_CHARACTER_JUMP;
                if (stringIndex > 0) score *= Math.pow(PENALTY_SKIPPED, index - stringIndex);
            }

            if (value.charAt(index) !== abbreviation.charAt(abbreviationIndex))
                score *= PENALTY_CASE_MISMATCH;
        }

        if (
            (score < SCORE_TRANSPOSITION &&
                lowerString.charAt(index - 1) ===
                    lowerAbbreviation.charAt(abbreviationIndex + 1)) ||
            (lowerAbbreviation.charAt(abbreviationIndex + 1) ===
                lowerAbbreviation.charAt(abbreviationIndex) && // allow duplicate letters. Ref #7428
                lowerString.charAt(index - 1) !== lowerAbbreviation.charAt(abbreviationIndex))
        ) {
            transposedScore = commandScoreInner(
                value,
                abbreviation,
                lowerString,
                lowerAbbreviation,
                index + 1,
                abbreviationIndex + 2,
                memoizedResults
            );
            if (transposedScore * SCORE_TRANSPOSITION > score)
                score = transposedScore * SCORE_TRANSPOSITION;
        }

        if (score > highScore) highScore = score;

        index = lowerString.indexOf(abbreviationChar, index + 1);
    }

    memoizedResults[memoizeKey] = highScore;
    return highScore;
}
function formatInput(value: string) {
    return value.toLowerCase().replace(COUNT_SPACE_REGEXP, " ");
}
export function commandScore(value: string, abbreviation: string, aliases: string[]): number {
    const aliasedValue = aliases && aliases.length > 0 ? `${value} ${aliases.join(" ")}` : value;
    return commandScoreInner(
        aliasedValue,
        abbreviation,
        formatInput(aliasedValue),
        formatInput(abbreviation),
        0,
        0,
        {}
    );
}
