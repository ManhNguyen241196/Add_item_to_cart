import { createSlice } from "@reduxjs/toolkit"; //khai báo Slice vì sẽ dùng theo phương pháp chia slice

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        meassage: action.payload.meassage,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
