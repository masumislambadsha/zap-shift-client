import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import logo from "../../../assets/logo.png";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => (
  <footer className="w-full bg-[#111211] py-8 px-3 md:px-0 rounded-b-[20px]">
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
      <img src={logo} alt="ZapShift" className="h-[30px] mb-3 mx-auto" draggable="false" />
      <p className="text-[#C0C1C1] text-base md:text-[0.98rem] max-w-xl mx-auto mb-4 px-2 leading-relaxed">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments – we deliver on time, every time.
      </p>
      <ul className="flex flex-wrap gap-y-3 gap-x-8 justify-center mb-4 text-[#fafafa] text-base md:text-[0.97rem] font-normal">
        <li className="w-1/2 sm:w-auto text-center">Services</li>
        <li className="w-1/2 sm:w-auto text-center">Coverage</li>
        <li className="w-1/2 sm:w-auto text-center">About Us</li>
        <li className="w-1/2 sm:w-auto text-center">Pricing</li>
        <li className="w-1/2 sm:w-auto text-center">Blog</li>
        <li className="w-1/2 sm:w-auto text-center">Contact</li>
      </ul>
      <div className="flex gap-6 justify-center items-center mt-1 mb-2">
        <a href="#" aria-label="LinkedIn">
          <FaLinkedinIn className="text-[#57A5C3] text-2xl md:text-xl hover:scale-110 transition" />
        </a>
        <a href="#" aria-label="Twitter/X">
          <FaXTwitter className="text-[#C0C1C1] text-2xl md:text-xl hover:scale-110 transition" />
        </a>
        <a href="#" aria-label="Facebook">
          <FaFacebookF className="text-[#3685D6] text-2xl md:text-xl hover:scale-110 transition" />
        </a>
        <a href="#" aria-label="YouTube">
          <FaYoutube className="text-[#FB2A2A] text-2xl md:text-xl hover:scale-110 transition" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
