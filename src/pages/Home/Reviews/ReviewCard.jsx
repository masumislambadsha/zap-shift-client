import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, review: testimonial, user_photoURL } = review;

  return (
    <div className="bg-white rounded-xl shadow-xl p-5 sm:p-7 md:p-8 w-full max-w-[280px] mx-auto flex flex-col h-full">
      <FaQuoteLeft className="text-[#70B2B2] text-2xl sm:text-3xl mb-4" />
      <p className="text-[#264A43] text-sm sm:text-base md:text-lg mb-6 font-medium leading-relaxed grow">
        {testimonial}
      </p>
      <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
        <img
          src={user_photoURL}
          alt={userName}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3 ring-2 ring-[#70B2B2]/20"
        />
        <div>
          <h3 className="text-[#1C3F3A] font-semibold text-sm sm:text-base">{userName}</h3>
          <p className="text-[#9ECFD4] text-xs sm:text-sm font-medium">Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
