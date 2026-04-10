"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const slides = [
  {
    title: "Outplay the Competittion",
    desc: "Experience a 40% boost in computing from last generation. MSI Desktop equips the 10th Gen Intel® Core™ i7 processor with the utmost computing power to bring you an unparalleled gaming experience.",
    legal: "*Performance compared to i7-9700. Specs varies by model.",
    img: "/i.png",
  },
  {
    title: "Outplay the Competittion",
    desc: "Experience a 40% boost in computing from last generation. MSI Desktop equips the 10th Gen. Intel® Core™ i7 processor with the upmost computing power to bring you an unparalleled gaming experience.",
    legal: "*Based on internal testing.",
    img: "/i.png",
  },
];

const BannerSlider = () => {
  return (
    <div className="w-full bg-black my-16">
      <div className="container mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={false}
          pagination={{ clickable: true, el: ".custom-dots" }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="rounded-sm overflow-hidden"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="text-white flex flex-col md:flex-row items-center min-h-[440px] px-10 md:px-20 py-10 relative">
                <div className="flex-1 z-10 text-center md:text-left">
                  <h2 className="text-3xl md:text-5xl font-medium leading-tight mb-5">
                    {slide.title.split(" ").map((word, i) =>
                      i === 2 ? (
                        <span key={i}><br />{word} </span>
                      ) : (
                        <span key={i}>{word} </span>
                      )
                    )}
                  </h2>
                  <p className="text-sm md:text-base text-gray-300 font-light mb-6 max-w-md mx-auto md:mx-0">
                    {slide.desc}
                  </p>
                  <p className="text-[10px] text-gray-500 font-light italic">
                    {slide.legal}
                  </p>
                </div>
                <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full max-w-[380px] object-contain transform scale-110"
                  />
                </div>
                <div className="custom-dots absolute bottom-8 left-10 md:left-20 flex gap-2 z-20"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BannerSlider;
