import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardMedia, Stack, Divider, Chip, IconButton } from "@mui/material";
import {  Edit, CalendarToday,  AccessTime } from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';
import {
   CheckCircle, 
  
} from "@mui/icons-material";
const orders = [
  {
    id: "1",
    name: "John Doe",
    phone: "9876543210",
    orderDate: "2025-02-15",
    deliveryDate: "2025-02-28",
    dressPhoto: "/images/dress1.jpg",
    voiceNote: "/audio/voice1.mp3",
    modelBlouseGiven: true,
    paymentStatus: "Pending",
    withLining: true,
    advanceAmount:500,
    amount: "1500",
    orderStatus: "Processing",
    reminderDays: 3,
  },
  {
    id: "12345",
    phone: "9876543210",
    name: "John Doe",
    orderDate: "2024-02-12",
    deliveryDate: "2024-02-15",
    amount: 2500,
    orderStatus: "Completed",
    paymentStatus: "Paid",
    reminderDays: 3,

  },
  {
    id: "12346",
    name: "Jane Smith",
    orderDate: "2024-02-14",
    deliveryDate: "2024-02-20",
    amount: 1800,
    orderStatus: "In Progress",
    paymentStatus: "Pending",
    phone: "9876543210",
    reminderDays: 3,

  },
  {
    id: "12347",
    name: "Alice Johnson",
    orderDate: "2024-02-10",
    deliveryDate: "2024-02-18",
    amount: 3000,
    orderStatus: "Completed",
    paymentStatus: "Advance",
    phone: "9876543210",
    reminderDays: 3,

  },
];

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = orders.find((order) => order.id === id);

  if (!order) return <Typography>Order Not Found</Typography>;

  return (
    <Box sx={{ p: 3, background: "#f9f9f9", minHeight: "100vh" }}>
      {/* Header with Back Button & Edit Icon */}
      

      {/* Order Details Header */}
      <Typography variant="h5" textAlign="center" sx={{ fontWeight: "bold", mt: 2 }}>
        🛍️ Order Details
      </Typography>

      {/* Order Info Card */}
      <Card sx={{ p: 3, mt: 3, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <div>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          {order.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          📞 {order.phone}
        </Typography>
        </div>
        <IconButton color="primary" onClick={() => navigate(`/edit-order/${id}`)}>
          <Edit />
        </IconButton>
      </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Order Details Section */}
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarToday color="primary" />
            <Typography variant="body1">Order Date: {order.orderDate}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarToday color="secondary" />
            <Typography variant="body1">Delivery Date: {order.deliveryDate}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1">💵 Amount: ₹{order.amount}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1">💴 Advance: ₹{order.advanceAmount}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1">🔲 With Lining: </Typography>
            <Chip label={order.withLining ? "Yes" : "No"} color={order.withLining ? "success" : "error"} />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1">👗 Model Blouse Given:</Typography>
            <Chip label={order.modelBlouseGiven ? "Yes" : "No"} color={order.modelBlouseGiven ? "success" : "error"} />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1">⏳ Order Status:</Typography>
            <Chip label={order.orderStatus} color="primary" />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1">⏰ Reminder Before:</Typography>
            <Chip label={`${order.reminderDays} days`} color="warning" />
          </Stack>

          {/* Payment Status */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1">Payment Status:</Typography>
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
        </Stack>
      </Card>

      {/* Dress Photo */}
      <Card sx={{ mt: 3, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <CardMedia
          component="img"
          height="300"
          image={order.dressPhoto}
          alt="Dress"
          sx={{ borderRadius: "12px 12px 0 0" }}
        />
      </Card>

      {/* Voice Note */}
      <Card sx={{ mt: 3, p: 2, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Typography variant="h6">🎤  Voice Note</Typography>
        <audio controls src={order.voiceNote} style={{ width: "100%", marginTop: "10px" }} />
      </Card>
    </Box>
  );
};

export default OrderDetails;
