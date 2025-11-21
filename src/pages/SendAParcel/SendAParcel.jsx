import React from "react";
import { useForm } from "react-hook-form";

const SendAParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSendParcel = (data) => {
    console.log(data);
  };
  return (
    <div className="p-5">
      <h2 className="text-5xl font-bold">Send A Parcel</h2>
      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* document */}
        <div className="mt-5 px-8 space-x-5">
          <label class="label text-black font-medium">
            <input
              {...register("parcelType")}
              type="radio"
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label class="label text-black font-medium">
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
              <label class="label text-black font-medium">Parcel Name</label>
              <input
                type="text"
                {...register("parcelName")}
                class="input w-full"
                placeholder="Parcel Name"
              />
            </div>
            <div>
              <label class="label text-black font-medium">
                Parcel Weight (kg)
              </label>
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
          <fieldset class="fieldset grid md:grid-cols-2 grid-cols-1 gap-12 items-center justify-center mt-10">
            {/* sender */}

            <div className="space-y5">
              <h4 className="text-2xl font-semibold">Sender Details</h4>
              <div className="ml-5 my-3 space-y-2.5">
                <label class="label text-black font-medium">Sender Name</label>
                <input
                  type="text"
                  {...register("senderlName")}
                  class="input w-full"
                  placeholder="Sender Name"
                />
                <label class="label text-black font-medium">
                  Sender Address
                </label>
                <input
                  type="text"
                  {...register("senderlName")}
                  class="input w-full"
                  placeholder="Sender Name"
                />
                <label class="label text-black font-medium">
                  Sender Phone No
                </label>
                <input
                  type="text"
                  {...register("senderPhoneNo")}
                  class="input w-full"
                  placeholder="Sender Phone No"
                />
                <label class="label text-black font-medium">
                  Sender District
                </label>
                <input
                  type="text"
                  {...register("senderDistrict")}
                  class="input w-full"
                  placeholder="Select your District"
                />
                <label class="label text-black font-medium">
                  Pickup Instruction
                </label>
                <textarea
                  type="text"
                  {...register("pickupInstruction")}
                  class="input w-full py-3 h-20"
                  placeholder="Pickup Instruction"
                />
              </div>
            </div>
            {/* reciver */}

            <div>
              <h4 className="text-2xl font-semibold">Reciver Details</h4>
              <div className="space-y5">
                <div className="ml-5 my-3 space-y-2.5">
                  <label class="label text-black font-medium">
                    Reciver Name
                  </label>
                  <input
                    type="text"
                    {...register("senderlName")}
                    class="input w-full"
                    placeholder="Reciver Name"
                  />
                  <label class="label text-black font-medium">
                    Reciver Address
                  </label>
                  <input
                    type="text"
                    {...register("senderlName")}
                    class="input w-full"
                    placeholder="Reciver Name"
                  />
                  <label class="label text-black font-medium">
                    Reciver Phone No
                  </label>
                  <input
                    type="text"
                    {...register("senderPhoneNo")}
                    class="input w-full"
                    placeholder="Reciver Phone No"
                  />
                  <label class="label text-black font-medium">
                    Reciver District
                  </label>
                  <input
                    type="text"
                    {...register("senderDistrict")}
                    class="input w-full"
                    placeholder="Select Reciver District"
                  />
                  <label class="label text-black font-medium">
                    Pickup Instruction
                  </label>
                  <textarea
                    type="text"
                    {...register("pickupInstruction")}
                    class="input w-full py-3 h-20"
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
