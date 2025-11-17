import { FaBoxOpen, FaPhoneAlt, FaShippingFast } from "react-icons/fa";
import liveParcel from "../../../assets/live-tracking.png"
import safeDelivery from "../../../assets/safe-delivery.png"



const features = [
  {
    icon: <img src={liveParcel} className="text-teal-600 text-5xl" />,
    title: "Live Parcel Tracking",
    desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    icon: <img src={safeDelivery} className="text-teal-600 text-5xl" />,
    title: "100% Safe Delivery",
    desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    icon: <img src={safeDelivery} className="text-teal-600 text-5xl" />,
    title: "24/7 Call Center Support",
    desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

const InfoMediaCard = () => (
  <div className="bg-gray-100 rounded-lg  p-6 max-w-4xl mx-auto">
    {features.map((item, i) => (
      <div
        key={item.title}
        className={`flex flex-col md:flex-row md:gap-0 gap-5 items-center bg-white rounded-xl p-6 mb-6 ${
          i === 1 ? "bg-blue-50" : ""
        }`}
      >
        <div className="w-32 shrink-0 flex items-center justify-center">
          {item.icon}
        </div>
        <div className="pl-6">
          <h3 className="font-bold text-lg text-gray-800 mb-2">
            {item.title}
          </h3>
          <p className="text-gray-600 text-base">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

export default InfoMediaCard;

