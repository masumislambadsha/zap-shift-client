import React from 'react';
import Logo from '../Components/Logo/Logo';
import { Outlet } from 'react-router';
import authImage from "../assets/authImage.png"

const AuthLayout = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      <Logo/>
      <div className='flex md:flex-row flex-col-reverse justify-around items-center'>
      <Outlet/>
      <img src={authImage} alt="" />
      </div>
    </div>
  );
};

export default AuthLayout;
