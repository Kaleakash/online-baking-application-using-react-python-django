import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../slice/userSlice';
import transactionSlice from "../slice/transactionSlice";
import customerSlice from "../slice/customerSlice";


const store = configureStore({
  reducer: {
    userKey: userSlice,
    transactionKey:transactionSlice,
    customerKey:customerSlice
  },
});

export default store;