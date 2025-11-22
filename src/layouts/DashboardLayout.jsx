import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { CiDeliveryTruck } from "react-icons/ci";

const DashboardLayout = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open max-w-7xl mx-auto border border-gray-300 rounded-md shadow-sm">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col min-h-screen">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300 border-b border-gray-300 px-4">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="inline-block w-6 h-6"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4 font-semibold text-lg">Navbar Title</div>
          </nav>
          {/* Page content here */}
          <main className="grow p-6 bg-white">
            <Outlet />
          </main>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <aside className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 border-l border-gray-300">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              <li>
                <Link
                  to={"/"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right px-4 py-3 hover:bg-gray-100 flex items-center gap-3 rounded"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>
              <li>
                <NavLink
                  to={"my-parcels"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right px-4 py-3 hover:bg-gray-100 flex items-center gap-3 rounded"
                  data-tip="Settings"
                >
                  <CiDeliveryTruck className="font-bold" size={23} color="black" />
                  <span className="is-drawer-close:hidden">My Parcels</span>
                </NavLink>
              </li>

              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right px-4 py-3 hover:bg-gray-100 flex items-center gap-3 rounded w-full text-left"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
