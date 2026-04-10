"use client";
import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
const Review = () => {
  const testimonials = [
    {
      text: "My first order arrived today in perfect condition.  From the time I sent a question about the item to making the purchase, to the shipping and now the delivery, your company, Tecs, has stayed in touch.  Such great service.  I look forward to shopping on your site in the future and would highly recommend it.",
      author: "Tama Brown",
    },
    {
      text: "My first order arrived today in perfect condition.  From the time I sent a question about the item to making the purchase, to the shipping and now the delivery, your company, Tecs, has stayed in touch.  Such great service.  I look forward to shopping on your site in the future and would highly recommend it.",
      author: "John Doe",
    },
    {
      text: "My first order arrived today in perfect condition.  From the time I sent a question about the item to making the purchase, to the shipping and now the delivery, your company, Tecs, has stayed in touch.  Such great service.  I look forward to shopping on your site in the future and would highly recommend it.",
      author: "Sarah Wilson",
    },
  ];

  return (
    <div className="container-xl mx-auto px-4 py-16">
      <div className="bg-[#F5F7FF] p-8 md:p-16 relative rounded-sm">
        <div className="absolute top-10 left-10 text-4xl md:text-6xl text-black font-serif opacity-20">
          <span className="block font-normal text-[96px] text-black">“</span>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          className="relative"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col gap-10 items-start">
                <div className="hidden md:block w-12"></div>

                <div className="flex-1">
                  <p className="text-normal text-lg text-black">{item.text}</p>

                  <div className="text-right mt-4">
                    <span className="text-black font-medium">
                      - {item.author}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-12 gap-6 w-full">
            <button className="border-2 border-[#0156FF] text-[#0156FF] px-8 py-2 rounded-full font-semibold hover:bg-[#0156FF] hover:text-white transition-all duration-300 z-10">
              Leave Us A Review
            </button>
            <div className="custom-pagination static! w-auto! flex gap-2"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default memo(Review);
