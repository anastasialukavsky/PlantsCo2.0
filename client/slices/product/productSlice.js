import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  singleProduct: {},
  error: '',
  status: '',
};

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (x, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetStatusError(state) {
      state.status = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = 'success';
      state.error = '';
    });
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.status = 'failed';
      console.log('failed payload', action.payload);
      state.error = action.error.message;
    });
  },
});

export const { resetStatusError } = productSlice.actions;

export const selectAllProducts = (state) => state.products.products;
export const selectStatus = (state) => state.products.status;

export default productSlice.reducer;
