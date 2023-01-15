import { cn } from "@/lib/utils/styles";
import { SanityMediaAsset } from "@/lib/validators/sanity/SanityMedia";
import NextImage from "next/image";

interface Props {
    image: SanityMediaAsset;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
}

// https://plaiceholder.co/
// https://png-pixel.com/
export const Image = ({ image, alt = "", width, height, className }: Props) => {
    const { width: sourceWidth, height: sourceHeight } = image.metadata?.dimensions ?? {};
    const lqip = image.metadata?.lqip ?? undefined;

    return (
        <NextImage
            src={image.url}
            alt={alt}
            width={width ?? sourceWidth}
            height={height ?? sourceHeight}
            className={cn(className, "object-cover")}
            placeholder="blur"
            blurDataURL={lqip}
        />
    );
};
