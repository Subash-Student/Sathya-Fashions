import React, { useContext, useState } from 'react';
import { TextField, Button, Typography,Divider, Box, Alert, Link, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import {toast} from "react-toastify"
import { useDispatch } from "react-redux"
import { setToken } from '../redux/tokenSlice';

const LoginPage = () => {

  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobile: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    
      const response = await axios.post("http://localhost:5000/user/login",formData);
      if(response.data.success){
         dispatch(setToken(response.data.token));
         toast.success(response.data.message);
         navigate("/dashBoard")
      }else{
        console.log(response.data)
        setError(response.data.message)
      }

   } catch (error) {
     console.log(error);
   }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
        padding: 2,
      }}
    >
      
      <Paper
        elevation={6}
        sx={{
          maxWidth: 400,
          width: '100%',
          p: 4,
          borderRadius: 3,
          background: 'white',
          textAlign: 'center',
        }}
      >
         <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', display: 'flex',fontSize:"25px", alignItems: 'center' }}>
          <img 
            src="logo2.png" 
            alt="logo" 
            style={{ marginRight: 8, borderRadius: '50%', width: '50px' }}
          />
          Sathya Fashions
        </Typography>
        <Divider style={{ margin: '20px 0' }} />
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize:"15px",
            color: '#1976d2',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Mobile"
            name="mobile"
            type="number"
            value={formData.mobile}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              mb: 2,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #1976d2, #004ba0)',
              '&:hover': {
                background: 'linear-gradient(135deg, #004ba0, #1976d2)',
              },
            }}
          >
            Login
          </Button>
        </form>
       
      </Paper>
    </Box>
  );
};

export default LoginPage;