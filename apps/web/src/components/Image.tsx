import NextImage from "next/image";
import React from "react";
import { getMedia } from "../lib/media";
import { StrapiMedia } from "../validators/StrapiMedia";

interface Props {
    image: StrapiMedia;
    alt?: string;
    className?: string;
}

export const Image: React.FC<Props> = ({ image, alt = "", className }: Props) => {
    const { width, height, alternativeText } = image;

    return (
        <NextImage
            src={getMedia(image)}
            alt={alternativeText || alt}
            width={width ?? undefined}
            height={height ?? undefined}
            layout="intrinsic"
            objectFit="contain"
            className={className}
        />
    );
};
