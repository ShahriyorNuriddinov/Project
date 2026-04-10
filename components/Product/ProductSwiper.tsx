"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";
import Link from "next/link";


const ProductCarousel = () => {
  const { data: products, isLoading, isError } = useProducts();


  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">New Products</h2>
        <Link href={"/Allproducts"}>
          <button className="font-normal cursor-pointer text-sm leading-[115%] underline text-[#01a4ff]">
            See All New Products
          </button>
          </Link>


      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        navigation={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
      >
        {products?.map((item: any) => (
          <SwiperSlide key={item._id}>
            <ProductCard product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
