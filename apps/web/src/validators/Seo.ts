import { z } from "zod";
import { timestampValidator } from "./Timestamp";

export const twitterValidator = z.object({
    handle: z.string().optional(),
    site: z.string().optional(),
    cardType: z.string().optional()
});
export type Twitter = z.infer<typeof twitterValidator>;

export const openGraphProfileValidator = z.object({
    firstName: z.string().nullish(),
    lastName: z.string().nullish(),
    username: z.string().nullish(),
    gender: z.string().nullish()
});
export const openGraphMediaValidator = z.object({
    url: z.string(),
    width: z.number().nullish(),
    height: z.number().nullish(),
    alt: z.string().nullish(),
    type: z.string().nullish(),
    secureUrl: z.string().nullish()
});
export const openGraphValidator = z.object({
    url: z.string().nullish(),
    type: z.string().nullish(),
    title: z.string().nullish(),
    description: z.string().nullish(),
    site_name: z.string().nullish(),
    locale: z.string().nullish(),
    images: z.array(openGraphMediaValidator).nullish(),
    profile: openGraphProfileValidator.nullish()
});
export type OpenGraphMediaProfile = z.infer<typeof openGraphProfileValidator>;
export type OpenGraphMedia = z.infer<typeof openGraphMediaValidator>;
export type OpenGraph = z.infer<typeof openGraphValidator>;

// See NextSeoProps
export const seoValidator = z
    .object({
        title: z.string().nullish(),
        titleTemplate: z.string().nullish(),
        description: z.string().nullish(),
        canonical: z.string().nullish(),
        openGraph: openGraphValidator.nullish(),
        twitter: twitterValidator.nullish()
    })
    .merge(timestampValidator);
export type Seo = z.infer<typeof seoValidator>;
