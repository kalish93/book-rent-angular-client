import { createBrowserRouter } from "react-router-dom";
import LoginComponent from "../components/auth/Login";
import React from "react";
import Home from "../components/Home";
import UsersList from "../components/auth/UsersList";
import DashboardHome from "../components/dashboard/DashboardHome";
import ChangePassword from "../components/auth/changePassword";
import PermissionList from "../components/auth/PermissionList";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "users",
        element: <UsersList />,
      },
      {
        path: "permissions/:id",
        element: <PermissionList />,
      },
     
    ],
  },
  {
    path: "/login",
    element: <LoginComponent />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
]);

export default routes;
