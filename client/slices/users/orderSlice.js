import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const orderSlice = createSlice({
  name: 'orders',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = orderSlice.actions;
export const selectOrders = (state) => state.orders;

export default orderSlice.reducer;
