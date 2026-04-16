import * as z from "zod";

export const sanityTimestampValidator = z.object({
    _createdAt: z.string(),
    _updatedAt: z.string(),
});
export type SanityTimestamp = z.infer<typeof sanityTimestampValidator>;

export const sanityQueryParamValidator = z.object({
    sort: z.union([z.string(), z.array(z.string())]).nullish(),
    pagination: z
        .union([
            z.object({ page: z.number(), pageSize: z.number() }),
            z.object({ start: z.number(), limit: z.number() }),
        ])
        .nullish(),
});
export type SanityQueryParams = z.infer<typeof sanityQueryParamValidator>;

export const sanityReferenceValidator = z.object({
    _ref: z.string(),
    _type: z.literal("reference"),
});
export type SanityReference = z.infer<typeof sanityReferenceValidator>;

export const sanityDocumentValidator = z
    .object({
        _id: z.string(),
        _type: z.string(),
        _rev: z.string(),
    })
    .extend(sanityTimestampValidator.shape);
export type SanityDocument = z.infer<typeof sanityDocumentValidator>;

export const sanityMediaAssetMetadataValidator = z.object({
    blurHash: z.string().nullish(),
    dimensions: z.object({
        aspectRatio: z.number(),
        height: z.number(),
        width: z.number(),
    }),
    hasAlpha: z.boolean(),
    isOpaque: z.boolean(),
    lqip: z.string().nullish(),
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
        url: z.url(),
        metadata: sanityMediaAssetMetadataValidator.nullish(),
    })
    .extend(sanityDocumentValidator.shape);
export type SanityMediaAsset = z.infer<typeof sanityMediaAssetValidator>;

export const sanityMediaValidator = z.object({
    title: z.string().nullish(),
    alt: z.string().nullish(),
    asset: z.union([sanityMediaAssetValidator, sanityReferenceValidator]),
});
export type SanityMedia = z.infer<typeof sanityMediaValidator>;
