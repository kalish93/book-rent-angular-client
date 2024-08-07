import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useLocation } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import logo from "../../assets/logo.png";

const drawerWidth = 255;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start", // Align logo and close icon
  padding: theme.spacing(0, 1),
  marginLeft:'1rem',
  ...theme.mixins.toolbar,
}));

const Logo = styled("img")({
  maxHeight: 25,
});

interface SideBarProps {
  showDrawer: boolean;
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ showDrawer, setShowDrawer }: SideBarProps) => {
  const location = useLocation();
  const [open, setOpen] = useState([false, false, false, false, false]);

  const handleClick = (idx: number) => {
    setOpen((prev) => {
      const newState = [...prev];
      newState[idx] = !prev[idx];
      return newState;
    });
  };

  const isLinkActive = (pathname: string) => location.pathname === pathname;

  return (
    <Drawer
      open={showDrawer}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#171B36",
          color: "#fff",
          borderRadius: '1rem',
          margin: '.5rem',
          height: '97.6vh'
        },
      }}
      variant="persistent"
      anchor="left"
    >
      <DrawerHeader style={{ marginBottom: "10px", marginTop: "10px" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => setShowDrawer(false)}
        >
          <MenuIcon />
        </IconButton>

        <Logo src={logo} alt="Logo" />
        <Typography variant="h6" style={{ marginLeft: '3px', color: '#00ABFF' }}>Book Rent</Typography>
      </DrawerHeader>
      <Divider  style={{width:'80%', marginLeft:'10%', marginBottom:'15%', color:'#fff'}}/>

      <List style={{width:'95%', marginLeft:'3%'}}>
        <ListItem
        style={{
          borderRadius:'.3rem'
        }}
          button
          component={Link}
          to="/"
          key="Dashboard"
          selected={isLinkActive("/")}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <DashboardOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem
                style={{
                  borderRadius:'.3rem'
                }}
          onClick={() => handleClick(0)}
          button
          component={Link}
          to="/books"
          key="Books"
          selected={isLinkActive("/books")}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <MenuBookOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Books" />
        </ListItem>

        <ListItem
                style={{
                  borderRadius:'.3rem'
                }}
          button
          component={Link}
          to="/book-upload"
          key="Book Upload"
          selected={isLinkActive("/book-upload")}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <PersonOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Book Upload" />
        </ListItem>
        <ListItem
                style={{
                  borderRadius:'.3rem'
                }}
          button
          component={Link}
          to="/owners"
          key="Owners"
          selected={isLinkActive("/owners")}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <PersonOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Owners" />
        </ListItem>

        <ListItem
                style={{
                  borderRadius:'.3rem'
                }}
          button
          component={Link}
          to="/notification"
          key="Notification"
          selected={isLinkActive("/notification")}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notification" />
        </ListItem>

        <ListItem
                style={{
                  borderRadius:'.3rem'
                }}
          button
          component={Link}
          to="/settings"
          key="Settings"
          selected={isLinkActive("/settings")}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

        <ListItem
                style={{
                  borderRadius:'.3rem'
                }}
          button
          component={Link}
          to="/login-as-owner"
          key="Login as Book Owner"
          selected={isLinkActive("/login-as-owner")}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Login as Book Owner" />
        </ListItem>
      </List>

      <Divider style={{ width: '80%', marginLeft: '10%', marginBottom: '15%' }} />

      <ListItem
              style={{
                borderRadius:'.3rem'
              }}
        button
        component={Link}
        to="/logout"
        key="Logout"
        selected={isLinkActive("/logout")}
      >
        <ListItemIcon sx={{ color: "inherit" }}>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </Drawer>
  );
};

export default Sidebar;
