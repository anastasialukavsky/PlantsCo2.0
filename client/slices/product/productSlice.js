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
  async () => {
    const { data } = await axios.get(`/api/products`);
    return data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const {} = productSlice.actions;

export const selectAllProducts = (state) => state.products.products;

export default productSlice.reducer;
