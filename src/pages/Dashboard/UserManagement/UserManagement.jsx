import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUserShield, FaTrashAlt } from "react-icons/fa";
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
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 400);
    return () => clearTimeout(id);
  }, [searchText]);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?searchText=${encodeURIComponent(debouncedSearch)}`
      );
      return res.data;
    },
  });

  const handleMakeAdmin = async (singleUser) => {
    const roleInfo = { role: "admin" };
    const res = await axiosSecure.patch(
      `/users/${singleUser._id}/role`,
      roleInfo
    );
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
    const res = await axiosSecure.patch(
      `/users/${singleUser._id}/role`,
      roleInfo
    );
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
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Manage Users
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-1">
              {users.length} user{users.length !== 1 && "s"} found
            </p>
          </div>

          <div className="w-full sm:w-72">
            <label className="flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/60">
              <svg
                className="h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </g>
              </svg>
              <input
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                placeholder="Search by name or email"
                autoFocus
              />
            </label>
          </div>
        </div>

        {users.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <div className="text-6xl mb-4">👥</div>
            <p className="text-xl text-gray-600">No users found.</p>
            <p className="text-gray-500">
              Try a different name or email keyword.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {users.map((singleUser) => (
              <div
                key={singleUser._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="bg-primary text-secondary p-5 flex justify-between items-center">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    User Profile
                  </h3>
                  <span className="bg-white/20 px-4 py-1 rounded-full text-xs sm:text-sm">
                    Account Overview
                  </span>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex md:justify-start justify-center items-center gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold text-primary">
                          {singleUser.displayName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                            {singleUser.displayName || "Unnamed User"}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {singleUser.email}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs items-center sm:text-sm">
                        <div>
                          <span className="text-gray-500">Role</span>
                          <div className="mt-2">
                            <StatusBadge role={singleUser.role} />
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Joined</span>
                          <p className="font-medium text-gray-800 mt-0.5">
                            {singleUser.createdAt
                              ? new Date(
                                  singleUser.createdAt
                                ).toLocaleDateString("en-GB")
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                        {singleUser.photoURL ? (
                          <img
                            src={singleUser.photoURL}
                            alt={singleUser.displayName || "User"}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-3xl text-gray-400">👤</span>
                        )}
                      </div>

                      {singleUser.role === "admin" ? (
                        <button
                          onClick={() => handleRemoveAdmin(singleUser)}
                          className="btn mt-1 px-5 py-2.5 sm:px-7 sm:py-3 text-sm sm:text-base text-white rounded-lg font-medium bg-red-600 hover:bg-red-500 shadow-md flex items-center gap-2 justify-center"
                        >
                          Remove Admin
                          <FaTrashAlt className="text-xs sm:text-sm" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(singleUser)}
                          className="btn mt-1 px-5 py-2.5 sm:px-7 sm:py-3 text-sm sm:text-base rounded-lg font-semibold bg-[#b0e413] hover:bg-primary text-secondary shadow-md flex items-center gap-2 justify-center"
                        >
                          Make Admin
                          <FaUserShield className="text-xs sm:text-sm" />
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
