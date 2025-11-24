import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import DeliveryRiderSVG from "../../../assets/DeliveryRiderSVG";
// Example image - consider placing your own asset here.

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl flex w-[680px]">
        {/* Left Section: Payment Details */}
        <div className="flex-1 py-12 px-10 flex flex-col justify-center">
          <h2 className="text-4xl font-semibold mb-2 text-green-700 text-center">
            Payment Successful
          </h2>
          <p className="text-gray-500 text-center mb-7">
            Thank you for your payment. Your order is being processed.
          </p>
          {paymentInfo && (
            <div className="mt-5 text-center">
              <p className="font-bold text-lg mb-2">
                Transaction ID:{" "}
                <span className="text-green-600">{paymentInfo.transactionId}</span>
              </p>
              <p className="font-bold text-lg">
                Tracking ID:{" "}
                <span className="text-blue-600">{paymentInfo.trackingId}</span>
              </p>
            </div>
          )}
        </div>
        {/* Right Section: Image */}
        <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-r-xl">
          {/* You can replace with your own SVG or PNG */}
         <DeliveryRiderSVG/>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
