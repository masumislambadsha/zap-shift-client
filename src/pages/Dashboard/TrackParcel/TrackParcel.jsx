import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../../Hooks/useAxios";

const TrackParcel = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();

  const { data: trackings = [] } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
  });

  return (
  <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
  <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
    Parcel Activity
  </h3>
  <p className="text-center text-sm text-gray-500 mb-8">
    Latest updates for your shipment
  </p>

  <ul className="timeline timeline-vertical">
    {trackings.map((log, idx) => (
      <li key={log._id}>
        {idx !== 0 && <hr />}
        <div className="timeline-start text-sm text-gray-500">
          {new Date(log.createdAt).toLocaleString("en-GB")}
        </div>
        <div className="timeline-middle">
          <span className="bg-primary/20 flex items-center justify-center rounded-full w-5 h-5">
            <span className="badge badge-primary w-3 h-3 rounded-full p-0"></span>
          </span>
        </div>
        <div className="timeline-end">
          <div className="timeline-box bg-gray-50 border border-gray-200">
            <p className="text-sm font-semibold text-gray-800">
              {log.status.replace("_", " ")}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {log.details}
            </p>
          </div>
        </div>
        <hr />
      </li>
    ))}
  </ul>
</div>

  );
};

export default TrackParcel;
