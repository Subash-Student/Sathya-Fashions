import { Card,Box,Divider, Typography, Chip, Stack ,IconButton} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {useNavigate} from 'react-router-dom'
import ReadMoreIcon from '@mui/icons-material/ReadMore';

 
const Reminders = ({ orders }) => {

    const navigate = useNavigate()


  // Filter upcoming due orders
  const today = new Date();
const upcomingOrders = orders
  .filter(order => {
    const deliveryDate = new Date(order.deliveryDate);
    const reminderDate = new Date(order.reminderDate);
    
    return (
      deliveryDate >= reminderDate && 
      reminderDate.toDateString() === today.toDateString()
    );
  })
  .sort((a, b) => new Date(a.deliveryDate) - new Date(b.deliveryDate));



  return (
    <Card sx={{ mt: 2, p: 1,boxShadow: 2 }} >
     
     <Stack direction="row" justifyContent="space-between" alignItems="center">
     <Typography variant="h6" fontWeight="bold" color="red">⏰ Today Reminders</Typography>
        <IconButton onClick={()=>navigate("/orders")}>
          <ReadMoreIcon />
        </IconButton>
      </Stack>

      {/* <Box m={1} display="flex" alignItems="center">
                <Box flexGrow={1}>
                  <Divider />
                </Box>
                <Box px={2}>
                  <Typography variant="body2" color="textSecondary">
                    Today
                  </Typography>
                </Box>
                <Box flexGrow={1}>
                  <Divider />
                </Box>
              </Box> */}
      
      {upcomingOrders.length > 0 ? (
        upcomingOrders.map(order => {
          const deliveryDate = new Date(order.deliveryDate);
          const daysLeft = Math.ceil((deliveryDate - today) / (1000 * 60 * 60 * 24));

          let chipColor = "default";
          let chipIcon = <AccessTimeIcon />;
          let chipLabel = `${daysLeft} Days Left`;

          if (daysLeft === 0) {
            chipColor = "error";
            chipIcon = <WarningIcon />;
            chipLabel = "Due Today!";
          } else if (daysLeft <= 3) {
            chipColor = "warning";
          } else if (daysLeft > 3) {
            chipColor = "success";
            chipIcon = <CheckCircleIcon />;
          }

          return (
            <Card onClick={()=>navigate(`/order/${order.order_id}`)} key={order.order_id} sx={{ mt: 2, p: 1.5, bgcolor: "#f9f9f9" }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography fontWeight="bold">{order.customerName}</Typography>
                <Chip icon={chipIcon} label={chipLabel} color={chipColor} />
              </Stack>
            </Card>
          );
        })
      ) : (
        <Typography color="textSecondary" textAlign="center" sx={{ mt: 2 }}>
          No upcoming orders.
        </Typography>
      )}
    </Card>
  );
};

export default Reminders;
