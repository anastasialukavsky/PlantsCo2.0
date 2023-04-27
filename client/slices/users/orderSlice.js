import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllOrders = createAsyncThunk(
  'fetchAllOrders',
  async (x, { rejectWithValue }) => {
    try {
      let { data } = await axios.get(`/api/orders}`, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (err) {
      console.log('axios error getting all orders');
      return rejectWithValue(err);
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'fetchUserOrders',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      let { data } = await axios.get(`/api/users/${id}/orders`, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (err) {
      console.log('axios error getting user orders');
      return rejectWithValue(err);
    }
  }
);

export const fetchOrderDetails = createAsyncThunk(
  'fetchOrderDetails',
  async ({ userId, orderId, token }, { rejectWithValue }) => {
    try {
      let { data } = await axios.get(`/api/users/${userId}/orders/${orderId}`, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (err) {
      console.log('axios error getting user orders');
      return rejectWithValue(err);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    allOrders: [],
    order: [],
    orderDetails: [],
    status: '',
    error: '',
  },
  reducers: {
    resetStatus: (state) => {
      state.status = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.fulfilled, (state, { payload }) => {
        state.orders = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(fetchAllOrders.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrders.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(fetchUserOrders.fulfilled, (state, { payload }) => {
        state.order = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(fetchUserOrders.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(fetchUserOrders.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, { payload }) => {
        state.orderDetails = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(fetchOrderDetails.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderDetails.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      });
  },
});

export const { resetStatus } = orderSlice.actions;
export const selectOrders = (state) => state.orders;

export default orderSlice.reducer;
