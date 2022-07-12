import clsx from "clsx";
import NextImage from "next/future/image";
import { getMedia, getMediaThumbnail } from "../lib/media";
import { StrapiMedia } from "../validators/StrapiMedia";

interface Props {
    image: StrapiMedia;
    alt?: string;
    className?: string;
}

// https://plaiceholder.co/
// https://png-pixel.com/
export const Image = ({ image, alt = "", className }: Props) => {
    const { width, height, alternativeText } = image;

    return (
        <NextImage
            src={getMedia(image)}
            alt={alternativeText || alt}
            width={width ?? undefined}
            height={height ?? undefined}
            className={clsx(className, "object-cover")}
            placeholder="blur"
            blurDataURL={getMediaThumbnail(image)}
        />
    );
};
