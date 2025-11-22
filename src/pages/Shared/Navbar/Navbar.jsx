import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { NavLink } from "react-router"; // Make sure you use react-router-dom
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navItems = [
    { to: "/", label: "Services" },
    { to: "/coverage", label: "Coverage" },
    { to: "/aboutus", label: "About Us" },
    { to: "/sendAParcel", label: "Send A Parcel" },
  ];
  const handleSignOut = () => {
    logOut()
      .then(() => toast.success("Logged Out Successfully"))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm px-3">

        {/* Left / Start */}
        <div className="navbar-start">

          {/* Mobile Dropdown */}
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost md:hidden">
              <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
            {/* Dropdown Panel for mobile */}
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow">
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
              {user && (
                <li>
                  <NavLink
                    to="/dashboard/my-parcels"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-lime-200 rounded-full px-6 py-2 text-green-900 font-medium transition-colors"
                        : "text-gray-700 hover:text-green-700 transition"
                    }
                  >
                    My Parcels
                  </NavLink>
                </li>
              )}
              {/* Action Buttons for mobile */}
              <li className="mt-3">
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="btn btn-ghost w-full text-black border border-gray-300 rounded-xl"
                  >
                    Log Out
                  </button>
                ) : (
                  <NavLink to="/login" className="btn btn-ghost w-full rounded-xl text-black">
                    Login
                  </NavLink>
                )}
              </li>
              <li>
                <NavLink
                  to="/rider"
                  className="btn btn-primary w-full rounded-xl mx-0 mt-1 text-black"
                >
                  Be A Rider
                </NavLink>
              </li>
            </ul>
          </div>
          {/* Logo */}
          <a href="/" className="btn btn-ghost text-xl">
            <Logo />
          </a>
        </div>

        {/* Center menu: desktop/tablet only */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal flex gap-2 items-center px-1">
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
            {user && (
              <li>
                <NavLink
                  to="/dashboard/my-parcels"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-lime-200 rounded-full px-6 py-2 text-green-900 font-medium transition-colors"
                      : "text-gray-700 hover:text-green-700 transition"
                  }
                >
                  My Parcels
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Right / End: visible on md+ screens */}
        <div className="navbar-end hidden md:flex gap-2">
          {user ? (
            <button
              onClick={handleSignOut}
              className="btn btn-ghost text-black border border-gray-300 rounded-xl"
            >
              Log Out
            </button>
          ) : (
            <NavLink to="/login" className="btn btn-ghost rounded-xl text-black">
              Login
            </NavLink>
          )}
          <NavLink to="/rider" className="btn btn-primary rounded-xl mx-2 text-black">
            Be A Rider
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
