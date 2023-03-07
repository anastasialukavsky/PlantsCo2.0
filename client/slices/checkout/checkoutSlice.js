import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkout = createAsyncThunk(
  'orders/checkout',
  //expecting name as firstName && lastName
  //expecting address as per shiping info (street1, street2, city, state, zip)
  async ({ name, address, userEmail, promoCode }, { rejectWithValue }) => {
    try {
      const cart = window.localStorage.getItem('cart');
      if (!cart) return;

      const token = localStorage.getItem('token');

      let userId = null;
      let currencyId = 1;

      if (token) {
        let res = await axios.get(`/api/auth`, {
          headers: {
            authorization: token,
          },
        });
        userId = res.data.id;
        currencyId = res.data.currencyId || 1;
      }

      const orderPayload = {
        name,
        address,
        userEmail,
        promoCode,
        cart,
        userId,
        currencyId,
      };

      if (userId) orderPayload.userId = userId;

      const { data: order } = await axios.post('/api/orders', orderPayload);

      let res = await axios.post('/api/orders/checkout', order);

      return res.data;
    } catch (err) {
      console.log('axios checkout error');
      return rejectWithValue(err);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/update',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/orders/${orderId}`, { status });
      return data;
    } catch (err) {
      console.log('error updating order status');
      return rejectWithValue(err);
    }
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    checkout: '',
    order: {},
    status: '',
    error: '',
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkout.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(checkout.fulfilled, (state, { payload }) => {
        if (!payload) return;
        state.status = 'success';
        state.checkout = payload;
        state.error = '';
      })
      .addCase(checkout.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(updateOrderStatus.fulfilled, (state, { payload }) => {
        state.order = payload;
        state.status = 'success';
        state.error = '';
      });
  },
});

export const selectCheckout = (state) => state.checkout;
export default checkoutSlice.reducer;
