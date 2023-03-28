import { createSlice } from "@reduxjs/toolkit"; //khai báo Slice vì sẽ dùng theo phương pháp chia slice

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
