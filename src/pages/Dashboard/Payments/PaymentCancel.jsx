import React from "react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div>
      <h2 className="text-4xl text-red-500 text-center">
        Payment Cancelled, try again
      </h2>
      <div className="flex justify-center items-center mt-5">
        <Link
          to={"/dashboard/my-parcels"}
          className="btn btn-primary text-black"
        >
          TRY AGAIN
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
