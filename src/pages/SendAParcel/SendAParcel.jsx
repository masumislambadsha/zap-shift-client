import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const SendAParcel = () => {
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const { register, control, handleSubmit, formState: { errors } } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const reciverRegion = useWatch({ control, name: "reciverRegion" });

  const districtsByRegion = (region) => {
    if (!region) return [];
    return serviceCenters
      .filter((c) => c.region === region)
      .map((d) => d.district);
  };

  const calculateCost = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.reciverDistrict;
    const weight = parseFloat(data.parcelWeight) || 0;

    if (isDocument) {
      return isSameDistrict ? 60 : 80;
    } else {
      if (weight < 3) {
        return isSameDistrict ? 110 : 150;
      } else {
        const base = isSameDistrict ? 110 : 150;
        const extraKg = weight - 3;
        const extraCharge = isSameDistrict ? extraKg * 40 : extraKg * 40 + 40;
        return base + extraCharge;
      }
    }
  };

  const onSubmit = (data) => {
    const cost = calculateCost(data);

    Swal.fire({
      title: `Total Cost: ${cost} BDT`,
      html: `
        <div class="text-left text-sm space-y-1">
          <p><strong>Type:</strong> ${data.parcelType === "document" ? "Document" : "Non-Document"}</p>
          <p><strong>Weight:</strong> ${data.parcelWeight} kg</p>
          <p><strong>From:</strong> ${data.senderDistrict}, ${data.senderRegion}</p>
          <p><strong>To:</strong> ${data.reciverDistrict}, ${data.reciverRegion}</p>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, Send Parcel!",
      cancelButtonText: "Review Details",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = { ...data, cost, status: "pending", bookingDate: new Date() };

        axiosSecure.post("/parcels", parcelData)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Parcel Booked Successfully!",
                text: "Your parcel is now in dispatch queue.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
              });
              navigate("/dashboard/my-parcels");
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to book parcel. Try again.", "error");
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Send a Parcel
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Fill in the details below to book your parcel delivery
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8">
            <h2 className="text-2xl font-bold">Parcel Booking Form</h2>
            <p className="mt-2 opacity-90">Fast • Secure • Nationwide Delivery</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-10">
            {/* Parcel Type */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-5">Parcel Type</h3>
              <div className="flex flex-wrap gap-8">
                {["document", "non-document"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-4 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      value={type}
                      defaultChecked={type === "document"}
                      {...register("parcelType")}
                      className="radio radio-primary radio-lg"
                    />
                    <span className="text-lg font-medium capitalize group-hover:text-black text-secondary transition">
                      {type.replace("-", " ")}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Basic Parcel Info */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Parcel Name
                </label>
                <input
                  {...register("parcelName", { required: "Parcel name is required" })}
                  type="text"
                  placeholder="e.g., Gift Box, Laptop, Documents"
                  className="input input-bordered w-full h-12 rounded-xl"
                />
                {errors.parcelName && <p className="text-red-500 text-sm mt-1">{errors.parcelName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Parcel Weight (kg)
                </label>
                <input
                  {...register("parcelWeight", {
                    required: "Weight is required",
                    pattern: { value: /^\d*\.?\d+$/, message: "Enter a valid number" }
                  })}
                  type="text"
                  placeholder="e.g., 2.5"
                  className="input input-bordered w-full h-12 rounded-xl"
                />
                {errors.parcelWeight && <p className="text-red-500 text-sm mt-1">{errors.parcelWeight.message}</p>}
              </div>
            </div>

            {/* Sender & Receiver - Side by Side */}
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Sender */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-3">
                  Sender
                </h3>
                <div className="space-y-5">
                  <input {...register("senderName")} value={user?.displayName || ""} readOnly className="input input-bordered w-full bg-white/70" />
                  <input {...register("senderEmail")} value={user?.email || ""} readOnly className="input input-bordered w-full bg-white/70" />
                  <input {...register("senderPhoneNo", { required: true })} placeholder="Sender Phone" className="input input-bordered w-full" required />

                  <select {...register("senderRegion", { required: true })} className="select select-bordered w-full rounded-xl">
                    <option value="">Select Sender Region</option>
                    {regions.map((r) => (<option key={r} value={r}>{r}</option>))}
                  </select>

                  <select {...register("senderDistrict", { required: true })} className="select select-bordered w-full rounded-xl" disabled={!senderRegion}>
                    <option>{senderRegion ? "Select District" : "First select region"}</option>
                    {districtsByRegion(senderRegion).map((d) => (<option key={d} value={d}>{d}</option>))}
                  </select>

                  <textarea
                    {...register("pickupInstruction")}
                    placeholder="Pickup Address & Instructions (e.g., House #12, Road 5, Mirpur)"
                    className="textarea textarea-bordered w-full h-28 rounded-xl"
                  />
                </div>
              </div>

              {/* Receiver */}
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
                <h3 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-3">
                  Receiver
                </h3>
                <div className="space-y-5">
                  <input {...register("reciverName", { required: true })} placeholder="Receiver Name" className="input input-bordered w-full" required />
                  <input {...register("reciverEmail")} type="email" placeholder="Receiver Email (optional)" className="input input-bordered w-full" />
                  <input {...register("reciverPhoneNo", { required: true })} placeholder="Receiver Phone" className="input input-bordered w-full" required />

                  <select {...register("reciverRegion", { required: true })} className="select select-bordered w-full rounded-xl">
                    <option value="">Select Receiver Region</option>
                    {regions.map((r) => (<option key={r} value={r}>{r}</option>))}
                  </select>

                  <select {...register("reciverDistrict", { required: true })} className="select select-bordered w-full rounded-xl" disabled={!reciverRegion}>
                    <option>{reciverRegion ? "Select District" : "First select region"}</option>
                    {districtsByRegion(reciverRegion).map((d) => (<option key={d} value={d}>{d}</option>))}
                  </select>

                  <textarea
                    {...register("reciveInstruction")}
                    placeholder="Delivery Address & Instructions"
                    className="textarea textarea-bordered w-full h-28 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                className="btn btn-primary btn-wide text-lg font-bold text-secondary shadow-lg hover:shadow-xl transition-all duration-300 px-3 py-9"
              >
                Send Parcel
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 text-center border border-purple-200">
          <p className="text-lg font-medium text-purple-900">
            Estimated delivery: 1–3 business days • Cash on Delivery Available
          </p>
        </div>
      </div>
    </div>
  );
};

export default SendAParcel;
