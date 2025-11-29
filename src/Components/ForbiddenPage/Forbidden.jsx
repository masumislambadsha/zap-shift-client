// src/pages/Forbidden.jsx
import React from "react";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-7xl font-extrabold text-red-500 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Access Forbidden
        </h2>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page. If you think this is a
          mistake, please contact an administrator.
        </p>
        <Link
          to="/"
          className="btn px-6 py-3 bg-primary text-white hover:bg-green-700 rounded-lg font-medium"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
