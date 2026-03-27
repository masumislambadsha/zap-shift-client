import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const StatusBadge = ({ status }) => {
  const badgeStyles = {
    driver_assigned: "bg-primary/10 text-primary border-primary/30",
    "on the way": "bg-primary/10 text-primary border-primary/30",
    picked_up: "bg-primary/10 text-primary border-primary/30",
    delivered: "bg-primary text-secondary border-primary",
  };

  const key = status?.toLowerCase().replace(/\s+/g, "_") || "driver_assigned";
  const label = status
    ? status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Delivered";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
        badgeStyles[key] || badgeStyles.driver_assigned
      }`}
    >
      {label}
    </span>
  );
};

const DeliveredParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["delivered-parcels", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/parcels/riders?riderEmail=${user?.email}&deliverStatus=delivered`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.reciverDistrict) {
      return parcel.cost * 0.8;
    } else {
      return parcel.cost * 0.6;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Delivered Parcels
          </h1>
          <p className="text-lg text-primary mt-2">
            {parcels.length} parcel{parcels.length !== 1 && "s"} successfully
            delivered
          </p>
        </div>

        {/* Empty State */}
        {parcels.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4 text-gray-300">✅</div>
            <p className="text-xl font-semibold text-gray-700">
              No completed deliveries
            </p>
            <p className="text-gray-500 mt-1">
              Check back after your next delivery!
            </p>
          </div>
        )}

        {/* Cards */}
        <div className="space-y-6">
          {parcels.map((parcel) => (
            <div
              key={parcel._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="bg-primary text-secondary px-5 py-3 flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-bold">
                  Delivery Completed
                </h3>
                <StatusBadge status={parcel.deliverStatus} />
              </div>

              <div className="p-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="md:col-span-1 space-y-4 ">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-800">
                        {parcel.parcelName}
                      </h4>
                      <p className="text-gray-600 text-sm mt-0.5">
                        Delivered:{" "}
                        {new Date(
                          parcel.updatedAt || parcel.createdAt
                        ).toLocaleDateString("en-GB")}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium text-[#7ca500] mb-1">
                          Pickup From
                        </p>
                        <p className="font-semibold text-base">
                          {parcel.senderName}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {parcel.senderPhone}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {parcel.senderDistrict}, {parcel.senderRegion}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">
                          Delivered To
                        </p>
                        <p className="font-semibold text-base">
                          {parcel.reciverName}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {parcel.reciverPhone}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {parcel.reciverDistrict}, {parcel.reciverRegion}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm md:text-base">
                      <div>
                        <span className="text-gray-500">Weight: </span>
                        <span className="font-semibold">
                          {parcel.parcelWeight} kg
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Cost: </span>
                        <span className="font-bold text-secondary px-2 py-1 rounded-2xl bg-primary">
                          {parcel.cost} BDT
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Payout: </span>
                        <span className="font-bold text-secondary px-2 py-1 rounded-2xl bg-primary">
                          {calculatePayout(parcel)} BDT
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Tracking: </span>
                        <span className="font-mono font-semibold text-secondary px-2 py-1 rounded-2xl bg-primary">
                          {parcel.trackingId}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Success Icon */}
                  <div className="flex flex-col justify-center items-center gap-4">
                    <div className="lg:w-28 h-28 bg-primary/5 border-2 border-dashed border-primary/30 rounded-2xl flex items-center justify-center text-3xl text-primary/50 w-full">
                      ✅
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary">
                        Completed!
                      </p>
                      <p className="text-sm text-gray-500">Great job</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveredParcels;
