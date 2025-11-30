import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FiEdit, FiEye } from "react-icons/fi";
import {
  FaCheckCircle,
  FaMoneyBillWave,
  FaTrashAlt,
  FaTruck,
} from "react-icons/fa";
import { Link } from "react-router";
import { TbCoinTakaFilled } from "react-icons/tb";

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    "pending-pickup": "bg-yellow-100 text-yellow-800 border-yellow-300",
    "on the way": "bg-blue-100 text-blue-800 border-blue-300",
    delivered: "bg-green-100 text-green-800 border-green-300",
    cancelled: "bg-red-100 text-red-800 border-red-300",
    returned: "bg-purple-100 text-purple-800 border-purple-300",
  };

  const key = (status || "pending").toLowerCase();

  const label = key
    .split(/[-_ ]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border ${
        styles[key] || styles.pending
      }`}
    >
      {label}
    </span>
  );
};

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef()
  const { data: parcels = [] } = useQuery({
    queryKey: ["parcel", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?deliverStatus=pending-pickup`
      );
      return res.data;
    },
  });

  const openRiderAssignRiderModal = (parcel) =>{
    riderModalRef.current.showModal()
  }
  return (
    <div>
      <h2 className="text-5xl">Assign Rider {parcels.length}</h2>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              My Parcels
            </h1>
            <p className="mt-3 text-xl text-gray-600">
              Total Bookings:{" "}
              <span className="font-bold text-red-600">{parcels.length}</span>
            </p>
          </div>

          {parcels.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-20 text-center border border-gray-200">
              <div className="text-8xl mb-6 text-gray-300">Parcel</div>
              <h3 className="text-2xl font-semibold text-gray-700">
                No parcels booked yet
              </h3>
              <p className="text-gray-500 mt-3">
                Start sending your first parcel today!
              </p>
              <Link
                to="/send-parcel"
                className="mt-8 inline-block btn btn-wide btn-primary text-lg font-bold"
              >
                Send a Parcel
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {parcels.map((parcel) => (
                <div
                  key={parcel._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  <div className="bg-linear-to-r from-primary to-primary/80 text-secondary p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-3">
                        <FaTruck /> {parcel.parcelName}
                      </h3>
                      <p className="text-sm opacity-90 mt-1">
                        Booked on:{" "}
                        {new Date(
                          parcel.bookingDate || parcel.createdAt
                        ).toLocaleDateString("en-GB")}
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
                      <div>
                        <h4 className="font-semibold text-gray-600 flex items-center gap-2">
                          From
                        </h4>
                        <p className="text-lg font-medium">
                          {parcel.senderName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {parcel.senderDistrict}, {parcel.senderRegion}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-600 flex items-center gap-2">
                          To
                        </h4>
                        <p className="text-lg font-medium">
                          {parcel.reciverName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {parcel.reciverDistrict}, {parcel.reciverRegion}
                        </p>
                      </div>

                      <div className="text-right md:text-left">
                        <p className="text-sm text-gray-500">Total Cost</p>
                        <p className="text-3xl font-bold text-secondary flex items-center ">
                          {parcel.cost}
                          <TbCoinTakaFilled className="mt-1" />
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          {parcel.parcelWeight} kg •{" "}
                          {parcel.parcelType === "document"
                            ? "Document"
                            : "Non-Document"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-6 border-t border-gray-200">
                      <div className="flex flex-wrap gap-6">
                        <div>
                          <p className="text-sm text-gray-500 ">Payment</p>
                          {parcel.paymentStatus === "paid" ? (
                            <span className="flex items-center gap-2 text-green-600 font-bold mt-2">
                              <FaCheckCircle /> Paid
                            </span>
                          ) : (
                            <button className="mt-1 btn btn-sm bg-linear-to-r from-orange-500 to-red-500 text-white hover:shadow-lg border-0">
                              <FaMoneyBillWave className="mr-1" /> Pay Now
                            </button>
                          )}
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            Delivery Status
                          </p>
                          <div className="mt-2">
                            <StatusBadge status={parcel.deliverStatus} />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 md:mr-6">
                        <button
                        onClick={()=>openRiderAssignRiderModal(parcel)}
                        className="btn btn-primary text-secondary">
                          Assign Rider
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
