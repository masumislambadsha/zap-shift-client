import React from "react";
import Logo from "../Components/Logo/Logo";
import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";
import { Toaster } from "react-hot-toast";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      <Logo />
      <div className="flex md:flex-row flex-col-reverse justify-around items-center mt-20">
        <div className="flex-1 mx-auto">
          <Outlet />
        </div>
        <div className="flex-1">
          <img src={authImage} alt="" />
        </div>
      </div>
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

export default AuthLayout;
