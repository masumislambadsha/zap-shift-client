import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { FaEye, FaMagnifyingGlass } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete It!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Parcel Request Has Been Deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-300 rounded-md shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">
        My All Parcels: {parcels.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="table-style">#</th>
              <th className="table-style">Name</th>
              <th className="table-style">Cost</th>
              <th className="table-style">Payment Status</th>
              <th className="table-style">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, ind) => (
              <tr
                key={parcel._id}
                className={ind % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="table-style">{ind + 1}</td>
                <td className="table-style">{parcel.parcelName}</td>
                <td className="table-style">{parcel.cost}</td>
                <td className="table-style">Blue</td>
                <td className="table-style space-x-2">
                  <button className="btn btn-square hover:bg-primary">
                    <FiEdit />
                  </button>
                  <button className="btn btn-square hover:bg-primary">
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-square hover:bg-primary"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
