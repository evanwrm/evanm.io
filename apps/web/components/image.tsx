import type { ImageOutputFormat, ImageQuality } from "astro";
import { getImage } from "astro:assets";
import { cn } from "@/lib/utils";
import type { SanityMediaAsset } from "@/lib/validators/sanity";

export interface Props {
    src: string | SanityMediaAsset;
    alt?: string;
    width?: number;
    height?: number;
    format?: ImageOutputFormat;
    quality?: ImageQuality;
    className?: string;
}

// https://plaiceholder.co/
// https://png-pixel.com/
export async function Image({
    src,
    alt = "",
    width,
    height,
    format = "webp",
    quality = "mid",
    className,
}: Props) {
    const isSanity = typeof src === "object" && "url" in src;
    const url = isSanity ? src.url : src;
    const w = width ?? (isSanity ? src.metadata?.dimensions.width : undefined);
    const h =
        height ?? (isSanity ? src.metadata?.dimensions.height : undefined);
    const lqip = isSanity ? (src.metadata?.lqip ?? undefined) : undefined;

    const optimized = await getImage({
        src: url,
        width: w,
        height: h,
        format,
        quality,
    });

    return (
        <img
            src={optimized.src}
            alt={alt}
            width={w}
            height={h}
            loading="lazy"
            decoding="async"
            className={cn("object-cover", className)}
            style={
                lqip
                    ? {
                          backgroundImage: `url(${lqip})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                      }
                    : {}
            }
        />
    );
}
