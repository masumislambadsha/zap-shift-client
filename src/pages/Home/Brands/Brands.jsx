import React from "react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonstart from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import startPeople from "../../../assets/brands/start_people.png";

const brands = [amazon, casio, moonstart, randstad, star, startPeople];

const Brands = () => {
  return (
    <div className="mt-12">
      <Swiper
        loop={true}
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={1}
        grabCursor={true}
        autoplay={{
          delay: 900,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {brands.map((logo, ind) => (
          <SwiperSlide key={ind}>
            <img src={logo} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
