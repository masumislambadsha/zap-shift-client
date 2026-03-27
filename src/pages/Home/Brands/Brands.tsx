import React from "react";
import Marquee from "react-fast-marquee";
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonstart from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import startPeople from "../../../assets/brands/start_people.png";

const brands = [amazon, casio, moonstart, randstad, star, startPeople];

const Brands = () => {
  return (
    <div className="mt-12">
      <Marquee speed={120} linear={false}>
        {brands.map((logo, ind) => (
          <div key={ind} className="mx-8 mn">
            <img src={logo} alt="" className="h-6" />

          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Brands;
