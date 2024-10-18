import {
    sanityDocumentValidator,
    sanityReferencesValidator
} from "@/lib/validators/sanity/sanity-document";
import { z } from "zod";

export const sanityMediaAssetMetadataValidator = z.object({
    blurHash: z.string().nullish(),
    dimensions: z.object({
        aspectRatio: z.number(),
        height: z.number(),
        width: z.number()
    }),
    hasAlpha: z.boolean(),
    isOpaque: z.boolean(),
    lqip: z.string().nullish()
    // palette:
});

export const sanityMediaAssetValidator = z
    .object({
        assetId: z.string(),
        extension: z.string(),
        mimeType: z.string(),
        originalFilename: z.string(),
        path: z.string(),
        sha1hash: z.string(),
        size: z.number(),
        uploadId: z.string(),
        url: z.string().url(),
        metadata: sanityMediaAssetMetadataValidator.nullish()
    })
    .merge(sanityDocumentValidator);
export type SanityMediaAsset = z.infer<typeof sanityMediaAssetValidator>;

export const sanityMediaValidator = z.object({
    title: z.string().nullish(),
    alt: z.string().nullish(),
    asset: z.union([sanityMediaAssetValidator, sanityReferencesValidator])
});
export type SanityMedia = z.infer<typeof sanityMediaValidator>;
