import { useState,useEffect } from "react";
import { TextField, Button, Grid, Card, CardContent, Typography, IconButton, FormControlLabel, Checkbox, Radio, RadioGroup } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PhotoCamera, Mic, Delete } from "@mui/icons-material";
import { useReactMediaRecorder } from "react-media-recorder";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { keyframes } from "@emotion/react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios"
import {useSelector,useDispatch} from "react-redux"
import {toast } from "react-toastify"
import { useParams } from "react-router"
import { fetchOrders } from "../redux/orderSlice";
import dayjs from "dayjs";
import { hideLoader, showLoader } from "../redux/loaderSlice";


const NewOrder = () => {

  const token = useSelector((state) => state.token.token);
  const orders = useSelector((state)=>state.orders.orders);
 
  const dispatch = useDispatch()

//   useEffect(()=>{
//     dispatch(fetchOrders(token));
// },[token,dispatch])

  const params = useParams();
  const order_id = params.id;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    orderDate: null,
    deliveryDate: null,
    reminderDate: null,
    paymentStatus: "Pending",
    advanceAmount: "",
    image: null,
    audio: null,
    modelBlouse: false,
    lining: false,
    amount: 0,
    orderStatus: "Pending",
  });

const [audioBlob, setAudioBlob] = useState(null);
const [audioURL, setAudioURL] = useState(null);
const [imageFile,setImageFile] = useState(null);

useEffect(() => {
  if (order_id) {
    const order = orders.find((order) => order.order_id === Number(order_id));

    if (order) {
      setFormData((prevFormData) => ({
    name: order.customerName,
    phone: order.phone,
    orderDate: order.orderDate ? dayjs(order.orderDate) : null,
    deliveryDate: order.deliveryDate ? dayjs(order.deliveryDate) : null,
    reminderDate: order.reminderDate ? dayjs(order.reminderDate) : null,
    paymentStatus:order.paymentStatus,
    advanceAmount: order.advanceAmount,
    image: order.dressPhoto,
    audio: order.voiceNote,
    modelBlouse: order.modelDress,
    lining: order.withLining,
    amount: order.totalAmount,
    orderStatus: order.orderStatus,
      }));
      setAudioURL(order.voiceNote);
    }
  }
}, [order_id, orders]);


 

  const handleStop = (blobUrl, blob) => {
    setFormData({ ...formData, audio: audioBlob });
    setAudioURL(blobUrl); 
    setAudioBlob(blob);   
  };

  const { status, startRecording, stopRecording,clearBlobUrl } = useReactMediaRecorder({
    mediaRecorderOptions: { mimeType: "audio/webm" },
    onStop: handleStop, // Callback when recording stops
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    
    setFormData({ ...formData, [field]: value });
  };

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

 
  
  // Breathing animation for recording button
  const breathing = keyframes`
    0% { transform: scale(0.8); }
    50% { transform: scale(1); }
    100% { transform: scale(0.8); }
  `;
const fixDate = (date) => {
  const d = new Date(date);
  d.setHours(12, 0, 0, 0); // Set to noon to avoid timezone shifts
  return d.toISOString().split('T')[0];
};
  // Handle form submission
  const handleSubmit =async () => {
   
   
    const FORMDATA = new FormData();

    for (let key in formData) {
      if(key === "image")continue;
      if(key == "orderDate" || key == "reminderDate" || key == "deliveryDate"){
        FORMDATA.append(`${key}`,fixDate(formData[key].$d));
      }else{
        FORMDATA.append(`${key}`, formData[key]);
      }
    }
    
    !!audioBlob ? FORMDATA.append("audio",audioBlob):FORMDATA.append("audio",null);
    !!imageFile ? FORMDATA.append("image",imageFile):FORMDATA.append("image",null);

    !!order_id  && FORMDATA.append("order_id",order_id);
      
    
    
    
     try {
      dispatch(showLoader(true)); // Show Loader before request

      const response = await axios.post("https://sathya-fashions-backend.vercel.app/order/new-order",FORMDATA,{
        withCredentials:true,
          headers: {
            "Content-Type": "multipart/form-data", 
            token
          }
      });
      dispatch(hideLoader(true)); // Show Loader before request
 
      if(response.data.success){
             toast.success(response.data.message);
             if(!!order_id){
              dispatch(fetchOrders(token));
  
             }else{
                setFormData({
                  name: "",
                  phone: "",
                  orderDate: null,
                  deliveryDate: null,
                  reminderDate: null,
                  paymentStatus: "Pending",
                  advanceAmount: "",
                  image: null,
                  audio: null,
                  modelBlouse: false,
                  lining: false,
                  amount: 0,
                  orderStatus: "Pending",
                });
                setAudioBlob(null);
                setAudioURL(null)
             }
      }

     } catch (error) {
         console.log(error);
         toast.error("Failed to Add new Order")
     }
    
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card sx={{ maxWidth: 600, mx: "auto", mt: 0, p: 2, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
                
              <AddBoxIcon sx={{ color: "#4CAF50", verticalAlign: "middle", mr: 1, paddingBottom: "5px" }} />
              New Order
            </Typography>
            <Grid container spacing={2} mt={2}>
              {/* Customer Name */}
              <Grid item xs={6}>
                <Typography variant="subtitle1"mb={0.5} fontWeight="bold">Customer Name</Typography>
                <TextField
                  fullWidth
                
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </Grid>
              {/* Phone Number */}
              <Grid item xs={6}>
                <Typography variant="subtitle1" mb={0.5} fontWeight="bold">Phone Number</Typography>
                <TextField
                  fullWidth
                  
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </Grid>
              {/* Order Date */}
              <Grid item xs={6}>
                <Typography variant="subtitle1" fontWeight="bold">Order Date</Typography>
                <DatePicker
                  fullWidth
                  value={formData.orderDate}
                  onChange={(date) => handleInputChange("orderDate", date)}
                />
              </Grid>
              {/* Delivery Date */}
              <Grid item xs={6}>
                <Typography variant="subtitle1"mb={0.5} fontWeight="bold">Delivery Date</Typography>
                <DatePicker
                  fullWidth
                  value={formData.deliveryDate}
                  onChange={(date) => handleInputChange("deliveryDate", date)}
                />
              </Grid>
              {/* Reminder Date */}
              <Grid item xs={12}>
                <Typography variant="subtitle1"mb={0.5} fontWeight="bold">Reminder Date</Typography>
                <DatePicker
                  fullWidth
                  value={formData.reminderDate}
                  onChange={(date) => handleInputChange("reminderDate", date)}
                />
              </Grid>
              {/* Lining */}
              <Grid item xs={6}>
                <Typography variant="subtitle1" fontWeight="bold">Lining</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.lining}
                      onChange={(e) =>
                        handleInputChange("lining", e.target.checked ? true : false)
                      }
                    />
                  }
                  label="With Lining"
                />
              </Grid>
              {/* Model Blouse */}
              <Grid item xs={6}>
                <Typography variant="subtitle1" fontWeight="bold">Model Dress</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.modelBlouse}
                      onChange={(e) => handleInputChange("modelBlouse", e.target.checked)}
                    />
                  }
                  label="Model Blouse"
                />
              </Grid>
              {/* Payment Status */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">Payment Status</Typography>
                <RadioGroup
                  row
                  value={formData.paymentStatus}
                  onChange={(e) => handleInputChange("paymentStatus", e.target.value)}
                >
                  <FormControlLabel value="Paid" control={<Radio />} label="Paid" />
                  <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
                  <FormControlLabel value="Advance" control={<Radio />} label="Advance" />
                </RadioGroup>
              </Grid>
              
              {/* Amount */}
              <Grid item xs={6}>
                <Typography variant="subtitle1"mb={0.5} fontWeight="bold">Amount</Typography>
                <TextField
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                fullWidth
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                />
              </Grid>
              {/* Advance Amount (Conditional) */}
              {formData.paymentStatus === "Advance" && (
                <Grid item xs={6}>
                  <Typography variant="subtitle1"mb={0.5} fontWeight="bold">Advance Amount</Typography>
                  <TextField
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  fullWidth
                  value={formData.advanceAmount}
                  onChange={(e) => handleInputChange("advanceAmount", e.target.value)}
                  />
                </Grid>
              )}
              {/* Voice Note */}
              <Grid item xs={12} textAlign="center">
                <Typography variant="subtitle1" fontWeight="bold">Voice Note</Typography>
                <IconButton
                  sx={{
                    animation: status === "recording" ? `${breathing} 2s infinite ease-in-out` : "",
                  }}
                  style={{ color: "white", backgroundColor: status === "recording" ? "red" : "green" }}
                  onMouseDown={startRecording}
                  onMouseUp={stopRecording}
                >
                  <Mic fontSize="large" />
                </IconButton>
              </Grid>
              {/* Voice Note Preview */}
              {audioURL && (
                <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
                  <audio controls src={audioURL} style={{ marginRight: 8 }}></audio>
                  <IconButton color="error" onClick={clearBlobUrl}>
                    <Delete />
                  </IconButton>
                </Grid>
              )}
              {/* Upload Image */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">Upload Image</Typography>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <IconButton color="primary" component="span">
                    <PhotoCamera fontSize="large" />
                  </IconButton>
                </label>
                {formData.image && (
                  <img src={formData.image} alt="Preview" style={{ width: "100%", marginTop: 8, borderRadius: 8 }} />
                )}
              </Grid>
              {/* Submit Button */}
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
               {!!order_id ? "Update " : "Submit "}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </LocalizationProvider>
    </>
  );
};

export default NewOrder;