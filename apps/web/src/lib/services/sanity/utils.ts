import { SanityReference } from "@/lib/validators/sanity/SanityDocument";

export const groqSort = (sort: string | string[] | null | undefined) => {
    const sortPart = (Array.isArray(sort) ? sort : [sort]).map(s => `order(${s})`).join("|");
    const sortQuery = sortPart ? `|${sortPart}` : "";
    return sortQuery;
};

export const isReference = (value: any): value is SanityReference => {
    return value?._type === "reference";
};
