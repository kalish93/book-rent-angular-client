import React, { useState } from "react";
import Sidebar from "./common/SideBar";
import Navbar from "./common/ToolBar";
import { Navigate, Route, Routes } from "react-router-dom";
import UsersList from "./auth/UsersList";
import DashboardHome from "./dashboard/DashboardHome";
import { Container, CssBaseline, styled } from "@mui/material";
import PermissionList from "./auth/PermissionList";
import { hasPermission } from "../utils/checkPermission";
import { PERMISSIONS } from "../core/permissions";
import { jwtDecode } from "jwt-decode";
import AppLogout from "./AppLogout";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  marginTop: "78px",
  maxWidth: "99%",
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    padding: 0,
    maxWidth: "80%",
  }),
}));

const AuthenticatedRoute: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // Decode the token to extract expiration time
  const decodedToken = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds

  if (decodedToken.exp! < currentTime) {
    // If the token has expired, remove it from local storage
    localStorage.removeItem("accessToken");
    // Redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated and the token is valid, render the element
  return <>{element}</>;
};
interface ProtectedRouteProps {
  element: React.ReactNode;
  permission?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  permission,
}) => {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  // if(!isAuthenticated){
  //   return <Navigate to="/login" replace />;
  // }

  const token = localStorage.getItem("accessToken");

  if (!token) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // Decode the token to extract expiration time
  const decodedToken = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds

  if (decodedToken.exp! < currentTime) {
    // If the token has expired, remove it from local storage
    localStorage.removeItem("accessToken");
    // Redirect to the login page
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && hasPermission(permission)) {
    return <>{element}</>;
  } else if (isAuthenticated) {
    // User is authenticated but does not have the required permission
    return <Navigate to="/" replace />;
  } else {
    // User is not authenticated
    return <Navigate to="/login" replace />;
  }
};

const Home = () => {
  const [showDrawer, setShowDrawer] = useState(true);

  return (
    <AppLogout>
    <>
      <CssBaseline />
      <Navbar showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
    <div style={{ display: "flex" }}>
      <Sidebar showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
      <Main open={showDrawer}>
        <Container sx={{margin: 0, maxWidth: "unset"}} maxWidth={false}> 
        <Routes>
          <Route
            path="/users"
            element={
              <ProtectedRoute
                element={<UsersList />}
                permission={PERMISSIONS.GetUsers}
              />
            }
          />
         
          <Route
            path="/"
            element={<AuthenticatedRoute element={<DashboardHome />} />}
          />
          <Route
            path="/permissions/:id"
            element={
              <ProtectedRoute
                element={<PermissionList />}
                permission={PERMISSIONS.GetPermissions}
              />
            }
          />
          </Routes>
        </Container>
      </Main>
    </div>
    </>
    </AppLogout>
  );
};

export default Home;
