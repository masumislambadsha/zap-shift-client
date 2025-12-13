import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";

const TrackParcel = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();

  // TODO: replace these placeholders with real data from API if you have it
  const senderName = "Sender name";
  const senderAddress = "Sender address";
  const senderPhone = "01XXXXXXXXX";
  const weight = 0.5;
  const codAmount = 0;

  const { data: trackings = [], isLoading } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
    enabled: !!trackingId,
  });

  const isDelivered =
    trackings.length > 0 &&
    trackings.some((log) => log.status?.toLowerCase() === "delivered");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-14 h-14 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Search bar */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Track Your Consignment
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Now you can easily track your parcel with Zapshift.
          </p>

          <div className="mt-6 flex max-w-xl mx-auto rounded-full overflow-hidden border border-gray-200 bg-white">
            <div className="flex items-center px-4 text-gray-400"></div>
            <input
              defaultValue={trackingId}
              className="flex-1 px-2 py-3 text-sm outline-none"
              placeholder="Enter your tracking ID"
              readOnly
            />
            <button className="px-6 bg-secondary text-white text-sm font-semibold">
              Search
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {trackings[0] &&
                  new Date(trackings[0].createdAt).toLocaleString("en-GB")}
              </p>
              <p>
                <span className="font-semibold">Tracking ID:</span>{" "}
                <span className="font-mono text-secondary">{trackingId}</span>
              </p>
              <p>
                <span className="font-semibold">Sender:</span> {senderName}
              </p>
              <p>
                <span className="font-semibold">Address:</span> {senderAddress}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {senderPhone}
              </p>
            </div>


            <div className="text-right space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-semibold">Weight:</span> {weight} kg
              </p>
              <p className="text-lg font-bold text-secondary">
                COD: ৳ {codAmount}
              </p>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                  isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {isDelivered ? "Delivered" : "In progress"}
              </span>
            </div>
          </div>
        </div>

       
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 py-8 px-6 md:px-10">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-8">
            Tracking Updates
          </h2>

          {trackings.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No tracking updates yet. Please check again later.
            </p>
          ) : (
            <div className="flex flex-col md:flex-row md:justify-center">
              {/* Left: times */}
              <div className="md:w-1/3 space-y-8 text-right pr-6 text-sm text-gray-500">
                {trackings
                  .slice()
                  .reverse()
                  .map((log) => (
                    <div key={log._id}>
                      <p className="text-secondary font-semibold">
                        {new Date(log.createdAt).toLocaleDateString("en-GB", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-xs">
                        {new Date(log.createdAt).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Middle: vertical line + dots */}
              <div className="relative flex justify-center px-4">
                <div className="w-px bg-gray-200 h-full" />
                <div className="absolute inset-y-0 flex flex-col justify-between py-1">
                  {trackings.map((_, idx, arr) => {
                    const isBottom = idx === arr.length - 1;
                    const isLatest = idx === arr.length - 1;
                    return (
                      <div
                        key={idx}
                        className="flex-1 flex items-center justify-center"
                      >
                        <div
                          className={`w-9 h-9 rounded-full border-2 flex items-center justify-center ${
                            isLatest
                              ? "border-secondary bg-secondary/10"
                              : "border-emerald-500 bg-emerald-50"
                          }`}
                        >
                          {/* you can drop an icon here */}
                        </div>
                        {!isBottom && (
                          <div className="absolute w-px bg-gray-200 h-full" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: messages */}
              <div className="md:w-1/2 space-y-8 pl-6 text-sm text-gray-700">
                {trackings
                  .slice()
                  .reverse()
                  .map((log, idx) => (
                    <p
                      key={log._id}
                      className={`leading-relaxed ${
                        idx === 0 ? "font-semibold text-gray-900" : ""
                      }`}
                    >
                      {log.details || log.status.replace("_", " ")}
                    </p>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackParcel;
