import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import {
  Card, CardContent, Typography, Grid, IconButton,
  Box, Chip, Divider, Tooltip, Stack
} from "@mui/material";
import {
  AccessTime, CheckCircle, 
  AssignmentTurnedIn,  PendingActions
} from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';
import ReadMoreIcon from '@mui/icons-material/ReadMore';

const RecentOrders = ({ orders }) => {
  

  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 3, px: 2 }}>
     

     <Stack direction="row" justifyContent="space-between" alignItems="center">
     <Typography color="primary" variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
      📋  Recent Orders
      </Typography>
        <IconButton onClick={()=>navigate("/orders")}>
          <ReadMoreIcon />
        </IconButton>
      </Stack>

     

      {orders.map((order, index) => (
        <Card
        
          key={index}
          sx={{
            mb: 2,
            borderRadius: "12px",
            boxShadow: "0px 4px 4px rgba(0,0,0,0.15)",
            transition: "transform 0.2s ease-in-out",
            bgcolor: "#fff",
            "&:active": { transform: "scale(0.98)" } // Subtle press effect
          }}
          onClick={() => navigate(`/order/${order.id}`)}
        >
          <CardContent>
            <Grid container alignItems="center" spacing={2}>
              {/* Name & Phone */}
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {order.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {order.phone}
                </Typography>
              </Grid>

              {/* Order Status with Icons */}
              <Grid item xs={6} textAlign="right">
                <Tooltip title={order.orderStatus}>
                  <IconButton>
                    {order.orderStatus === "Pending" && <PendingActions sx={{ color: "#FFCC80" }} />}
                    {order.orderStatus === "Completed" && <AssignmentTurnedIn sx={{ color: "#4CAF50" }} />}
                   
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>

            {/* Payment Status & Delivery Info */}
            <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
              
              <Chip
                label={`Due: ${order.deliveryDate}`}
                color="primary"
                sx={{ fontWeight: "bold" }}
              />
              <Chip
                icon={
                  order.paymentStatus === "Pending" ? <CancelIcon color="white" /> :
                  order.paymentStatus === "Advance" ? <AccessTime color="white" /> :
                  <CheckCircle color="white" />
                }
                label={order.paymentStatus}
                sx={{
                  bgcolor:
                    order.paymentStatus === "Pending" ? "#FF5733" :
                    order.paymentStatus === "Advance" ? "#FFC107" :
                    "#0ea713",
                  color: "#fff9f9",
                  fontWeight: "bold",
                }}
              />
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default RecentOrders;
