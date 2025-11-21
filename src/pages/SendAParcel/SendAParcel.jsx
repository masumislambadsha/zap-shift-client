import React from "react";
import { useForm } from "react-hook-form";

const SendAParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSendParcel = (data) =>{

  }
  return (
    <div>
      <h3 className="text-5xl font-bold">Send A Parcel</h3>
      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* doceument */}
        <div></div>

        {/* parcel name and info */}
        <div></div>

        {/* two column */}
        <div>
          {/* sender details */}
          <div></div>

          {/* reciver details */}
          <div></div>
        </div>
      </form>
    </div>
  );
};

export default SendAParcel;
