import NextImage from "next/image";
import React from "react";
import { StrapiMedia as ImageProps } from "../interfaces/StrapiMedia";
import { getMedia } from "../lib/media";

interface Props {
    image: ImageProps;
}

export const Image: React.FC<Props> = ({ image }: Props) => {
    const { width, height, alternativeText } = Array.isArray(image.data)
        ? image.data[0]?.attributes
        : image.data.attributes;

    return (
        <NextImage
            src={getMedia(image)}
            alt={alternativeText || ""}
            width={width}
            height={height}
            layout="responsive"
            objectFit="contain"
        />
    );
};
