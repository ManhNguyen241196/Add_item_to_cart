import { createSlice, configureStore } from "@reduxjs/toolkit"; //khai báo Slice vì sẽ dùng theo phương pháp chia slic
import cartSlice from "./cart-slice";
import uiSlice from "./UI-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
