import { useState,useEffect } from "react";
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
import axios from "axios";
import {toast} from "react-toastify"
import {
  Modal,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ReceiptIcon from "@mui/icons-material/Receipt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useNavigate} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import { fetchOrders, setOrderFilterOptions } from "../redux/orderSlice";
import RefreshIcon from '@mui/icons-material/Refresh'
import { hideLoader, showLoader } from "../redux/loaderSlice";

const OrderList = () => {
  
  const token = useSelector((state) => state.token.token);

 const dispatch = useDispatch()

//   useEffect(()=>{
//     dispatch(fetchOrders(token));
// },[token,dispatch])

  const orders = useSelector((state)=>state.orders.orders);
 
  const filters = useSelector((state)=>state.ordersFilterOptions.filterOptions)

  const navigate = useNavigate()
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [orderStatus, setOrderStatus] = useState("Pending");
 const [orderId,setOrderId] = useState();
  

  const handleFilterChange = (e) => {
    dispatch(setOrderFilterOptions({ ...filters, [e.target.name]: e.target.value }));
  };

  const toggleFilter = () => setFilterOpen(!filterOpen);



  // Filter and sort orders
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        String(order.order_id).includes(search) || order.customerName.toLowerCase().includes(search.toLowerCase());
      const matchesDate = filters.date ? new Date(order.orderDate).toISOString().split('T')[0] === filters.date : true;
      const matchesStatus = filters.status
        ? order.orderStatus.toLowerCase() === filters.status.toLowerCase()
        : true;
      const matchesPaymentStatus = filters.paymentStatus
        ? order.paymentStatus.toLowerCase() === filters.paymentStatus.toLowerCase()
        : true;

      return matchesSearch && matchesDate && matchesStatus && matchesPaymentStatus;
    })
    .sort((a, b) => {
      if (filters.sort === "Latest") {
        return new Date(b.orderDate) - new Date(a.orderDate); // Sort by latest
      } else if(filters.sort === "oldest"){
        return new Date(a.orderDate) - new Date(b.orderDate); // Sort by oldest
      }else{
        return new Date(b.orderDate) - new Date(a.orderDate); // Sort by latest

      }
    });

 
    const handleMenuOpen = (event,order) => {
      setAnchorEl(event.currentTarget);
      setOrderId(order.order_id);
      setPaymentStatus(order.paymentStatus);
      setOrderStatus(order.orderStatus);
    };
  
    const handleMenuClose = () => {
     
      setAnchorEl(null);
    };
  
    const handleOpenModal = () => {
      setOpenModal(true);
      handleMenuClose();
    };
  
    const handleCloseModal = () => {
      setOrderId("");
      setPaymentStatus("Pending");
      setOrderStatus("Pending");
      setOpenModal(false);
      setAnchorEl(null);

    };
  
    const handleSave = async (e) => {
      e.preventDefault();
      
      const formData = new FormData();
      formData.append("order_id", orderId);
      formData.append("paymentStatus", paymentStatus);
      formData.append("orderStatus", orderStatus);
    
      
    
      try {
      dispatch(showLoader()); // Show Loader before request

        const response = await axios.post("https://sathya-fashions-backend.vercel.app/order/update-status", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", 
            token
          }
        });
        dispatch(hideLoader()); // Show Loader before request
    
        if (response.data.success) {
          toast.success(response.data.message);
          dispatch(fetchOrders(token));
          handleCloseModal();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    
    
  
let prevDate;

const handleResetFilters = () => {
  dispatch(setOrderFilterOptions({
    date: '',
    status: '',
    paymentStatus: '',
    sort: 'latest'
  }));
};

const handleDelete = async(id)=>{
  
  try {
    dispatch(showLoader()); // Show Loader before request
    
    const responsee = await axios.delete(`https://sathya-fashions-backend.vercel.app/order/delete/${id}`,{
      withCredentials: true,
      headers: {
        token
      }
    },);
    dispatch(hideLoader()); // Show Loader before request

    if(responsee.data.success){
      toast.success(responsee.data.message);
      dispatch(fetchOrders(token));
      handleCloseModal();

    }else{
      toast.info(responsee.data.message);
    }

  } catch (error) {
     console.log(error)
     toast.error(error.message);
  }
  

}


  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 0.5, p: 0, borderRadius: 2, boxShadow: 3 }}>
      <Typography p={1} variant="h5" fontWeight="bold" textAlign="center">
        <ReceiptIcon sx={{ color: "#4CAF50", verticalAlign: "middle", mr: 1, paddingBottom: "5px", }} />
        {filters.status !== "" && filters.sort !=="" ? `Filterd Orders` : filters.status ===""?`${filters.sort} Orders`:`${filters.status} Orders`}
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
          <Grid item xs={12} key={order.order_id}>
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
                onClick={(e) => handleMenuOpen(e, order)}
              >
                <MoreVertIcon />
              </IconButton>

              <Typography onClick={() => navigate(`/order/${order.order_id}`)} fontWeight="bold">
                #{order.order_id} - {order.customerName}
              </Typography>
              <Typography variant="body2">
              🗓️ {order.orderDate} → 📦 {order.deliveryDate}
              </Typography>
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
          </Grid>
        );
      })}
    </Grid>

    <div>
      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ "& .MuiPaper-root": { width: 150 } }}
      >
        <MenuItem onClick={handleOpenModal}>Change Status</MenuItem>
        <MenuItem onClick={()=>navigate(`/newOrder/${orderId}`)}>Edit</MenuItem>
        <MenuItem onClick={()=>handleDelete(orderId)} sx={{ color: "error.main" }}>Delete</MenuItem>
      </Menu>

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            width: 320,
            textAlign: "center",
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Change Status</Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Payment Status Toggle */}
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Payment Status
          </Typography>
          <ToggleButtonGroup
  value={paymentStatus}
  exclusive
  onChange={(e, newStatus) => newStatus && setPaymentStatus(newStatus)}
  sx={{ display: "flex", justifyContent: "center", mb: 2 }}
>
  <ToggleButton
    value="Paid"
    selected={paymentStatus === "Paid"}
    sx={{
      width: "130px",
      color: "white",
      backgroundColor: paymentStatus === "paid" ? "green" : "grey.400",
      "&:hover": { backgroundColor: paymentStatus === "paid" ? "darkgreen" : "grey.500" },
      "&.Mui-selected": { backgroundColor: "green", color: "white", "&:hover": { backgroundColor: "darkgreen" } }
    }}
  >
    Paid
  </ToggleButton>

  <ToggleButton
    value="Pending"
    selected={paymentStatus === "Pending"}
    sx={{
      width: "130px",
      color: "white",
      backgroundColor: paymentStatus === "pending" ? "orange" : "grey.400",
      "&:hover": { backgroundColor: paymentStatus === "pending" ? "darkorange" : "grey.500" },
      "&.Mui-selected": { backgroundColor: "orange", color: "white", "&:hover": { backgroundColor: "darkorange" } }
    }}
  >
    Pending
  </ToggleButton>

  <ToggleButton
    value="Advance"
    selected={paymentStatus === "Advance"}
    sx={{
      width: "130px",
      color: "white",
      backgroundColor: paymentStatus === "advance" ? "blue" : "grey.400",
      "&:hover": { backgroundColor: paymentStatus === "advance" ? "darkblue" : "grey.500" },
      "&.Mui-selected": { backgroundColor: "blue", color: "white", "&:hover": { backgroundColor: "darkblue" } }
    }}
  >
    Advance
  </ToggleButton>
</ToggleButtonGroup>



          {/* Order Status Toggle */}
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Order Status
          </Typography>
          <ToggleButtonGroup
  value={orderStatus}
  exclusive
  onChange={(e, newStatus) => newStatus && setOrderStatus(newStatus)}
  sx={{ display: "flex", justifyContent: "center", mb: 2 }}
>
  <ToggleButton
    value="Pending"
    selected={orderStatus === "Pending"}
    sx={{
      width: "130px",
      color: "white",
      backgroundColor: orderStatus === "pending" ? "orange" : "grey.400",
      "&:hover": { backgroundColor: orderStatus === "pending" ? "darkorange" : "grey.500" },
      "&.Mui-selected": { backgroundColor: "orange", color: "white", "&:hover": { backgroundColor: "darkorange" } }
    }}
  >
    Pending
  </ToggleButton>

  <ToggleButton
    value="Completed"
    selected={orderStatus === "Completed"}
    sx={{
      width: "130px",
      color: "white",
      backgroundColor: orderStatus === "completed" ? "green" : "grey.400",
      "&:hover": { backgroundColor: orderStatus === "completed" ? "darkgreen" : "grey.500" },
      "&.Mui-selected": { backgroundColor: "green", color: "white", "&:hover": { backgroundColor: "darkgreen" } }
    }}
  >
    Completed
  </ToggleButton>

  <ToggleButton
    value="Cancelled"
    selected={orderStatus === "Cancelled"}
    sx={{
      width: "130px",
      color: "white",
      backgroundColor: orderStatus === "cancelled" ? "red" : "grey.400",
      "&:hover": { backgroundColor: orderStatus === "cancelled" ? "darkred" : "grey.500" },
      "&.Mui-selected": { backgroundColor: "red", color: "white", "&:hover": { backgroundColor: "darkred" } }
    }}
  >
    Cancelled
  </ToggleButton>
</ToggleButtonGroup>


          {/* Save Button */}
          <Button
          onClick={handleSave}
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: "1rem",
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
      </CardContent>
    </Card>
  );
};

export default OrderList;