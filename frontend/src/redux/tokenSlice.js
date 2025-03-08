import {createSlice} from "@reduxjs/toolkit";





const tokenSlice = createSlice({
    name:"token",
    initialState:{token:localStorage.getItem("token")|| null},
    reducers:{
        setToken:(state,action)=>{
            state.token = action.payload;
            localStorage.setItem("token",action.payload)
        }
    }
})


export const {setToken} = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;