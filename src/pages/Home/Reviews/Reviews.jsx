import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);

  return (
    <div>
      <h3 className="text-3xl text-center">Reviews</h3>
      <p className="text-center">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error
        voluptatem provident quos! Totam nam illo pariatur nemo reprehenderit!
        Facilis, nulla molestias. Sint nesciunt necessitatibus nisi! Quaerat
        repellendus repudiandae velit fugiat iusto! Voluptatum quae eligendi,
        animi debitis corrupti ipsam explicabo dolore cumque nihil voluptatibus
        iusto iure, a facere ratione eius odio?
      </p>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Reviews;
