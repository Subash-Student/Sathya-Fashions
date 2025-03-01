import { useState } from "react";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
  Drawer,
  Menu,
  MenuItem,
  Select,
  FormControl,
  Divider,
  InputLabel,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ReceiptIcon from "@mui/icons-material/Receipt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useNavigate} from "react-router-dom"

const OrderList = () => {

  const navigate = useNavigate()

  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    date: "",
    status: "",
    paymentStatus: "",
    sort: "latest", // Added sort filter
  });

  // State for the three-dot menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const toggleFilter = () => setFilterOpen(!filterOpen);

  const orders = [
    {
      id: "12345",
      name: "John Doe",
      orderDate: "2024-02-12",
      deliveryDate: "2024-02-15",
      amount: 2500,
      orderStatus: "Completed",
      paymentStatus: "Paid",
      phone: "9876543210",

    },
    {
      id: "12346",
      name: "Jane Smith",
      orderDate: "2024-02-12",
      deliveryDate: "2024-02-20",
      amount: 1800,
      orderStatus: "Pending",
      paymentStatus: "Pending",
     phone: "9876543210",

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

    },
  ];

  // Filter and sort orders
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.id.includes(search) || order.name.toLowerCase().includes(search.toLowerCase());
      const matchesDate = filters.date ? order.orderDate === filters.date : true;
      const matchesStatus = filters.status
        ? order.orderStatus.toLowerCase() === filters.status.toLowerCase()
        : true;
      const matchesPaymentStatus = filters.paymentStatus
        ? order.paymentStatus.toLowerCase() === filters.paymentStatus.toLowerCase()
        : true;

      return matchesSearch && matchesDate && matchesStatus && matchesPaymentStatus;
    })
    .sort((a, b) => {
      if (filters.sort === "latest") {
        return new Date(b.orderDate) - new Date(a.orderDate); // Sort by latest
      } else {
        return new Date(a.orderDate) - new Date(b.orderDate); // Sort by oldest
      }
    });

  // Handle three-dot menu click
  const handleMenuClick = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  // Handle menu option selection
  const handleMenuOption = (option) => {
    console.log(`Selected option: ${option} for order:`, selectedOrder);
    handleMenuClose();
  };
let prevDate;

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 0.5, p: 0, borderRadius: 2, boxShadow: 3 }}>
      <Typography p={1} variant="h5" fontWeight="bold" textAlign="center">
        <ReceiptIcon sx={{ color: "#4CAF50", verticalAlign: "middle", mr: 1, paddingBottom: "5px", }} />
        Orders
      </Typography>
      <CardContent>
        <div>
          <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
            <TextField
              variant="outlined"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: "gray", mr: 1 }} />,
              }}
              fullWidth
            />
            <IconButton onClick={toggleFilter} sx={{ ml: 1 }}>
              <FilterListIcon />
            </IconButton>
          </div>

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
                label="Order Status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </TextField>
              <TextField
                select
                label="Payment Status"
                name="paymentStatus"
                value={filters.paymentStatus}
                onChange={handleFilterChange}
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="advance">Advance</MenuItem>
              </TextField>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                  label="Sort By"
                >
                  <MenuItem value="latest">Latest</MenuItem>
                  <MenuItem value="oldest">Oldest</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Drawer>
        </div>

 
        <Grid container spacing={0} mt={0}>
      {filteredOrders.map((order) => {
        const showDivider = prevDate !== order.orderDate;
        prevDate = order.orderDate;

        return (
          <Grid item xs={12} key={order.id}>
            {showDivider && (
              <Box m={1} display="flex" alignItems="center">
                <Box flexGrow={1}>
                  <Divider />
                </Box>
                <Box px={2}>
                  <Typography variant="body2" color="textSecondary">
                    {order.orderDate}
                  </Typography>
                </Box>
                <Box flexGrow={1}>
                  <Divider />
                </Box>
              </Box>
            )}
            <Card sx={{ p: 2, borderRadius: 0, boxShadow: 0, position: "relative" }}>
              <IconButton
                sx={{ position: "absolute", right: 8 }}
                onClick={(e) => handleMenuClick(e, order)}
              >
                <MoreVertIcon />
              </IconButton>

              <Typography onClick={() => navigate(`/order/${order.id}`)} fontWeight="bold">
                #{order.id} - {order.name}
              </Typography>
              <Typography variant="body2">
                📅 {order.orderDate} → 📦 {order.deliveryDate}
              </Typography>
              <Typography variant="body2">
                💰 ₹{order.amount} |{' '}
                {order.paymentStatus === 'Paid'
                  ? `💵 ${order.paymentStatus}`
                  : order.paymentStatus === 'Advance'
                  ? `🏷️ ${order.paymentStatus}`
                  : `❌ ${order.paymentStatus}`}
              </Typography>
              <Typography variant="body2">
                {order.orderStatus === 'Completed'
                  ? `✅ ${order.orderStatus}`
                  : `🕒 ${order.orderStatus}`}
              </Typography>
            </Card>
          </Grid>
        );
      })}
    </Grid>

        {/* Menu for three-dot options */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ "& .MuiPaper-root": { width: 150 } }} 
        >
          <MenuItem  onClick={() => handleMenuOption("Update Payment Status")}>
            Payment Status
          </MenuItem>
          <MenuItem onClick={() => handleMenuOption("Update Order Status")}>
            Order Status
          </MenuItem>
          <MenuItem onClick={() => handleMenuOption("Edit")}>Edit</MenuItem>
          <MenuItem onClick={() => handleMenuOption("Delete")} sx={{ color: "error.main" }}>
            Delete
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default OrderList;