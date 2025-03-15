import { Card,Box,Divider, Typography, Chip, Stack ,IconButton} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {useNavigate} from 'react-router-dom'
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { keyframes } from "@emotion/react";

 
const Reminders = ({ orders  }) => {

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

  const breathing = keyframes`
  0% { transform: scale(0.8); }
  50% { transform: scale(1); }
  100% { transform: scale(0.8); }
`;

  return (
    <Card sx={{ mt: 2, p: 1,boxShadow: 2 }} >
     
     <Stack direction="row" justifyContent="space-between" alignItems="center">
     <Typography variant="h6" fontWeight="bold" color="red">⏰ Today Reminders</Typography>
        <IconButton onClick={()=>navigate("/reminderOrders")}>
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
      
      {upcomingOrders.lenght > 0 ? upcomingOrders.map((order, index) => {
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
    <div key={order.order_id} >
      <Card
        key={order.order_id}
        style={{ boxShadow: "none" }}
        onClick={() => navigate(`/order/${order.order_id}`)}
        sx={{ mt: 0, p: 1.5, bgcolor: "#ffffff" }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Stack direction="row" alignItems="center" spacing={3}>
              {/* Call Button */}
              <Typography
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
                }}
                position={"relative"}
                top={"10px"}
                onClick={(event) => {
                  event.stopPropagation();
                  window.location.href = `tel:${order.phone}`;
                }}
                sx={{ animation: `${breathing} 2s infinite ease-in-out` }}
                variant="body2"
              >
                📞
              </Typography>

              {/* Customer Name */}
              <Typography ml={5} fontWeight="bold">{order.customerName}</Typography>
            </Stack>

            {/* Delivery Date */}
            <Typography ml={7} variant="body2" color="textSecondary">
              {deliveryDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Typography>
          </Box>

          {/* Status Chip */}
          <Chip icon={chipIcon} label={chipLabel} color={chipColor} />
        </Stack>
      </Card>

      {/* Divider (Not for Last Order) */}
      {index !== upcomingOrders.length - 1 && <Divider />}
    </div>
  );
}):  
(
  <Typography color="textSecondary" textAlign="center" sx={{ m: 5 }}>
    No Reminder Orders Today.
  </Typography>
)
}

    </Card>
  );
};

export default Reminders;
