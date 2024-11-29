import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveUser, removeUser } = loginSlice.actions;

export default loginSlice.reducer;
