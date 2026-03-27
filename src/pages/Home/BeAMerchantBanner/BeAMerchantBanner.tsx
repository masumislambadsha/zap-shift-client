import locationMerchant from "../../../assets/location-merchant.png";
import beamerchantbg from "../../../assets/be-a-merchant-bg.png";

const BeAMerchantBanner = () => (
  <div
    className="w-full flex justify-center items-center py-8 px-4 sm:px-6 lg:px-8 relative"
    style={{
      backgroundColor: "var(--color-secondary)",
      borderRadius: "20px",
      minHeight: "210px",
    }}
  >
    <img
      src={beamerchantbg}
      alt="Banner background"
      className="absolute left-0 top-0 w-full object-cover h-20 sm:h-[90px] rounded-t-[20px] pointer-events-none"
      style={{ zIndex: 1 }}
      draggable="false"
    />

    <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-10">
      {/* Text */}
      <div className="max-w-xl text-center md:text-left">
        <h2 className="text-white font-bold text-2xl sm:text-3xl leading-snug mb-3">
          Merchant and Customer Satisfaction <br className="hidden sm:block" />
          is Our First Priority
        </h2>
        <p className="text-[#CFE3D3] text-sm sm:text-base mb-6">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. ZapShift Courier delivers your parcels to
          every corner of Bangladesh right on time.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
          <button className="bg-primary rounded-full px-6 py-2.5 text-gray-900 font-semibold hover:bg-lime-300 transition">
            Become a Merchant
          </button>
          <button className="border border-primary/70 rounded-full px-6 py-2.5 text-white font-semibold hover:bg-[#395154] transition">
            Earn with ZapShift Courier
          </button>
        </div>
      </div>

      {/* Illustration */}
      <div className="shrink-0">
        <img
          src={locationMerchant}
          alt="Parcel with Location"
          className="w-40 sm:w-56 md:w-64 object-contain"
          draggable="false"
        />
      </div>
    </div>
  </div>
);

export default BeAMerchantBanner;
