import Image from "next/image";
import React from "react";
import IconProfile from "@/assets/icon_profile.svg";

export type ImageFallbackProps = {
  image?: string;
  alt?: string;
  height: number;
  width: number;
};

export const ImageFallback: React.FC<ImageFallbackProps> = ({
  image,
  alt = "image",
  height,
  width,
}) => {
  return image && image !== "" ? (
    <Image
      className="rounded-full"
      src={image}
      alt={alt}
      layout="fixed"
      height={height}
      width={width}
    />
  ) : (
    <IconProfile width={width} height={height} />
  );
};
