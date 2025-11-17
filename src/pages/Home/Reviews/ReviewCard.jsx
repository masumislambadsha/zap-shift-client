import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, review: testimonial , user_photoURL} = review;
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <FaQuoteLeft className="text-primary text-2xl mb-2" />
        <p className="text-gray-700 text-base mb-6">{testimonial}
        </p>
        <hr className="mb-4 border-t border-gray-200" />
        <div className="flex items-center">
          <div/>
          <img src={user_photoURL} alt=""  className="w-10 h-10 bg-primary rounded-full shrink-0 mr-3" />
          <div>
            <div className="text-gray-900 font-semibold text-base">
             {userName}
            </div>
            <div className="text-gray-500 text-sm">Senior Product Designer</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
