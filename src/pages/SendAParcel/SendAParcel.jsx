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

  const { register, control, handleSubmit } = useForm();
  const { user } = useAuth();

  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const reciverRegion = useWatch({ control, name: "reciverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);

    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.reciverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log({ cost });
    data.cost = cost;

    Swal.fire({
      title: `The COST will be ${cost} BDT`,
      text: "Are you sure to deliver the parcel",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Send Parcel!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving parcel", res.data);
        });
        navigate("/dashboard/my-parcels");
        Swal.fire({
          title: "Parcel Sent To Dispatch",
          text: "Parcel Will Be Delivered After Payment",
          icon: "success",
          timer:1500
        });
      }
    });
  };
  return (
    <div className="p-5">
      <h2 className="text-5xl font-bold">Send A Parcel</h2>
      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* document */}
        <div className="mt-5 px-8 space-x-5">
          <label className="label text-black font-medium">
            <input
              {...register("parcelType")}
              type="radio"
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label text-black font-medium">
            <input
              {...register("parcelType")}
              type="radio"
              value="non-document"
              className="radio"
            />
            Non Document
          </label>
        </div>
        {/* parcel info */}
        <div>
          <fieldset className="fieldset grid md:grid-cols-2 grid-cols-1 gap-12 items-center justify-center ">
            <div>
              <label className="label text-black font-medium">
                Parcel Name
              </label>
              <input
                type="text"
                {...register("parcelName")}
                className="input w-full outline-0 border-2 rounded-lg"
                placeholder="Parcel Name"
              />
            </div>
            <div>
              <label className="label text-black font-medium">
                Parcel Weight (kg)
              </label>
              <input
                type="text"
                {...register("parcelWeight")}
                className="input w-full outline-0 border-2 rounded-lg"
                placeholder="Parcel Weight"
              />
            </div>
          </fieldset>
        </div>
        {/* two column */}
        <div>
          <fieldset className="fieldset grid md:grid-cols-2 grid-cols-1 gap-12 items-center justify-center mt-10">
            {/* sender */}

            <div className="space-y5">
              <h4 className="text-2xl font-semibold">Sender Details</h4>
              <div className="ml-5 my-3 space-y-2.5">
                <label className="label text-black font-medium">
                  Sender Name
                </label>
                <input
                  type="text"
                  {...register("senderName")}
                  className="input w-full outline-0 border-2 rounded-lg"
                  defaultValue={user?.displayName}
                  readOnly
                  placeholder="Sender Name"
                />
                <label className="label text-black font-medium">
                  Sender Email
                </label>
                <input
                  type="text"
                  {...register("senderEmail")}
                  className="input w-full outline-0 border-2 rounded-lg"
                  placeholder="Sender Email"
                  defaultValue={user?.email}

                />
                <label className="label text-black font-medium">
                  Sender Phone No
                </label>
                <input
                  type="text"
                  {...register("senderPhoneNo")}
                  className="input w-full outline-0 border-2 rounded-lg"
                  placeholder="Sender Phone No"
                />

                {/* sender region */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Sender Region</legend>
                  <select
                    {...register("senderRegion")}
                    defaultValue="Pick a region"
                    className="select w-full"
                  >
                    <option disabled={true}>Pick a Region</option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}{" "}
                      </option>
                    ))}
                  </select>
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Sender District</legend>
                  <select
                    {...register("senderDistrict")}
                    defaultValue="Pick a District"
                    className="select w-full"
                  >
                    <option disabled={true}>Pick a District</option>
                    {districtsByRegion(senderRegion).map((r, i) => (
                      <option key={i} value={r}>
                        {r}{" "}
                      </option>
                    ))}
                  </select>
                </fieldset>
                <label className="label text-black font-medium">
                  Sender Address
                </label>
                <textarea
                  type="text"
                  {...register("pickupInstruction")}
                  className="input w-full outline-0 border-2 rounded-lg py-3 h-20"
                  placeholder="Pickup Instruction"
                />
              </div>
            </div>
            {/* reciver */}

            <div>
              <h4 className="text-2xl font-semibold">Reciver Details</h4>
              <div className="space-y5">
                <div className="ml-5 my-3 space-y-2.5">
                  <label className="label text-black font-medium">
                    Reciver Name
                  </label>
                  <input
                    type="text"
                    {...register("reciverName")}
                    className="input w-full outline-0 border-2 rounded-lg"
                    placeholder="Reciver Name"
                  />
                  <label className="label text-black font-medium">
                    Reciver Email
                  </label>
                  <input
                    type="text"
                    {...register("reciverEmail")}
                    className="input w-full outline-0 border-2 rounded-lg"
                    placeholder="Reciver Email"
                  />
                  <label className="label text-black font-medium">
                    Reciver Phone No
                  </label>
                  <input
                    type="text"
                    {...register("reciverPhoneNo")}
                    className="input w-full outline-0 border-2 rounded-lg"
                    placeholder="Reciver Phone No"
                  />
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Reciver Region</legend>
                    <select
                      {...register("reciverRegion")}
                      defaultValue="Pick a region"
                      className="select w-full"
                    >
                      <option disabled={true}>Pick a Region</option>
                      {regions.map((r, i) => (
                        <option key={i} value={r}>
                          {r}{" "}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                      Reciver District
                    </legend>
                    <select
                      {...register("reciverDistrict")}
                      defaultValue="Pick a District "
                      className="select w-full"
                    >
                      <option disabled={true}>Pick a District</option>
                      {districtsByRegion(reciverRegion).map((r, i) => (
                        <option key={i} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                  <label className="label text-black font-medium">
                    Reciver Instruction
                  </label>
                  <textarea
                    type="text"
                    {...register("reciveInstruction")}
                    className="input w-full outline-0 border-2 rounded-lg py-3 h-20"
                    placeholder="Pickup Instruction"
                  />
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <input
          type="submit"
          className="btn btn-primary text-black"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default SendAParcel;
