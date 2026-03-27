import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

interface ServiceCenter {
  region: string;
  district: string;
}

interface RiderFormData {
  region: string;
  district: string;
  // add other fields as needed
}

const BeARider = () => {
  const { register, control, handleSubmit } = useForm<RiderFormData>();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Load serviceCenters from loader (fetch or SSR)
  const serviceCenters = useLoaderData() as ServiceCenter[];

  // Regions from service centers data
  const regions = React.useMemo(() => {
    return [
      ...new Set(serviceCenters.map((center: ServiceCenter) => center.region)),
    ];
  }, [serviceCenters]);

  // Watch selected region to update districts
  const selectedRegion = useWatch({ control, name: "region" }) || "";
  const districts = React.useMemo(() => {
    if (!selectedRegion) return [];
    return serviceCenters
      .filter((center: ServiceCenter) => center.region === selectedRegion)
      .map((center: ServiceCenter) => center.district);
  }, [serviceCenters, selectedRegion]);

  const handleRiderApplication = (data: RiderFormData) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Application Submitted Successfully",
          text: "You Will Be Contacted Soon!!!",
          icon: "success",
          timer: 2500,
        });
      }
    });
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-around bg-gray-50">
        <form
          onSubmit={handleSubmit(handleRiderApplication)}
          className="bg-white rounded-2xl shadow-md w-full max-w-xl px-8 py-10"
        >
          <h1 className="text-5xl font-bold text-[#03373D] ">Be A Rider</h1>
          <p className="font-normal text-sm py-5 text-[#606060] ">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
          <h2 className="text-2xl font-bold text-[#133742] mb-2 mt-1">
            Tell us about yourself
          </h2>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#133742]">
              Your Name
            </label>
            <input
              type="text"
              {...register("name")}
              defaultValue={user?.displayName || ""}
              placeholder="Your Name"
              className="input-custom"
              readOnly
              disabled
            />

            <label className="text-sm font-medium text-[#133742]">
              Driving License Number
            </label>
            <input
              type="text"
              {...register("license")}
              placeholder="Driving License Number"
              className="input-custom"
            />

            <label className="text-sm font-medium text-[#133742]">
              Your Email
            </label>
            <input
              type="email"
              {...register("email")}
              defaultValue={user?.email || ""}
              placeholder="Your Email"
              readOnly
              className="input-custom"
              disabled
            />
            <label className="text-sm font-medium text-[#133742]">
              Your Image URL
            </label>
            <input
              type="photoURL"
              {...register("photoURL")}
              defaultValue={user?.photoURL}
              placeholder="Your Photo URL"
              className="input-custom"
            />

            <label className="text-sm font-medium text-[#133742]">
              Your Region
            </label>
            <select
              {...register("region")}
              className="input-custom"
              defaultValue=""
            >
              <option value="">Select your Region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>

            <label className="text-sm font-medium text-[#133742]">
              Your District
            </label>
            <select
              {...register("district")}
              className="input-custom"
              defaultValue=""
            >
              <option value="">Select your District</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>

            <label className="text-sm font-medium text-[#133742]">NID No</label>
            <input
              type="text"
              {...register("nid")}
              placeholder="NID"
              className="input-custom"
            />

            <label className="text-sm font-medium text-[#133742]">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phone")}
              placeholder="Phone Number"
              className="input-custom"
            />

            <label className="text-sm font-medium text-[#133742]">
              Bike Brand Model and Year
            </label>
            <input
              type="text"
              {...register("bikeModel")}
              placeholder="Bike Brand Model and Year"
              className="input-custom"
            />

            <label className="text-sm font-medium text-[#133742]">
              Bike Registration Number
            </label>
            <input
              type="text"
              {...register("bikeRegistration")}
              placeholder="Bike Registration Number"
              className="input-custom"
            />

            <label className="text-sm font-medium text-[#133742]">
              Tell Us About Yourself
            </label>
            <input
              type="text"
              {...register("about")}
              placeholder="Tell Us About Yourself"
              className="input-custom"
            />

            <button
              type="submit"
              className="bg-primary text-[#133742] mt-4 rounded-lg px-4 py-2 font-semibold transition-all active:bg-lime-400 hover:bg-[#c8ff00] cursor-pointer"
            >
              Apply As A Rider
            </button>
          </div>
        </form>
        <div>
          <img src={riderImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default BeARider;
