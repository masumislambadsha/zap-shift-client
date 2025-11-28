import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const StatusBadge = ({ role }) => {
  const styles = {
    admin: "bg-purple-100 text-purple-800 border-purple-300",
    rider: "bg-green-100 text-green-800 border-green-300",
    user: "bg-blue-100 text-blue-800 border-blue-300",
  };

  const key = role || "user";
  const displayText = key.charAt(0).toUpperCase() + key.slice(1);

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border ${
        styles[key] || styles.user
      }`}
    >
      {displayText}
    </span>
  );
};

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = async (singleUser) => {
    const roleInfo = { role: "admin" };
    const res = await axiosSecure.patch(`/users/${singleUser._id}`, roleInfo);
    if (res.data.modifiedCount) {
      refetch();
      Swal.fire({
        title: "ROLE UPDATED",
        text: `${singleUser.displayName} marked as Admin!`,
        icon: "success",
        timer: 2500,
      });
    }
  };

  const handleRemoveAdmin = async (singleUser) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be removed from Admin role.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove admin",
    });

    if (!result.isConfirmed) return;

    const roleInfo = { role: "user" };
    const res = await axiosSecure.patch(`/users/${singleUser._id}`, roleInfo);
    if (res.data.modifiedCount) {
      refetch();
      Swal.fire({
        title: "ROLE UPDATED",
        text: `${singleUser.displayName} removed from Admin!`,
        icon: "success",
        timer: 2500,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800">
            Manage Users
          </h1>
          <p className="text-lg sm:text-2xl font-medium text-primary mt-3">
            {users.length} user{users.length !== 1 && "s"} in the system
          </p>
        </div>

        {users.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <div className="text-6xl mb-4">👥</div>
            <p className="text-xl text-gray-600">No users found.</p>
            <p className="text-gray-500">
              Start inviting people to your platform.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {users.map((singleUser) => (
              <div
                key={singleUser._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Card header */}
                <div className="bg-primary text-secondary p-5 flex justify-between items-center">
                  <h3 className="text-xl font-bold">User Profile</h3>
                  <span className="bg-white/25 px-4 py-1 rounded-full text-sm">
                    Account Overview
                  </span>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Left: info */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold text-primary">
                          {singleUser.displayName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-lg sm:text-xl font-semibold text-gray-800">
                            {singleUser.displayName || "Unnamed User"}
                          </h4>
                          <p className="text-gray-600 text-sm sm:text-base">
                            {singleUser.email}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <span className="text-gray-500">Role</span>
                          <div className="mt-1">
                            <StatusBadge role={singleUser.role} />
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Joined</span>
                          <p className="font-medium">
                            {singleUser.createdAt
                              ? new Date(
                                  singleUser.createdAt
                                ).toLocaleDateString("en-GB")
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: avatar + vertically aligned button */}
                    <div className="flex flex-col items-center justify-center gap-4">
                      {/* Avatar */}
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                        {singleUser.photoURL ? (
                          <img
                            src={singleUser.photoURL}
                            alt={singleUser.displayName || "User"}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-4xl text-gray-400">👤</span>
                        )}
                      </div>

                      {/* Button exactly under image */}
                      {singleUser.role === "admin" ? (
                        <button
                          onClick={() => handleRemoveAdmin(singleUser)}
                          className="btn mt-2 px-6 py-3 sm:px-8 sm:py-5.5 text-white rounded-lg font-medium transition shadow-lg bg-red-700 hover:bg-red-600/90 flex items-center gap-2 justify-center"
                        >
                          Remove Admin
                          <FaTrashAlt />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(singleUser)}
                          className="btn mt-2 px-6 py-3 sm:px-8 sm:py-5.5 rounded-lg font-semibold transition shadow-lg flex items-center gap-2 justify-center bg-[#b0e413] hover:bg-primary text-white hover:text-secondary"
                        >
                          Make Admin
                          <FaUserShield />
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

export default UserManagement;
