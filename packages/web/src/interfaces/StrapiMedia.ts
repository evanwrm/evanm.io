export interface StrapiMedia {
    data: StrapiData;
    meta: Record<string, unknown>;
}

export interface StrapiData {
    id: number;
    attributes: StrapiAttributes;
}

export interface StrapiAttributes {
    name?: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider?: string;
}

export interface StrapiTimestamp {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
}
