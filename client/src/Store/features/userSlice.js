import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{
        userId:''
    },
   
   reducers:{
    setUserId:(state,action)=>{
        state.userId=action.payload;
     }
   }

})

export default userSlice.reducer;

export const {setUserId}=userSlice.actions;