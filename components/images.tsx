"use client";

import { FC, useState } from "react";
import Image from "next/image";

interface ImagesProps {
  product: {
    image: string;
    name: string;
  };
  fill?: boolean;
}

const CustomImage: FC<ImagesProps> = ({ product, fill }) => {
  const [isloading, setIsLoading] = useState(true);

  return (
    <Image
      src={product.image}
      alt={product.name}
      fill={fill}
      width={!fill ? 400 : undefined}
      height={!fill ? 1000 : undefined}
      className={`object-contain duration-700 ease-in-out group-hover:opacity-75 ${isloading
          ? "scale-110 blur-2xl grayscale"
          : "scale-100 blur-0 grayscale-0"
        }`}
      onLoadingComplete={() => setIsLoading(false)}
    />
  );
};

export default CustomImage;
