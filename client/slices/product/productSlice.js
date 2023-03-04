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

export const fetchSingleProduct = createAsyncThunk(
  'products/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
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
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.status = 'success';
      state.error = '';
      state.singleProduct = action.payload;
    });
  },
});

export const { resetStatusError } = productSlice.actions;

export const selectAllProducts = (state) => state.products.products;
export const selectSingleProduct = (state) => state.products.singleProduct;
export const selectStatus = (state) => state.products.status;
export const selectSimilar = (state) => {
  const allProducts = state.products.products;
  const currentProd = state.products.singleProduct;
  const currentProdTags = currentProd.tags?.map(({ tagName }) => tagName);

  return allProducts.filter((product) => {
    return product?.tags.some(({ tagName }) =>
      currentProdTags?.includes(tagName)
    );
  });
};

export default productSlice.reducer;
