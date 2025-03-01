
import {useNavigate} from "react-router-dom"
import {
  Card, Typography, Grid, IconButton,
  Box, Divider, Stack
} from "@mui/material";

import ReadMoreIcon from '@mui/icons-material/ReadMore';
import MoreVertIcon from "@mui/icons-material/MoreVert";

const RecentOrders = ({ orders }) => {
  

  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 2, px: 0,boxShadow:2 }}>
     

     <Stack sx={{ m: 0,p:2,pb:0 }} direction="row" justifyContent="space-between" alignItems="center">
     <Typography color="primary" variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
      📋  Recent Orders
      </Typography>
        <IconButton onClick={()=>navigate("/orders")}>
          <ReadMoreIcon />
        </IconButton>
      </Stack>

     

      {orders.map((order, index) => (
         <Grid item xs={12} key={order.id}>
         <Card  sx={{ p: 2.5, borderRadius: 0, boxShadow: 0, position: "relative" }}>
           {/* Three-dot icon */}
           <IconButton
             sx={{ position: "absolute", top: 8, right: 8 }}
            //  onClick={(e) => handleMenuClick(e, order)}
           >
             <MoreVertIcon />
           </IconButton>

           <Typography onClick={()=>navigate(`/order/${order.id}`)} fontWeight="bold">#{order.id} - {order.name}</Typography>
           <Typography variant="body2">📅 {order.orderDate} → 📦 {order.deliveryDate}</Typography>
           <Typography variant="body2">
             💰 ₹{order.amount} |{" "}
             {order.paymentStatus === "Paid"
               ? `💵 ${order.paymentStatus}`
               : order.paymentStatus === "Advance"
               ? `🏷️ ${order.paymentStatus}`
               : `❌ ${order.paymentStatus}`}
           </Typography>
           <Typography variant="body2">
             {order.orderStatus === "Completed"
               ? `✅ ${order.orderStatus}`
               : `🕒 ${order.orderStatus}`}
           </Typography>
         </Card>
         <Divider />
       </Grid>
      ))}
    </Box>
  );
};

export default RecentOrders;
