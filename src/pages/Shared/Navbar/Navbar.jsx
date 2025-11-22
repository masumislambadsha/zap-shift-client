import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navItems = [
    { to: "/", label: "Services" },
    { to: "/coverage", label: "Coverage" },
    { to: "/aboutus", label: "About Us" },
    { to: "/sendAParcel", label: "Send A Parcel" },
    { to: "/rider", label: "Be a Rider" },
  ];
  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged Out Successfully");
      })
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
              <ul className="flex gap-8 items-center">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-lime-200 rounded-full px-6 py-2 text-green-900 font-medium transition-colors"
                          : "text-gray-700 hover:text-green-700 transition"
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
               {
                user &&
               <li>
                  <NavLink to={'/dashboard/my-parcels'}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-lime-200 rounded-full px-6 py-2 text-green-900 font-medium transition-colors"
                        : "text-gray-700 hover:text-green-700 transition"
                    }
                  >My Parcels</NavLink>
                </li>
               }
              </ul>
            </ul>
          </div>
          <a href="/" className="btn btn-ghost text-xl">
            <Logo />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <ul className="flex gap-8 items-center">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-lime-200 rounded-full px-6 py-2 text-green-900 font-medium transition-colors"
                        : "text-gray-700 hover:text-green-700 transition"
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              {
                user &&
               <li>
                  <NavLink to={'/dashboard/my-parcels'}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-lime-200 rounded-full px-6 py-2 text-green-900 font-medium transition-colors"
                        : "text-gray-700 hover:text-green-700 transition"
                    }
                  >My Parcels</NavLink>
                </li>
              }
            </ul>
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <a
              onClick={handleSignOut}
              className="btn btn-ghost text-black border border-gray-300 rounded-xl"
            >
              Log Out
            </a>
          ) : (
            <a href="/login" className="btn btn-ghost rounded-xl text-black">
              Login
            </a>
          )}
          <a
            href="/rider"
            className="btn btn-primary rounded-xl mx-2 text-black"
          >
            Be A Rider
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
