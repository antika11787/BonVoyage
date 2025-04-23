import Image from "next/image";
import React from "react";

const ImageAtom = ({
  src,
  alt,
  height,
  width,
  className,
  fullHeight = false,
  fullWidth = false,
}: {
  src: any;
  alt: string;
  height?: number;
  width?: number;
  className?: string;
  fullHeight?: boolean;
  fullWidth?: boolean;
}) => {
  return (
    <Image
      priority
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={`${fullHeight ? 'h-full' : ''} ${fullWidth ? 'w-full' : ''} object-cover ${className}`}
    />
  );
};

export default ImageAtom;
