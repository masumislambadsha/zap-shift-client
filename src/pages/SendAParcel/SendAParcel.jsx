import React from "react";
import { useForm } from "react-hook-form";

const SendAParcel = () => {
  const {} = useForm()
  return (
    <div>
      <h2 className="text-5xl font-bold">Send A Parcel</h2>
      <form>
        {/* document */}
        <div></div>
        {/* parcel info */}
        <div></div>
        {/* two column */}
        <div>
          {/* sender */}
          <div></div>
          {/* reciver */}
          <div></div>
        </div>
      </form>
    </div>
  );
};

export default SendAParcel;
