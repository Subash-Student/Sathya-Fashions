import { Card, Box, Typography, IconButton, Stack, Chip ,Divider} from "@mui/material";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { fetchOrders } from "../redux/orderSlice";
import {  useSelector,useDispatch } from "react-redux";
import { keyframes } from "@emotion/react";

const ReminderOrders = () => {

    const orders = useSelector((state)=>state.orders.orders);
   const token = useSelector((state) => state.token.token);

  const dispatch = useDispatch();

  // useEffect(()=>{
  //       dispatch(fetchOrders(token));
  // },[])


  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const filteredOrders = orders
    .filter((order) => {
      const reminderDate = new Date(order.reminderDate);
      return reminderDate.toDateString() === selectedDate.toDateString();
    })
    .sort((a, b) => new Date(a.deliveryDate) - new Date(b.deliveryDate));

    const breathing = keyframes`
    0% { transform: scale(0.8); }
    50% { transform: scale(1); }
    100% { transform: scale(0.8); }
  `;

  return (
    <Card sx={{ mt: 0, p: 2, boxShadow: 2,height:"700px" }}>
        <Typography mb={2} variant="h5" textAlign="center" color="red" sx={{ fontWeight: "bold", mt: 2 }}>
        🚨 Today Reminder Orders
      </Typography>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <IconButton onClick={() => handleDateChange(-1)}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold">
          {selectedDate.toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year:"numeric"
                      })}
        </Typography>
        <IconButton onClick={() => handleDateChange(1)}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
      
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order,index) => {
          const deliveryDate = new Date(order.deliveryDate);
          const daysLeft = Math.ceil((deliveryDate - selectedDate) / (1000 * 60 * 60 * 24));

          let chipColor = "default";
          let chipIcon = <AccessTimeIcon />;
          let chipLabel = `${daysLeft} Days Left`;

          if (daysLeft === 0) {
            chipColor = "error";
            chipIcon = <WarningIcon />;
            chipLabel = "Due Today!";
          } else if (daysLeft <= 3) {
            chipColor = "warning";
          } else {
            chipColor = "success";
            chipIcon = <CheckCircleIcon />;
          }

          return (
            <div >
            <Card style={{boxShadow:"none"}} onClick={() => navigate(`/order/${order.order_id}`)} key={order.order_id} sx={{ mt: 1, p: 1.5, bgcolor: "#ffffff" }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Stack direction="row" alignItems="center" spacing={3}>
                  <Typography
                  style={{
                    border:"1px solid red",
                    backgroundColor: "white",
                    color: "white",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": { backgroundColor: "darkred" }
                  }}
                  position={"relative"}
                  top={"10px"}
            onClick={(event) => {
              event.stopPropagation(); 
              window.location.href = `tel:${order.phone}`;
            }}
            sx={{ animation: `${breathing} 2s infinite ease-in-out`, cursor: "pointer" }}
            variant="body2"
            color="text.secondary"
          >
            📞
          </Typography>
                    <Typography ml={5} fontWeight="bold">{order.customerName}</Typography>
                  </Stack>
                  <Typography ml={7} variant="body2" color="textSecondary">
                    {deliveryDate.toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year:"numeric"
                      })}
                  </Typography>
                </Box>
                <Chip icon={chipIcon} label={chipLabel} color={chipColor} />
              </Stack>
              
            </Card>
             <Divider />
            </div>
            
          );
        })
      ) : (
        <Typography color="textSecondary" textAlign="center" sx={{ m: 4 }}>
          No orders for this date.
        </Typography>
      )}
    </Card>
  );
};

export default ReminderOrders;
