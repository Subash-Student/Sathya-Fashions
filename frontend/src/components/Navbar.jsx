import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItemIcon,ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useNavigate} from "react-router-dom"
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PaymentIcon from "@mui/icons-material/Payment";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import {useDispatch} from "react-redux"
import { setToken } from "../redux/tokenSlice";
import { setFilterOptions, setOrderFilterOptions } from "../redux/orderSlice";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
const Navbar = () => {

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);
 const navigate = useNavigate();

  const handleNavigation = (path)=>{
     setOpen(false);
     if(path ==="/orders"){
    dispatch(setOrderFilterOptions({
      date: "",
      status: "",
      paymentStatus: "",
      sort: "", 
    }));

     }else if(path ==="/paymentDetails"){
          dispatch(setFilterOptions({date: "", status: "",sort:""}))
     }

     navigate(path)
  }
  const handleLogout = () => {
   dispatch(setToken(""))
    navigate("/")
  };
  return (
    <>
      {/* Top App Bar */}
      <AppBar  position="sticky" sx={{ background: "#5d2f2f",borderRadius:"0px 0px 8px 8px" }}>
        <Toolbar >
          {/* Logo and Shop Name */}
          <img src={"/logo2.png"} onClick={()=>navigate("/dashBoard")} alt="Tailor Shop" style={{ height: 55, margin: 5 }} />
          <Typography variant="h6"  sx={{ flexGrow: 1 }}>
            Sathya Fashions
          </Typography>

          {/* Hamburger Menu Button */}
          <IconButton style={{width:40,height:40,borderRadius:"8px",backgroundColor:"#5803038b"}} color="inherit" onClick={() => setOpen(true)}>
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
        <ListItemButton onClick={() => handleNavigation("/dashBoard")}>
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

        <ListItemButton onClick={() => handleNavigation("/reminderOrders")}>
          <ListItemIcon>
            <AccessAlarmIcon sx={{ color: "#ff0000" }} />
          </ListItemIcon>
          <ListItemText primary="Reminders " />
        </ListItemButton>

        <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon sx={{ color: "#000000" }} /> {/* Logout icon with custom color */}
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
      </List>
    </Drawer>
    </>
  );
};

export default Navbar;
