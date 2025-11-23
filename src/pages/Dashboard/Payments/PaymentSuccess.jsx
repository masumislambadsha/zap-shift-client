import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div>
      <h2 className="text-4xl text-center font-semibold">Payment Successful</h2>
      {paymentInfo && (
        <div className="text-center mt-5">
          <p className="font-bold">Transaction ID: {paymentInfo.transactionId}</p>
          <p className="font-bold">Tracking ID: {paymentInfo.trackingId}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
