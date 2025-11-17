// src/components/HowItWorks.jsx
import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-teal-800 mb-8 text-center md:text-left">
          How it Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Booking Pick & Drop */}
          <div className="bg-white hover:bg-primary transition duration-500 p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 17V7m0 10a2 2 0 11-4 0m4 0h7m-7 0h-1"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-teal-800 mb-2">Booking Pick & Drop</h3>
            <p className="text-gray-600 text-sm">
              From personal packages to business shipments — we deliver on time, every time.
            </p>
          </div>

          {/* Card 2: Cash On Delivery */}
          <div className="bg-white hover:bg-primary transition duration-500 p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.657 0-3-.895-3-2s1.343-2 3-2m0 0c1.11 0 2.08.402 2.599 1M13 16h4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-teal-800 mb-2">Cash On Delivery</h3>
            <p className="text-gray-600 text-sm">
              From personal packages to business shipments — we deliver on time, every time.
            </p>
          </div>

          {/* Card 3: Delivery Hub */}
          <div className="bg-white hover:bg-primary transition duration-500 p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-teal-800 mb-2">Delivery Hub</h3>
            <p className="text-gray-600 text-sm">
              From personal packages to business shipments — we deliver on time, every time.
            </p>
          </div>

          {/* Card 4: Booking SME & Corporate */}
          <div className="bg-white hover:bg-primary transition duration-500 p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M15 14h.01m-6-4h4m-4 8h4m-4-4h4m-6 0h.01m-3-4h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-teal-800 mb-2">Booking SME & Corporate</h3>
            <p className="text-gray-600 text-sm">
              From personal packages to business shipments — we deliver on time, every time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
