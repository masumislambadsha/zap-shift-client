import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const { data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("riders");
      return res.data;
    },
  });
  return (
    <div>
      <h3 className="text-4xl text-center font-bold">
        Riders Pending Approval {riders.length}
      </h3>
      {riders.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">No riders pending approval.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <th className="table-style">#</th>
                <th className="table-style">Name</th>
                <th className="table-style">Email</th>
                <th className="table-style">Phone</th>
                <th className="table-style">Amount Paid</th>
                <th className="table-style">Action</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider, index) => (
                <tr
                  key={rider._id || index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-blue-50 transition"}
                >
                  <td className="table-style">{index + 1}</td>
                  <td className="table-style font-medium">{rider.name}</td>
                  <td className="table-style">{rider.email}</td>
                  <td className="table-style">{rider.phone}</td>
                  <td className="table-style font-semibold text-green-600">
                    ${rider.payment?.amount || "N/A"}
                  </td>
                  <td className="table-style">
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2">
                      Approve
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApproveRider;
