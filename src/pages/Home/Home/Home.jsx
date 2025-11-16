import React from "react";
import HowItWorks from "../HowItWorks/HowItWorks";
import Banner from "../Banner/Banner";
import OurServices from "../OurServices/OurServices";
import Brands from "../Brands/Brands";

const Home = () => {
  return (
    <div>
      <Banner/>
      <HowItWorks />
      <OurServices/>
      <Brands/>
    </div>
  );
};

export default Home;
