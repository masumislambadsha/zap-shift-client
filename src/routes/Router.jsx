import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import BeARider from "../pages/BeARider/BeARider";
import AboutUs from "../pages/AboutUs/AboutUs";
import SendAParcel from "../pages/SendAParcel/SendAParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels";
import Payments from "../pages/Dashboard/Payments/Payments";
import PaymentSuccess from "../pages/Dashboard/Payments/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Payments/PaymentCancel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/rider",
        element: (
          <PrivateRoute>
            <BeARider />
          </PrivateRoute>
        ),
      },
      {
        path: "/sendAParcel",
        element: (
          <PrivateRoute>
            <SendAParcel />
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenter.json").then((res) => res.json())
      },
      {
        path: "/aboutus",
        Component: AboutUs,
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path:"/dashboard",
    element: <PrivateRoute><DashboardLayout/> </PrivateRoute>,
    children:[
      {
        path:"my-parcels",
        Component: MyParcels
      },
      {
        path:"payment/:parcelId",
        Component: Payments
      },
      {
        path:"payment-success",
        Component: PaymentSuccess
      },
      {
        path:"payment-cancelled",
        Component: PaymentCancel
      },
    ]
  }
]);
