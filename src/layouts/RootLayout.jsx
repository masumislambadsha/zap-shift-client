import React from "react";
import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2000,
          style: {
            fontFamily: "inherit",
            borderRadius: "12px",
          },
        }}
      />
    </div>
  );
};

export default RootLayout;
