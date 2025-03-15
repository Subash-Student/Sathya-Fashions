import { Card, CardContent, Typography, List, ListItem, Box, Stack, IconButton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import {useNavigate} from "react-router-dom"
import {
  CheckCircle, 
 
} from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';
import PendingActionsIcon from '@mui/icons-material/PendingActions'

const PendingAmountList = ({ orders,handleNavigation }) => {

  const pendingOrders = orders.filter(order => order.paymentStatus === "Pending" || order.paymentStatus === "Advance" );
  
 const navigate = useNavigate()
  return (
    <Card sx={{ mt: 2, p: 1.5,boxShadow:2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold" color="#ebb400" textAlign="left">
          💰 Pending Payments
        </Typography>
        <IconButton onClick={()=>handleNavigation("PaymentDetails","Pending")}>
          <ReadMoreIcon />
        </IconButton>
      </Stack>
      <CardContent>
        {pendingOrders.length > 0 ? (
          <List>
            {pendingOrders.map((order, index) => (
              <ListItem style={{display:"flex",justifyContent:'space-between'}} key={index} sx={{ mb: 1, p: 1, borderBottom: "1px solid #ddd" }}>
                <Box>
                  <Typography onClick={()=>navigate(`/order/${order.order_id}`)} fontWeight="bold" color="text.primary">
                    {order.customerName} - ₹{order.advanceAmount > 0 ? order.totalAmount - order.advanceAmount : order.totalAmount}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarTodayIcon fontSize="small" color="action" />
                    <Typography color="text.secondary">Deliveried: {order.deliveryDate}</Typography>
                  </Stack>
                </Box>
                {order.paymentStatus === "Paid" ? (
                    <CheckCircle color="success" />
                  ) :order.paymentStatus === "Advance" ?(
                    <PendingActionsIcon sx={{ color:"#f2ba04" }} />
                  ):(
                    <CancelIcon color="error" />
                  )}
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="textSecondary" textAlign="center" sx={{ mt: 2 }}>
            No pending payments.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PendingAmountList;
