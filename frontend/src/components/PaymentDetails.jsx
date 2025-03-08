import React, { useState,useEffect } from "react";
import {
  Drawer,
  IconButton,
  TextField,
  MenuItem,
  Divider,
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  ListItem,
  List,
  Box
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {CheckCircle, } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
  import CancelIcon from '@mui/icons-material/Cancel';
  import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { fetchOrders, setFilterOptions } from "../redux/orderSlice";
import RefreshIcon from '@mui/icons-material/Refresh'
import {useNavigate} from "react-router-dom"


const PaymentDetailsPage = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const orders = useSelector((state)=>state.orders.orders);
  const token = useSelector((state)=>state.token.token)

  // useEffect(()=>{
  //   dispatch(fetchOrders(token));
  // },[token,dispatch])

  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filters = useSelector((state) => state.paymentFilterOptions.filterOptions);

  
  const handleFilterChange = (e) => {
    dispatch(setFilterOptions({ ...filters, [e.target.name]: e.target.value }));
  }
  
  const handleResetFilters = ()=>{
    dispatch(setFilterOptions({date: "", status: "",sort:"latest"}))
  }
  

  const toggleFilter = () => setFilterOpen(!filterOpen);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  
  const paymentStats = {
    total: orders.reduce((sum,order)=> {sum+= order.totalAmount;return sum},0),
    pending: orders.reduce((sum,order)=> {order.paymentStatus === "Pending" ? sum+=order.totalAmount : order.paymentStatus === "Advance"? sum+=(order.totalAmount-order.advanceAmount):sum+=0; return sum;},0),
    advance: orders.reduce((sum,order)=>{order.paymentStatus === "Advance" ? sum+= order.advanceAmount :sum+=0;return sum},0),
  };


  const filteredPayments = orders.filter((payment) => {
    const matchesSearchTerm = payment.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = filters.date ? new Date(payment.orderDate).toISOString().split('T')[0] === filters.date : true;
    const matchesStatus = filters.status ? payment.paymentStatus.toLowerCase() === filters.status.toLowerCase() : true;

    return matchesSearchTerm && matchesDate && matchesStatus;
  }).sort((a, b) => {
      if (filters.sort === "Latest") {
        return new Date(b.orderDate) - new Date(a.orderDate); // Sort by latest
      } else if(filters.sort === "oldest"){
        return new Date(a.orderDate) - new Date(b.orderDate); // Sort by oldest
      }else{
        return new Date(b.orderDate) - new Date(a.orderDate); // Sort by latest

      }
    });

  return (
    <div>
      <Typography variant="h5" sx={{ textAlign: "center", mt: 1,p:2, fontWeight: "bold" }}>
      💵 Payment Details
      </Typography>

      <Grid container spacing={2} sx={{ padding: 0 }}>
        <Grid item xs={6} sm={3}>
          <Card sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="subtitle1">Total</Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>₹{paymentStats.total}</Typography>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="subtitle1">Pending </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "orange" }}>₹{paymentStats.pending}</Typography>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="subtitle1">Paid </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "green" }}>₹{paymentStats.total- paymentStats.pending}</Typography>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="subtitle1">Advance </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "blue" }}>₹{paymentStats.advance}</Typography>
          </Card>
        </Grid>
      </Grid>

    

      {/* Right Sidebar for Filters */}
      <Drawer anchor="right" open={filterOpen} onClose={toggleFilter}>
        <div style={{ width: 250, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h3>Filters</h3>
      <IconButton onClick={handleResetFilters}>
        <RefreshIcon />
      </IconButton>
    </div>
          <TextField
            label="Select Date"
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            sx={{ mb: 2 }}
            select
            label="Payment Status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Advance">Advance</MenuItem>
          </TextField>

          <TextField
            select
            label="Sort By"
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="Latest">Latest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
  
          </TextField>
         
        </div>
      </Drawer>

      {/* Payment History */}
      <Card sx={{ mt:1, padding: 1 }}>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <TextField
          variant="outlined"
          placeholder="Search payments..."
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: "gray", mr: 1 }} />,
          }}
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <IconButton onClick={toggleFilter} sx={{ ml: 1 }}>
          <FilterListIcon />
        </IconButton>
      </div>
  <Typography variant="h6" textAlign={"center"} style={{margin:"8px"}}>{filters.status !== "" && filters.sort !=="" ? `Filterd Payments` : filters.status ===""?`${filters.sort} Payments`:`${filters.status} Payments`}</Typography>
   <Divider />
        <CardContent style={{padding:1}}>
          {filteredPayments.length > 0 ? (
            <List>
              {filteredPayments.map((payment) => (
                <ListItem  style={{display:"flex",justifyContent:'space-between'}} key={payment.order_id} sx={{ mb: 1, p: 1.5, borderBottom: "1px solid #ddd" }}>
                  <Box>
                    <Typography onClick={()=>navigate(`/order/${payment.order_id}`)} fontWeight="bold" color="text.primary">
                      {payment.customerName} - ₹{payment.totalAmount}
                    </Typography>
                    {payment.paymentStatus === "Advance" && 
                    <Typography m={0.5} fontSize="small" color="text.secondary">{`Advance : ${payment.advanceAmount} | Remaining : ${payment.totalAmount - payment.advanceAmount}`}</Typography>
                    }
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarTodayIcon fontSize="15px" color="action" />
                      <Typography fontSize="13px" color="text.secondary">{payment.orderDate} →  {payment.deliveryDate}</Typography>
                    </Stack>
                  </Box>
                  {payment.paymentStatus === "Paid" ? (
                    <CheckCircle color="success" />
                  ) : (
                    <CancelIcon color="error" />
                  )}
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="textSecondary" m={5} textAlign="center" sx={{ mt: 2 }}>
              No payment records available.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Payment Analysis Chart */}
      <Card sx={{ m: 0,mt:1, p: 0.5 }}>
  <Typography variant="h6" textAlign="center" style={{margin:"10px"}}>Payment Analysis</Typography>
  <Divider />

  <ResponsiveContainer width="100%" style={{paddingTop:"15px"}} height={300}>
    {orders ?
      <BarChart data={orders}>
      <XAxis
        dataKey="deliveryDate"
        interval={0}
        tickFormatter={(date) => {
            // Format the date to show only "DD MMM" (e.g., "28 Feb")
            return new Date(date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            });
          }}
      />
      <YAxis />
      <Tooltip />
      <Bar dataKey="totalAmount" fill="#8884d8" />
    </BarChart> :
     <Typography color="textSecondary" m={5} textAlign="center" sx={{ mt: 2 }}>
     No payment records available.
   </Typography>}
  
  </ResponsiveContainer>
</Card>
    </div>
  );
};

export default PaymentDetailsPage;