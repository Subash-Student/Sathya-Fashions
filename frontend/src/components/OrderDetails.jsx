import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardMedia, Stack, Divider, Chip, IconButton } from "@mui/material";
import {  Edit, CalendarToday,  AccessTime } from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';
import { keyframes } from "@emotion/react";
import {
   CheckCircle, 
  
} from "@mui/icons-material";
import {useSelector,useDispatch} from "react-redux"
import { fetchOrders } from "../redux/orderSlice";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token.token);

 const dispatch = useDispatch()

//   useEffect(()=>{
//     dispatch(fetchOrders(token));
// },[token,dispatch])

  const orders = useSelector((state)=>state.orders.orders);
  const order = orders.find((order) => order.order_id === Number(id));

  if (!order) return <Typography>Order Not Found</Typography>;

  const breathing = keyframes`
  0% { transform: scale(0.8); }
  50% { transform: scale(1); }
  100% { transform: scale(0.8); }
`;

  return (
    <Box sx={{ p: 1, background: "#f9f9f9", minHeight: "100vh" }}>
      {/* Header with Back Button & Edit Icon */}
      

      {/* Order Details Header */}
      <Typography variant="h5" textAlign="center" sx={{ fontWeight: "bold", mt: 2 }}>
        🛍️ Order Details
      </Typography>

      {/* Order Info Card */}
      <Card sx={{ p: 3, mt: 3, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <div>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0,marginLeft:"50px" }}>
          {order.customerName}
        </Typography>
      <Stack direction="row" alignItems="center" gap={2.5} justifyContent="space-between">

        <Typography
        onClick={(event) => {
          event.stopPropagation();
          window.location.href = `tel:${order.phone}`;
        }}
        style={{
                  border: "1px solid red",
                  backgroundColor: "white",
                  color: "white",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }} position={"relative"} top={"-10px"} sx={{animation:`${breathing} 2s infinite ease-in-out`}}variant="body2" color="text.secondary">
          📞 
        </Typography>
        <Typography  variant="body2" color="text.secondary">
           {order.phone}
        </Typography>
          </Stack>
        </div>
        <IconButton color="primary" onClick={() => navigate(`/newOrder/${order.order_id}`)}>
          <Edit />
        </IconButton>
      </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Order Details Section */}
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarToday color="primary" />
            <Typography variant="body1"><b style={{color:"#6c6b6b"}}>Order Date: </b> { new Date(order.orderDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year:"numeric"
            })}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarToday color="secondary" />
            <Typography variant="body1"><b style={{color:"#6c6b6b"}}>Delivery Date: </b>{ new Date(order.deliveryDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year:"numeric"
            })}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarToday color="yellow" />
            <Typography variant="body1"> <b style={{color:"#6c6b6b"}}>Reminder Date: </b>{ new Date(order.reminderDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year:"numeric"
            })}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1"><b style={{color:"#6c6b6b"}}>💵 Amount: ₹</b>{order.totalAmount}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1"><b style={{color:"#6c6b6b"}}>💴 Advance: ₹</b>{order.advanceAmount}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1"><b style={{color:"#6c6b6b"}}>🔲 With Lining: </b></Typography>
            <Chip label={order.withLining ? "Yes" : "No"} style={{color:"white",fontWeight:"bold",backgroundColor:`${order.withLining ?"#0ea713" : "#FF5733" }`}}  />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1"><b style={{color:"#6c6b6b"}}>👗 Model Dress Give</b></Typography>
            <Chip label={order.modelDress ? "Yes" : "No"} style={{color:"white",fontWeight:"bold",backgroundColor:`${order.modelDress ?"#0ea713" : "#FF5733" }`}} />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1"><b style={{color:"#6c6b6b"}}>⏳ Order Status:</b></Typography>
            <Chip label={order.orderStatus} style={{fontWeight:"bold",color:"white",backgroundColor:order.orderStatus === "Pending" ? "#FFC107" :order.orderStatus === "Advance" ? "#FF5733" : "#0ea713"}} />
          </Stack>

         

          {/* Payment Status */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1"><b style={{color:"#6c6b6b"}}>🤝 Payment Status:</b></Typography>
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
      {order.dressPhoto && 
      <Card sx={{ mt: 3, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <CardMedia
          component="img"
          height="300"
          image={order.dressPhoto}
          alt="Dress"
          sx={{ borderRadius: "12px 12px 0 0" }}
        />
      </Card>

      }

      {/* Voice Note */}
      {order.voiceNote &&
      <Card sx={{ mt: 3, p: 2, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Typography variant="h6">🎤  Voice Note</Typography>
        <audio controls src={order.voiceNote} style={{ width: "100%", marginTop: "10px" }} />
      </Card>
}
</Box>
  );
};

export default OrderDetails;
