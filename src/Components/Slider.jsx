import React, { useRef, useState } from "react";
import { motion } from "motion/react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
const Slider = () => {
  return (
    <div className="text-black">
      <div className="col-span-4">
        <Swiper
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
          className="mySwiper">
          <SwiperSlide>
            <div className="h-[300px] lg:h-[500px] w-full bg-[url(https://i.ibb.co/b5RYfTnp/Black-and-White-Vintage-Illustration-Men-s-Fashion-Banner.png)] bg-cover bg-center flex flex-col justify-center items-start px-5 lg:px-20">
              <div className="text-left space-y-3">
                <h1 className="lg:lg:text-4xl">
                  Get Upto 30% discount On your
                  <br /> first Purchases
                </h1>
                <p>Upto 100 Purchase</p>
                <button className="btn bg-black rounded-full border-0 hover:bg-gray-900 text-white">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-[300px] lg:h-[500px] w-full bg-[url(https://i.ibb.co/hRvZwrfF/Black-And-White-Modern-Fashion-Sale-Banner-Landscape.png)] bg-cover bg-center flex flex-col justify-center items-start px-5 lg:px-20">
              <div className="text-left space-y-3">
                <h1 className="lg:text-4xl">
                  Get Upto 30% discount On your
                  <br /> first Purchases
                </h1>
                <p>Upto 100 Purchase</p>
                <button className="btn bg-black rounded-full border-0 hover:bg-gray-900 text-white">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-[300px] lg:h-[500px] w-full bg-[url(https://i.ibb.co/pvr2Wzcy/Beige-Minimalist-Mother-s-Day-Sale-Promotional-Banner.png)] bg-cover bg-center flex flex-col justify-center items-start px-5 lg:px-20">
              <div className="text-left space-y-3">
                <h1 className="lg:text-4xl">
                  Get Upto 30% discount On your
                  <br /> first Purchases
                </h1>
                <p>Upto 100 Purchase</p>
                <button className="btn bg-black rounded-full border-0 hover:bg-gray-900 text-white">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
