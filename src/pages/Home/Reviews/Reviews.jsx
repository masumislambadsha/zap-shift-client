import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);

  return (
    <div>
      <h3 className="text-4xl text-[#131313] text-center my-10 font-bold ">
        Reviews
      </h3>
      <p className="text-center mb-6 font-medium">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error
        voluptatem provident quos! Totam nam illo pariatur nemo reprehenderit!
        Facilis, nulla molestias. Sint nesciunt necessitatibus nisi! Quaerat
        repellendus repudiandae velit fugiat iusto! Voluptatum quae eligendi,
        animi debitis corrupti ipsam explicabo dolore cumque nihil voluptatibus
        iusto iure, a facere ratione eius odio?
      </p>
      <Swiper
        effect={"coverflow"}
        loop={true}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          modifier: 1,
          scale: 0.9,
          slideShadows: true,
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
