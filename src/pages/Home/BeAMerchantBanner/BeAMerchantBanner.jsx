import locationMerchant from "../../../assets/location-merchant.png";
import beamerchantbg from "../../../assets/be-a-merchant-bg.png";

const BeAMerchantBanner = () => (
  <div className="w-full flex justify-center items-center py-8 relative" style={{ backgroundColor: "var(--color-secondary)", borderRadius: "20px", minHeight: "210px" }}>
    <img
      src={beamerchantbg}
      alt="Banner background"
      className="absolute left-0 top-0 w-full object-cover h-[90px] rounded-t-[20px] pointer-events-none"
      style={{ zIndex: 1 }}
      draggable="false"
    />
    <div className="flex flex-row items-center justify-between w-[850px] px-8 py-4 relative z-10">
      <div className="max-w-[430px]">
        <h2 className="text-white font-bold text-2xl leading-tight mb-2">
          Merchant and Customer Satisfaction <br /> is Our First Priority
        </h2>
        <p className="text-[#CFE3D3] text-base mb-8">
          We offer the lowest delivery charge with the highest value along with 100% safety of your product. Partner courier delivers your parcels in every corner of Bangladesh right on time.
        </p>
        <div className="flex gap-3">
          <button className="bg-primary rounded-full px-5 py-2 text-gray-900 font-semibold hover:bg-lime-300 transition">
            Become a Merchant
          </button>
          <button className="border border-primary/70 rounded-full px-5 py-2 text-white font-semibold   hover:bg-[#395154] transition">
            Earn with ZapShift Courier
          </button>
        </div>
      </div>
      <div className="pl-4 shrink-0">
        <img
          src={locationMerchant}
          alt="Parcel with Location"
          className="w-[260px] object-contain"
          draggable="false"
        />
      </div>
    </div>
  </div>
);

export default BeAMerchantBanner;
