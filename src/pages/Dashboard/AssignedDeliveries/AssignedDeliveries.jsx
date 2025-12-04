import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const StatusBadge = ({ status }) => {
  const badgeStyles = {
    driver_assigned: "bg-primary/10 text-primary border-primary/30",
    "on the way": "bg-primary/10 text-primary border-primary/30",
    delivered: "bg-primary text-secondary border-primary",
  };

  const key = status?.toLowerCase().replace(/\s+/g, "_") || "driver_assigned";
  const label = status
    ? status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Assigned";

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

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["assigned-parcels", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/parcels/riders?riderEmail=${user?.email}&deliverStatus=driver_assigned`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  const mutation = useMutation({
    mutationFn: ({ parcelId, action }) =>
      axiosSecure.patch(`/parcels/${parcelId}/rider-action`, {
        riderEmail: user.email,
        action,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["assigned-parcels", user?.email]);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Parcel status updated",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire("Error", "Failed to update status", "error");
    },
  });

  const handleAccept = (parcel) => {
    Swal.fire({
      title: "Accept Delivery?",
      html: `<strong>${parcel.parcelName}</strong><br/>${parcel.senderDistrict} to ${parcel.reciverDistrict}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Accept",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
    }).then((res) =>
      res.isConfirmed &&
      mutation.mutate({ parcelId: parcel._id, action: "accepted" })
    );
  };

  const handleReject = (parcel) => {
    Swal.fire({
      title: "Reject Delivery?",
      text: "This parcel will return to the pool",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      confirmButtonColor: "#dc2626",
    }).then((res) =>
      res.isConfirmed &&
      mutation.mutate({ parcelId: parcel._id, action: "rejected" })
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Assigned Deliveries
          </h1>
          <p className="text-lg text-primary mt-2">
            {parcels.length} parcel{parcels.length !== 1 && "s"} waiting for
            your action
          </p>
        </div>

        {/* Empty State */}
        {parcels.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4 text-gray-300">📦</div>
            <p className="text-xl font-semibold text-gray-700">
              No pending assignments
            </p>
            <p className="text-gray-500 mt-1">Enjoy your break!</p>
          </div>
        )}

        {/* Cards */}
        <div className="space-y-6">
          {parcels.map((parcel) => (
            <div
              key={parcel._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-primary text-secondary px-5 py-3 flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-bold">
                  New Delivery Assignment
                </h3>
                <StatusBadge status={parcel.deliverStatus} />
              </div>

              <div className="p-5">
                <div className="grid lg:grid-cols-3 gap-5">
                  {/* Left: Parcel Details */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-800">
                        {parcel.parcelName}
                      </h4>
                      <p className="text-gray-600 text-sm mt-0.5">
                        Booked:{" "}
                        {new Date(parcel.createdAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">
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
                          Deliver To
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
                        <span className="text-gray-500">Type: </span>
                        <span className="font-semibold capitalize">
                          {parcel.parcelType}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Cost: </span>
                        <span className="font-bold text-secondary px-2 py-1 rounded-2xl bg-primary">
                          {parcel.cost} BDT
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
                  <div className="flex lg:flex-col justify-center items-center gap-4">
                    <div className="lg:w-28 h-28 bg-primary/5 border-2 border-dashed border-primary/30 rounded-2xl flex items-center justify-center text-3xl text-primary/50 w-full">
                      📦
                    </div>

                    <div className="w-full flex gap-3">
                      <button
                        onClick={() => handleReject(parcel)}
                        disabled={mutation.isPending}
                        className="flex-1 bg-red-500 text-white hover:bg-red-600 font-semibold py-2.5 rounded-lg shadow-sm flex items-center justify-center gap-2 text-sm transition cursor-pointer"
                      >
                        <FaTimesCircle className="text-base" />
                        Reject
                      </button>

                      <button
                        onClick={() => handleAccept(parcel)}
                        disabled={mutation.isPending}
                        className="flex-1 bg-primary text-secondary font-semibold py-2.5 rounded-lg shadow-md flex items-center justify-center gap-2 text-sm transition cursor-pointer hover:bg-[#a1d600]"
                      >
                        <FaCheckCircle className="text-base" />
                        Accept
                      </button>
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

export default AssignedDeliveries;
