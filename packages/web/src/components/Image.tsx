import NextImage from "next/image";
import React from "react";
import { Image as ImageProps } from "../interfaces/Image";
import { getMedia } from "../lib/media";

interface Props {
    image: ImageProps;
}

export const Image: React.FC<Props> = ({ image }: Props) => {
    const { width, height, alternativeText } = image.data.attributes;

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
