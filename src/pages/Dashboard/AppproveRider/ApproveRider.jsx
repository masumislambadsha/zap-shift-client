import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import toast from "react-hot-toast";
import { FaUserCheck } from "react-icons/fa6";
import { IoPersonRemove } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const { data: riders = [], isLoading, refetch } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  const handleApproval = (id) => {
    const updateInfo = { status: "approved" };
    axiosSecure
      .patch(`/riders/${id}`, updateInfo)
      .then((res) => {
        console.log("cliked 2");

        if (res.data.modifiedCount) {
         refetch()

          Swal.fire({
            title: "Accepted",
            text: "Rider Has Been Approved !!!",
            icon: "success",
            timer: 2500,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const StatusBadge = ({ status }) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      approved: "bg-green-100 text-green-800 border-green-300",
      rejected: "bg-red-100 text-red-800 border-red-300",
    };

    const displayText = status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
          styles[status] || styles.pending
        }`}
      >
        {displayText}
      </span>
    );
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Riders Pending Approval
          </h1>
          <p className="text-2xl font-medium text-primary mt-3">
            {riders.length} rider{riders.length !== 1 && "s"} waiting for
            approval
          </p>
        </div>

        {riders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <div className="text-6xl mb-4">Checkmark</div>
            <p className="text-xl text-gray-600">
              No pending riders at the moment.
            </p>
            <p className="text-gray-500">
              Great job staying on top of approvals!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {riders.map((rider) => (
              <div
                key={rider._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Primary Header */}
                <div className="bg-primary text-secondary p-5 flex justify-between items-center">
                  <h3 className="text-xl font-bold">New Rider Application</h3>
                  <span className="bg-white/25 px-4 py-1 rounded-full text-sm">
                    Ready for Review
                  </span>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Rider Info */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary">
                          {rider.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-800">
                            {rider.name}
                          </h4>
                          <p className="text-gray-600">{rider.email}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Phone</span>
                          <p className="font-medium">{rider.phone || "N/A"}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">NID</span>
                          <p className="font-medium">{rider.nid || "N/A"}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="pt-3 border-t border-gray-200">
                          <p className="text-sm text-gray-500 mb-1">Applied on</p>
                          <p className="font-medium">
                            {new Date(rider.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-gray-200">
                          <p className="text-sm text-gray-500 mb-1 ml-1">Status</p>
                          <StatusBadge status={rider.status || "pending"} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-32 h-32 flex items-center justify-center">
                        <img
                          src={rider.photoURL}
                          className="w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-end gap-4">
                    {rider.status !== "approved" && (
                      <button className="btn px-8 py-5.5  text-white rounded-lg  font-medium transition shadow-lg disabled:opacity-60 bg-red-800 hover:bg-red-600/90">
                        Reject
                        <IoPersonRemove />
                      </button>
                    )}
                    <button
                      className={`btn px-8 py-5.5 text-white rounded-lg  hover:bg-primary font-semibold transition shadow-lg disabled:opacity-70 hover:text-secondary  bg-[#749b00] text-[16px] ${
                        rider.status === "approved" && "disabled mr-[7vw]"
                      }`}
                      onClick={() => handleApproval(rider._id)}
                    >
                      {rider.status === "approved"
                        ? "Rider Approved"
                        : "Approve Rider"}
                      <span className="hover:text-secondary">
                        <FaUserCheck />
                      </span>
                    </button>
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

export default ApproveRider;
