import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItemIcon,ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useNavigate} from "react-router-dom"
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PaymentIcon from "@mui/icons-material/Payment";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SettingsIcon from "@mui/icons-material/Settings";

const Navbar = () => {
  const [open, setOpen] = useState(false);
 const navigate = useNavigate();

  const handleNavigation = (path)=>{
     setOpen(false);
     navigate(path)
  }

  return (
    <>
      {/* Top App Bar */}
      <AppBar position="sticky" sx={{ background: "#5d2f2f" }}>
        <Toolbar>
          {/* Logo and Shop Name */}
          <img src={"logo2.png"} alt="Tailor Shop" style={{ height: 55, margin: 5 }} />
          <Typography variant="h6"  sx={{ flexGrow: 1 }}>
            Sathya Fashions
          </Typography>

          {/* Hamburger Menu Button */}
          <IconButton color="inherit" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Side Drawer for Navigation */}
      <Drawer
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: 260,
          bgcolor: "#F5F5F5",
          boxShadow: "4px 0px 10px rgba(0,0,0,0.1)",
        },
      }}
    >
      <List>
        <ListItemButton onClick={() => handleNavigation("/")}>
          <ListItemIcon>
            <DashboardIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ fontWeight: "bold" }} />
        </ListItemButton>

        <ListItemButton onClick={() => handleNavigation("/orders")}>
          <ListItemIcon>
            <ReceiptIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>

        <ListItemButton onClick={() => handleNavigation("/paymentDetails")}>
          <ListItemIcon>
            <PaymentIcon sx={{ color: "#FF5733" }} />
          </ListItemIcon>
          <ListItemText primary="Payment Details" />
        </ListItemButton>

        <ListItemButton onClick={() => handleNavigation("/newOrder")}>
          <ListItemIcon>
            <AddBoxIcon sx={{ color: "#4CAF50" }} />
          </ListItemIcon>
          <ListItemText primary="New Order" />
        </ListItemButton>

        <ListItemButton onClick={() => handleNavigation("/settings")}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: "#1976D2" }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </Drawer>
    </>
  );
};

export default Navbar;
