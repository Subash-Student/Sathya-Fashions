
import {useNavigate} from "react-router-dom"
import {
  Card, Typography, Grid, IconButton,
  Box, Divider, Stack
} from "@mui/material";

import ReadMoreIcon from '@mui/icons-material/ReadMore';
import {  useDispatch } from "react-redux";
import { setOrderFilterOptions } from "../redux/orderSlice";

const RecentOrders = ({ orders ,handleNavigation}) => {
  

  const navigate = useNavigate();
 const dispatch = useDispatch();

 const handleNavigate = ()=>{

  dispatch(setOrderFilterOptions({
    date: "",
    status: "",
    paymentStatus: "",
    sort: "Latest", 
  }))
   navigate("/orders")
 }

  return (
    <Box sx={{ mt: 2, px: 0,boxShadow:2 }}>
     

     <Stack sx={{ m: 0,p:2,pb:0 }} direction="row" justifyContent="space-between" alignItems="center">
     <Typography color="primary" variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
      📋  Recent Orders
      </Typography>
        <IconButton onClick={handleNavigate}>
          <ReadMoreIcon />
        </IconButton>
      </Stack>

     

      {orders.length > 0 ? orders.slice(0,5).map((order, index) => (
         <Grid item xs={12} key={order.order_id}>
         <Card  sx={{ p: 2.5, borderRadius: 0, boxShadow: 0, position: "relative" }}>
           {/* Three-dot icon */}
           

           <Typography onClick={()=>navigate(`/order/${order.order_id}`)} fontWeight="bold">#{order.order_id} - {order.customerName}</Typography>
           <Typography variant="body2">🗓️ {order.orderDate} → 📦 {order.deliveryDate}</Typography>
           <Typography variant="body2">
                💰 ₹{order.totalAmount} |{' '}
                {order.paymentStatus === 'Paid'
                  ? `💵 ${order.paymentStatus}`
                  : order.paymentStatus ==='Advance'
                  ? `🏷️ ${order.paymentStatus}`
                  : `🕒 ${order.paymentStatus}`}
              </Typography>
              <Typography variant="body2">
              {order.orderStatus ==='Completed'
                  ? `✅ ${order.orderStatus}`
                  : order.orderStatus === 'Pending' ?`🕒 ${order.orderStatus}`:`❌ ${order.orderStatus}`}
                  
              </Typography>
         </Card>
         <Divider />
       </Grid>
      )):
      (
        <Typography color="textSecondary" textAlign="center" sx={{ p: 5 }}>
          No Recent Orders.
        </Typography>
      )
      }
    </Box>
  );
};

export default RecentOrders;
