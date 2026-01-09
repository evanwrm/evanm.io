import { z } from "zod";
import { sanityDocumentValidator } from "@/lib/validators/sanity/sanity-document";

export const authorsValidator = z.array(
    z.object({
        name: z.string(),
        url: z.string().optional(),
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
    url: z.string(),
    width: z.number().nullish(),
    height: z.number().nullish(),
    alt: z.string().nullish(),
    type: z.string().nullish(),
    secureUrl: z.string().nullish(),
});
export const openGraphValidator = z.object({
    url: z.string().nullish(),
    type: z.string().nullish(),
    title: z.string().nullish(),
    description: z.string().nullish(),
    siteName: z.string().nullish(),
    locale: z.string().nullish(),
    images: z.array(openGraphMediaValidator).nullish(),
    profile: openGraphProfileValidator.nullish(),
});
export type OpenGraphMediaProfile = z.infer<typeof openGraphProfileValidator>;
export type OpenGraphMedia = z.infer<typeof openGraphMediaValidator>;
export type OpenGraph = z.infer<typeof openGraphValidator>;

export const twitterValidator = z.object({
    creator: z.string().optional(),
    site: z.string().optional(),
    cardType: z.string().optional(),
});
export type Twitter = z.infer<typeof twitterValidator>;

// See NextSeoProps
export const seoValidator = z
    .object({
        title: z.string().nullish(),
        titleTemplate: z.string().nullish(),
        description: z.string().nullish(),
        authors: authorsValidator.nullish(),
        keywords: z.array(z.string()).nullish(),
        creator: z.string().nullish(),
        publisher: z.string().nullish(),
        canonical: z.string().nullish(),
        openGraph: openGraphValidator.nullish(),
        twitter: twitterValidator.nullish(),
    })
    .merge(sanityDocumentValidator);
export type Seo = z.infer<typeof seoValidator>;
