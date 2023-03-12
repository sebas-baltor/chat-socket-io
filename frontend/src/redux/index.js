import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "",
  activeChat: "",
  findedPeople: [],
  lastFourtiesMssg: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setFriendsAndRequest:(state,action)=>{
        state.user.request = action.payload.request;
        state.user.friends = action.payload.friends;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload.friendId;
    },
    setLastFourtiesMssg: (state, action) => {
      state.lastFourtiesMssg = action.payload.messages;
    },
    setFindedPeople: (state, action) => {
      state.findedPeople = action.payload.matches;
    },
    closeSession: (state) => {
      state.user = "";
      state.token = "";
      state.activeChat = "";
      state.findedPeople = [];
      state.lastFourtiesMssg = [];
    },
  },
});

export const {
  setUser,
  setLogin,
  setActiveChat,
  setLastFourtiesMssg,
  setFindedPeople,
  setFriendsAndRequest,
  closeSession
} = appSlice.actions;
export default appSlice.reducer;
