import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendAParcel = () => {
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  console.log(regions);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const reciverRegion = useWatch({ control, name: "reciverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);
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
                className="input w-full"
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
                className="input w-full"
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
                  className="input w-full"
                  placeholder="Sender Name"
                />
                <label className="label text-black font-medium">
                  Sender Address
                </label>
                <input
                  type="text"
                  {...register("senderAddress")}
                  className="input w-full"
                  placeholder="Sender Name"
                />
                <label className="label text-black font-medium">
                  Sender Phone No
                </label>
                <input
                  type="text"
                  {...register("senderPhoneNo")}
                  className="input w-full"
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
                    {...register("senderDistricts")}
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
                  Pickup Instruction
                </label>
                <textarea
                  type="text"
                  {...register("pickupInstruction")}
                  className="input w-full py-3 h-20"
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
                    className="input w-full"
                    placeholder="Reciver Name"
                  />
                  <label className="label text-black font-medium">
                    Reciver Address
                  </label>
                  <input
                    type="text"
                    {...register("reciverAddress")}
                    className="input w-full"
                    placeholder="Reciver Name"
                  />
                  <label className="label text-black font-medium">
                    Reciver Phone No
                  </label>
                  <input
                    type="text"
                    {...register("reciverPhoneNo")}
                    className="input w-full"
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
                      {regions.map((r, i) => (
                        <option key={i} value={r}>
                          {r}{" "}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                  <label className="label text-black font-medium">
                    Reciver District
                  </label>
                  <input
                    type="text"
                    {...register("reciverDistrict")}
                    className="input w-full"
                    placeholder="Select Reciver District"
                  />
                  <label className="label text-black font-medium">
                    Pickup Instruction
                  </label>
                  <textarea
                    type="text"
                    {...register("reciveInstruction")}
                    className="input w-full py-3 h-20"
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
