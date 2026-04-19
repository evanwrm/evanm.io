import * as z from "zod";
import { sanityDocumentValidator } from "@/lib/validators/sanity";

export const authorsValidator = z.array(
    z.object({
        name: z.string(),
        url: z.url().optional(),
    }),
);
export type Authors = z.infer<typeof authorsValidator>;

export const openGraphProfileValidator = z.object({
    firstName: z.string().nullish(),
    lastName: z.string().nullish(),
    username: z.string().nullish(),
    gender: z.string().nullish(),
});
export const openGraphMediaValidator = z.object({
    url: z.url(),
    secureUrl: z.url().nullish(),
    alt: z.string().nullish(),
    type: z.string().nullish(),
    width: z.number().nullish(),
    height: z.number().nullish(),
});
export const openGraphValidator = z.object({
    title: z.string().nullish(),
    description: z.string().nullish(),
    determiner: z.enum(["a", "an", "the", "auto", ""]).nullish(),
    emails: z.union([z.string(), z.array(z.string())]).nullish(),
    phoneNumbers: z.union([z.string(), z.array(z.string())]).nullish(),
    faxNumbers: z.union([z.string(), z.array(z.string())]).nullish(),
    siteName: z.string().nullish(),
    locale: z.string().nullish(),
    alternateLocale: z.union([z.string(), z.array(z.string())]).nullish(),
    images: z.array(openGraphMediaValidator).nullish(),
    audio: z.array(openGraphMediaValidator).nullish(),
    videos: z.array(openGraphMediaValidator).nullish(),
    url: z.url().nullish(),
    countryName: z.string().nullish(),
    ttl: z.number().nullish(),
    type: z.string().nullish(),
    publishedTime: z.string().nullish(),
    modifiedTime: z.string().nullish(),
    authors: z.array(z.string()).nullish(),
    tags: z.array(z.string()).nullish(),
    profile: openGraphProfileValidator.nullish(),
});
export type OpenGraphMediaProfile = z.infer<typeof openGraphProfileValidator>;
export type OpenGraphMedia = z.infer<typeof openGraphMediaValidator>;
export type OpenGraphAudio = z.infer<typeof openGraphMediaValidator>;
export type OpenGraphVideo = z.infer<typeof openGraphMediaValidator>;
export type OpenGraph = z.infer<typeof openGraphValidator>;

export const twitterValidator = z.object({
    title: z.string().nullish(),
    description: z.string().nullish(),
    images: z.array(openGraphMediaValidator).nullish(),
    cardType: z.string().optional(),
    site: z.string().optional(),
    siteId: z.string().nullish(),
    creator: z.string().optional(),
    creatorId: z.string().nullish(),
});
export type Twitter = z.infer<typeof twitterValidator>;

export const seoValidator = z
    .object({
        title: z.string().nullish(),
        titleTemplate: z.string().nullish(),
        description: z.string().nullish(),
        authors: authorsValidator.nullish(),
        keywords: z.array(z.string()).nullish(),
        canonical: z.url().nullish(),
        creator: z.string().nullish(),
        publisher: z.string().nullish(),
        openGraph: openGraphValidator.nullish(),
        twitter: twitterValidator.nullish(),
    })
    .extend(sanityDocumentValidator.shape);
export type Seo = z.infer<typeof seoValidator>;
