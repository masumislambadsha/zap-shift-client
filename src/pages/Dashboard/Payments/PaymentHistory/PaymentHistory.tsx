import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-300 rounded-md shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Payment History: {payments.length}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="table-style">#</th>
              <th className="table-style"></th>
              <th className="table-style">Amount</th>
              <th className="table-style">Transaction ID</th>
              <th className="table-style">Tracking ID</th>
              <th className="table-style">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={payment.transactionId + index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="table-style">{index + 1}</td>
                <td className="table-style">{payment.parcelName}</td>
                <td className="table-style">${payment.amount}</td>
                <td className="table-style">{payment.transactionId}</td>
                <td className="table-style">{payment.trackingId}</td>
                <td className="table-style">
                  {payment.paidAt
                    ? new Date(payment.paidAt).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
