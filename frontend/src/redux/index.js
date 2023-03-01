import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:"",
    token:"",
    activeChat:"",
    lastFourtiesMssg:[]
}

export const appSlice = createSlice({
    name:"app",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload.user
        },
        setLogin:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setActiveChat:(state,action)=>{
            state.activeChat = action.payload.friendId;
        },
        setLastFourtiesMssg:(state,action)=>{
            state.lastFourtiesMssg = action.payload.messages
        }
    }
})

export const {setUser,setLogin,setActiveChat,setLastFourtiesMssg} = appSlice.actions;
export default appSlice.reducer;