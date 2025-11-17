import React from "react";
import HowItWorks from "../HowItWorks/HowItWorks";
import Banner from "../Banner/Banner";
import OurServices from "../OurServices/OurServices";
import Brands from "../Brands/Brands";
import Reviews from "../Reviews/Reviews";
import InfoMediaCard from "../InfoMediaCard/InfoMediaCard";
import Accordion from "../Accordion/Accordion ";
import BeAMerchantBanner from "../BeAMerchantBanner/BeAMerchantBanner";

const reviewsPromise = fetch("/reviews.json").then(res=>res.json())
const Home = () => {
  return (
    <div>
      <Banner/>
      <HowItWorks />
      <OurServices/>
      <Brands/>
      <InfoMediaCard/>
      <BeAMerchantBanner />
      <Reviews reviewsPromise={reviewsPromise} />
      <Accordion/>
    </div>
  );
};

export default Home;
