import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/Spinner/LoadingSpinner";

const Payments = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handlePayment = async() =>{
      const paymentInfo ={
        cost: parcel.cost,
        parcelId : parcel._id,
        senderEmail: parcel.senderEmail,
        parcelName: parcel.parcelName
      }

      const res = await axiosSecure.post("/create-checkout-session", paymentInfo)
      console.log(res.data);
      window.location.href = res.data.url

  }

  return (
    <div>
      <h3 className="text-2xl">
        Please Pay ${parcel.cost} To Deliver{parcel.parcelName}
        </h3>

      <button onClick={handlePayment} className="text-black btn btn-primary btn-sm font-semibold">
        Pay{" "}
      </button>
    </div>
  );
};

export default Payments;
