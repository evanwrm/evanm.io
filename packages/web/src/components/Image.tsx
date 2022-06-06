import NextImage from "next/image";
import React from "react";
import { StrapiMedia } from "../interfaces/StrapiMedia";
import { getMedia } from "../lib/media";

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
            width={width}
            height={height}
            layout="intrinsic"
            objectFit="contain"
            className={className}
        />
    );
};
