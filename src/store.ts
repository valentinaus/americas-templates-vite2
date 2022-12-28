import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./contexts/slices/auth";
import messageReducer from "./contexts/slices/message";

const reducer = {
  auth: authReducer,
  message: messageReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
