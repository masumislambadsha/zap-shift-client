import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaArrowUpRightDots } from "react-icons/fa6";

const faqData = [
  {
    question: "How does this posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
  },
  {
    question: "Is it suitable for all ages and body types?",
    answer: "Yes, posture correctors are designed to accommodate a wide range of users, regardless of age or body type.",
  },
  {
    question: "Does it really help with back pain and posture improvement?",
    answer: "Posture correctors provide gentle support which can help improve posture and may reduce back pain when used consistently.",
  },
  {
    question: "Does it have smart features like vibration alerts?",
    answer: "Some posture correctors come equipped with smart features such as vibration alerts to remind you to sit up straight.",
  },
  {
    question: "How will I be notified when the product is back in stock?",
    answer: "You can sign up for email notifications to be alerted when the product is restocked.",
  },
];

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-gray-50 p-8 rounded-lg max-w-2xl w-full mx-auto my-20">
      <h2 className="text-3xl font-bold text-center mb-2">
        Frequently Asked Question (FAQ)
      </h2>
      <p className="text-center mb-6 text-gray-600">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
      </p>

      {faqData.map((item, idx) => (
        <div
          key={item.question}
          className={`mb-3 rounded-lg border ${
            openIndex === idx
              ? "bg-teal-50 border-teal-300"
              : "bg-white border-gray-200"
          }`}
        >
          <button
            className="w-full flex justify-between items-center p-4 font-semibold text-lg focus:outline-none"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            <span
              className={openIndex === idx ? "text-teal-700" : "text-gray-900"}
            >
              {item.question}
            </span>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                openIndex === idx ? "rotate-180 text-teal-600" : "text-gray-500"
              }`}
            />
          </button>
          {openIndex === idx && (
            <div className="px-4 pb-4 text-gray-700 text-base">
              {item.answer}
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-center items-center mt-6">
        <button className="bg-lime-200 text-gray-900 font-semibold py-2 px-6 rounded-full flex items-center hover:bg-lime-300 transition">
          See More FAQ's
          <FaArrowUpRightDots className="ml-2 text-black" />
        </button>
      </div>
    </div>
  );
};

export default Accordion;
