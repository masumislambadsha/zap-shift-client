import React from "react";
import HowItWorks from "../HowItWorks/HowItWorks";
import Banner from "../Banner/Banner";
import OurServices from "../OurServices/OurServices";
import Brands from "../Brands/Brands";
import Reviews from "../Reviews/Reviews";
import Accordion from "../Accordion/Accordion";

const reviewsPromise = fetch("/reviews.json").then(res=>res.json())
const Home = () => {
  return (
    <div>
      <Banner/>
      <HowItWorks />
      <OurServices/>
      <Brands/>
      <Reviews reviewsPromise={reviewsPromise} />
      <Accordion/>
    </div>
  );
};

export default Home;
