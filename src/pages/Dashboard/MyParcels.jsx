import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FiEdit, FiEye } from "react-icons/fi";
import { FaTrashAlt, FaTruck, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Prevent query if no user
  });

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete It!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Parcel has been removed.", "success");
          }
        });
      }
    });
  };

  // Payment Handler (Stripe/SSLCommerz redirect)
  const handlePayment = async (parcel) => {
    const paymentInfo = {
      parcelId: parcel._id,
      cost: parcel.cost,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };

    try {
      const res = await axiosSecure.post("/payment-checkout-session", paymentInfo);
      if (res.data.url) {
        window.location.replace(res.data.url); // Full redirect for payment gateway
      }
    } catch (err) {
      Swal.fire("Payment Failed", "Could not initiate payment. Try again.", "error");
    }
  };

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      "on the way": "bg-blue-100 text-blue-800 border-blue-300",
      delivered: "bg-green-100 text-green-800 border-green-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
      returned: "bg-purple-100 text-purple-800 border-purple-300",
    };

    return (
      <span
        className={`px-4 py-2 rounded-full text-sm font-semibold border ${
          styles[status?.toLowerCase()] || styles.pending
        }`}
      >
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Pending"}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            My Parcels
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Total Bookings: <span className="font-bold text-red-600">{parcels.length}</span>
          </p>
        </div>

        {/* Empty State */}
        {parcels.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-20 text-center border border-gray-200">
            <div className="text-8xl mb-6 text-gray-300">Parcel</div>
            <h3 className="text-2xl font-semibold text-gray-700">No parcels booked yet</h3>
            <p className="text-gray-500 mt-3">Start sending your first parcel today!</p>
            <Link
              to="/send-parcel"
              className="mt-8 inline-block btn btn-wide btn-primary text-lg font-bold"
            >
              Send a Parcel
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {parcels.map((parcel, index) => (
              <div
                key={parcel._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Gradient Header */}
                <div className="bg-gradient-to-r from-primary to-primary/80 text-secondary p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-3">
                      <FaTruck /> {parcel.parcelName}
                    </h3>
                    <p className="text-sm opacity-90 mt-1">
                      Booked on: {new Date(parcel.bookingDate || parcel.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-75">Tracking ID</p>
                    <p className="font-mono text-lg font-bold">
                      {parcel._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* From */}
                    <div>
                      <h4 className="font-semibold text-gray-600 flex items-center gap-2">
                        From
                      </h4>
                      <p className="text-lg font-medium">{parcel.senderName}</p>
                      <p className="text-sm text-gray-600">
                        {parcel.senderDistrict}, {parcel.senderRegion}
                      </p>
                    </div>

                    {/* To */}
                    <div>
                      <h4 className="font-semibold text-gray-600 flex items-center gap-2">
                        To
                      </h4>
                      <p className="text-lg font-medium">{parcel.reciverName}</p>
                      <p className="text-sm text-gray-600">
                        {parcel.reciverDistrict}, {parcel.reciverRegion}
                      </p>
                    </div>

                    {/* Price & Info */}
                    <div className="text-right md:text-left">
                      <p className="text-sm text-gray-500">Total Cost</p>
                      <p className="text-3xl font-bold text-secondary">৳{parcel.cost}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        {parcel.parcelWeight} kg • {parcel.parcelType === "document" ? "Document" : "Non-Document"}
                      </p>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap gap-6">
                      {/* Payment Status */}
                      <div>
                        <p className="text-sm text-gray-500 ">Payment</p>
                        {parcel.paymentStatus === "paid" ? (
                          <span className="flex items-center gap-2 text-green-600 font-bold mt-2">
                            <FaCheckCircle /> Paid
                          </span>
                        ) : (
                          <button
                            onClick={() => handlePayment(parcel)}
                            className="mt-1 btn btn-sm bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg border-0"
                          >
                            <FaMoneyBillWave className="mr-1" /> Pay Now
                          </button>
                        )}
                      </div>

                      {/* Delivery Status */}
                      <div>
                        <p className="text-sm text-gray-500">Delivery Status</p>
                        <div className="mt-2">
                          <StatusBadge status={parcel.status} />
                        </div>
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex gap-3 md:mr-6">
                      {parcel.status === "pending" && (
                        <button className="btn btn-ghost btn-circle hover:bg-blue-100 text-blue-600">
                          <FiEdit size={20} />
                        </button>
                      )}
                      <button className="btn btn-ghost btn-circle hover:bg-green-100 text-green-600">
                        <FiEye size={20} />
                      </button>
                      {(parcel.status === "pending" || parcel.status === "cancelled") && (
                        <button
                          onClick={() => handleParcelDelete(parcel._id)}
                          className="btn btn-ghost btn-circle hover:bg-red-100 text-red-600"
                        >
                          <FaTrashAlt size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyParcels;
