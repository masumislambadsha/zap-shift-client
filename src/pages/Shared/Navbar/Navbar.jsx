import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Services</NavLink>
      </li>
      <li>
        <NavLink to={"/"}>About Us</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>
    </>
  );
  const handleSignOut = () => {
    logOut()
      .then()
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a href="/" className="btn btn-ghost text-xl">
            <Logo />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <a onClick={handleSignOut} className="btn btn-ghost text-black border border-gray-300 rounded-xl">
              Log Out
            </a>
          ) : (
            <a href="/login" className="btn btn-ghost rounded-xl text-black">
              Login
            </a>
          )}
          <a href="/bearider" className="btn btn-primary rounded-xl mx-2 text-black">
            Be A Rider
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
