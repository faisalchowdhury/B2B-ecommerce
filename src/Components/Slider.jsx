import React, { useRef, useState } from "react";
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
    <div>
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
          <img
            src="https://i.ibb.co/RGMFBpwG/hello-reallygreatsite-com.png"
            alt=""
          />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://i.ibb.co/mVPhyH6K/www-com.png" alt="" />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://i.ibb.co/ccPC7h27/For-more-exclusive-deals-and-discounts-visit-www-dealcraft-com.png"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
