export interface StrapiMedia {
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
