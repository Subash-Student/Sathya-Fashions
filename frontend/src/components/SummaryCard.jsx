import React from "react";
import { Grid, Card, CardContent, Typography,Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CountUp from "react-countup";

const SummaryCards = ({ totalOrders, pendingOrders, completedOrders, pendingAmount }) => {
  const cardData = [
      { title: "Reminder Orders", value: pendingOrders, icon: <HourglassFullIcon />, color: "#F44336", },
      { title: "Pending Amount", value: `₹${pendingAmount}`, icon: <CurrencyRupeeIcon />, color: "#2196F3" },
      { title: "Completed Orders", value: completedOrders, icon: <CheckCircleIcon />, color: "#4CAF50" },
      { title: "Pending Orders", value: totalOrders, icon: <ShoppingCartIcon />, color: "#FF9800" },
  ];

  return (
    
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {cardData.map((card, index) => (
        <Grid item xs={6} sm={3} key={index}>
          <Card sx={{ backgroundColor: card.color, color: "#fff", textAlign: "center" }}>
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
      <CountUp start={0} end={card.value} duration={2} />
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
