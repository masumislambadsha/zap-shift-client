import React from "react";
import { useForm } from "react-hook-form";

const SendAParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSendParcel = (data) => {
    data.preventDefault();
    console.log(data);
  };
  return (
    <div>
      <h2 className="text-5xl font-bold">Send A Parcel</h2>
      <form onClick={handleSendParcel}>
        {/* document */}
        <div className="mt-5 px-8 space-x-5">
          <label class="label">
            <input
              {...register("parcelType")}
              type="radio"
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label class="label">
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
          <fieldset class="fieldset grid md:grid-cols-2 grid-cols-1 gap-12 items-center justify-center ">
            <div>
              <label class="label">Parcel Name</label>
              <input
                type="text"
                {...register("parcelName")}
                class="input w-full"
                placeholder="Parcel Name"
              />
            </div>
            <div>
              <label class="label">Parcel Weight (kg)</label>
              <input
                type="text"
                {...register("parcelWeight")}
                class="input w-full"
                placeholder="Parcel Weight"
              />
            </div>
          </fieldset>
        </div>
        {/* two column */}
        <div>
          {/* sender */}
          <div></div>
          {/* reciver */}
          <div></div>
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
