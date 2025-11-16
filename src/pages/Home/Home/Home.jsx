import React from "react";
import HowItWorks from "../HowItWorks/HowItWorks";
import Banner from "../Banner/Banner";
import OurServices from "../OurServices/OurServices";

const Home = () => {
  return (
    <div>
      <Banner/>
      <HowItWorks />
      <OurServices/>
    </div>
  );
};

export default Home;
