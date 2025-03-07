import React from "react";
import { Grid, Card, CardContent, Typography,Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CountUp from "react-countup";

const SummaryCards = ({handleNavigation, pendingOrders, reminderOrders, completedOrders, pendingAmount }) => {

  const cardData = [
      { title: "Reminder Orders",status:"",type:"reminder", value: reminderOrders, icon: <HourglassFullIcon />, color: "#F44336", },
      { title: "Pending Amount",status:"Pending",type:"paymentDetails", value: `₹${pendingAmount}`, icon: <CurrencyRupeeIcon />, color: "#2196F3" },
      { title: "Completed Orders",status:"Completed",type:"orders", value: completedOrders, icon: <CheckCircleIcon />, color: "#4CAF50" },
      { title: "Pending Orders",status:"Pending",type:"orders", value: pendingOrders, icon: <ShoppingCartIcon />, color: "#FF9800" },
  ];

  return (
    
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {cardData.map((card, index) => (
        <Grid item xs={6} sm={3} key={index}>
          <Card onClick={()=>{handleNavigation(card.type,card.status)}} sx={{ backgroundColor: card.color, color: "#fff", textAlign: "center" }}>
  <CardContent>
    <Box
      sx={{
        width: 50,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: "50%",
        mx: "auto",
        animation: "breathing 2s infinite ease-in-out",
        "@keyframes breathing": {
          "0%": { transform: "scale(0.8)", backgroundColor: "rgba(255,255,255,0.2)" },
          "50%": { transform: "scale(1)", backgroundColor: "rgba(255,255,255,0.4)" },
          "100%": { transform: "scale(0.8)", backgroundColor: "rgba(255,255,255,0.2)" }
        }
      }}
    >
      {card.icon}
    </Box>
    <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
    <CountUp start={0} end={typeof card.value === "number" ? card.value : parseFloat(card.value.replace(/[₹,]/g, ""))} duration={2} />
    </Typography>
    <Typography variant="subtitle2" sx={{ fontSize: "0.85rem" }}>
      {card.title}
    </Typography>
  </CardContent>
</Card>

        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;
