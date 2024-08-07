import { createBrowserRouter } from "react-router-dom";
import LoginComponent from "../components/auth/Login";
import React from "react";
import Home from "../components/Home";
import DashboardHome from "../components/dashboard/DashboardHome";
import ChangePassword from "../components/auth/changePassword";
import PermissionList from "../components/auth/PermissionList";
import SignUpComponent from "../components/auth/SignUp";
import OwnersList from "../components/auth/OwnersList";
import BookUpload from "../components/books/BookUpload";


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
        path: "owners",
        element: <OwnersList />,
      },
      {
        path: "book-upload",
        element: <BookUpload />,
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
    path: "/signup",
    element: <SignUpComponent />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
]);

export default routes;
