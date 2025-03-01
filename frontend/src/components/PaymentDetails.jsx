import React, { useState } from "react";
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
import { setFilterOptions } from "../redux/orderSlice";


const PaymentDetailsPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.paymentFilterOptions.filterOptions);

  
  const handleFilterChange = (e) => {
    dispatch(setFilterOptions({ ...filters, [e.target.name]: e.target.value }));
  }
  
  const toggleFilter = () => setFilterOpen(!filterOpen);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const paymentHistory = [
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
        amount: "1500",
        orderStatus: "Pending",
        reminderDays: 3,
      advanceAmount:500,

    },
    {
      name: "Priya",
      phone: "9123456789",
      orderDate: "2024-02-18",
      deliveryDate: "2025-02-29",
      paymentStatus: "Paid",
      orderStatus: "Completed",
      dressPhoto: "/images/dress1.jpg",
        voiceNote: "/audio/voice1.mp3",
      amount: 2500,
      withLining: false,
      modelBlouseGiven: true,
      advanceAmount:500,

    },
    {
      name: "Sneha",
      phone: "9988776655",
      orderDate: "2024-02-17",
      deliveryDate: "2024-02-29",
      paymentStatus: "Advance",
      dressPhoto: "/images/dress1.jpg",
      voiceNote: "/audio/voice1.mp3",
      orderStatus: "Pending",
      amount: 1800,
      advanceAmount:500,
      withLining: true,
      modelBlouseGiven: false,
    },
    {
      name: "Sneha",
      phone: "9988776655",
      orderDate: "2024-02-15",
      deliveryDate: "2024-02-30",
      paymentStatus: "Advance",
      dressPhoto: "/images/dress1.jpg",
      voiceNote: "/audio/voice1.mp3",
      orderStatus: "Pending",
      amount: 1800,
      advanceAmount:500,
      withLining: true,
      modelBlouseGiven: false,
    },
  ];

  const paymentStats = {
    total: 1500,
    pending: 300,
    completed: 500,
    advance: 700,
  };

  const filteredPayments = paymentHistory.filter((payment) => {
    const matchesSearchTerm = payment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = filters.date ? payment.orderDate === filters.date : true;
    const matchesStatus = filters.status ? payment.paymentStatus.toLowerCase() === filters.status.toLowerCase() : true;

    return matchesSearchTerm && matchesDate && matchesStatus;
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
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>${paymentStats.total}</Typography>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="subtitle1">Pending </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "orange" }}>${paymentStats.pending}</Typography>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="subtitle1">Completed </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "green" }}>${paymentStats.completed}</Typography>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="subtitle1">Advance </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "blue" }}>${paymentStats.advance}</Typography>
          </Card>
        </Grid>
      </Grid>

    

      {/* Right Sidebar for Filters */}
      <Drawer anchor="right" open={filterOpen} onClose={toggleFilter}>
        <div style={{ width: 250, padding: 16 }}>
          <h3>Filters</h3>
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
            select
            label="Payment Status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="advance">Advance</MenuItem>
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
  <Typography variant="h6" textAlign={"center"} style={{margin:"8px"}}>Payment Status</Typography>
   <Divider />
        <CardContent style={{padding:1}}>
          {filteredPayments.length > 0 ? (
            <List>
              {filteredPayments.map((payment) => (
                <ListItem style={{display:"flex",justifyContent:'space-between'}} key={payment.id} sx={{ mb: 1, p: 1.5, borderBottom: "1px solid #ddd" }}>
                  <Box>
                    <Typography fontWeight="bold" color="text.primary">
                      {payment.name} - ₹{payment.amount}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarTodayIcon fontSize="small" color="action" />
                      <Typography color="text.secondary">Delivery : {payment.deliveryDate}</Typography>
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
            <Typography color="textSecondary" textAlign="center" sx={{ mt: 2 }}>
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
    <BarChart data={paymentHistory}>
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
      <Bar dataKey="amount" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
</Card>
    </div>
  );
};

export default PaymentDetailsPage;