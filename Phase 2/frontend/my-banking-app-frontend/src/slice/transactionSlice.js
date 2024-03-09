import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const transactionState = {
  updateState: false,
  loading: false,
  transactionList: [],
  error: "",
  response: "",
};
export const findTransaction = createAsyncThunk(
  "customers/findTransactions",
  async () => {
    //const response = await axios.get("http://localhost:3000/transaction");
    const response = await axios.get("http://localhost:5000/api/transaction/findAllTransaction");
    //console.log(response.data)
    return response.data;
  }
);

export const transactionStore = createAsyncThunk(
  "customers/storeTransactions",
  async (transaction) => {
    console.log(transaction);
    //const response = await axios.post("http://localhost:3000/transaction",transaction);
    const response = await axios.post("http://localhost:5000/api/transaction/storeTransaction",transaction);
    return response.data;
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: transactionState,
  reducers: {
    changeStateTrue: (state) => {
      state.updateState = true;
    },
    changeStateFalse: (state) => {
      state.updateState = false;
    },
    clearResponse: (state) => {
      state.response = "";
    },
  },
  extraReducers: (builder) => {
  
    builder
      .addCase(findTransaction.fulfilled, (state, action) => {
        state.transactionList = action.payload;
      })
      .addCase(findTransaction.rejected, (state, action) => {
        state.error = action.error.message;
      });

      builder
      .addCase(transactionStore.fulfilled, (state, action) => {
        state.loading = false;
        //state.userList.push(action.payload);
        state.response = "added";
      })
      .addCase(transactionStore.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default transactionSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } = transactionSlice.actions;
