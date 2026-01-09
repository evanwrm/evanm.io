import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import type { SanityMediaAsset } from "@/lib/validators/sanity/sanity-media";

export interface Props {
    src: string | StaticImport | SanityMediaAsset;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
}

// https://plaiceholder.co/
// https://png-pixel.com/
export const Image = ({ src, alt = "", width, height, className }: Props) => {
    const isSanity = typeof src === "object" && "url" in src;
    const url = isSanity ? src.url : src;
    const w = width ?? (isSanity ? src.metadata?.dimensions.width : undefined);
    const h =
        height ?? (isSanity ? src.metadata?.dimensions.height : undefined);
    const lqip = isSanity ? (src.metadata?.lqip ?? undefined) : undefined;
    return (
        <NextImage
            src={url}
            alt={alt}
            width={w}
            height={h}
            fill={!width && !height}
            className={cn(className, "object-cover")}
            placeholder="blur"
            blurDataURL={lqip}
        />
    );
};
