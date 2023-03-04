import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  singleProduct: {},
  error: '',
  status: '',
  similarPage: 0,
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
      state.similarPage = 0;
    },
    similarPageChange(state, { payload }) {
      if (payload[0] === 'next')
        state.similarPage = Math.min(payload[1] - 5, state.similarPage + 4);
      if (payload === 'previous')
        state.similarPage = Math.max(0, state.similarPage - 4);
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

export const { resetStatusError, similarPageChange } = productSlice.actions;

export const selectAllProducts = (state) => state.products.products;
export const selectSingleProduct = (state) => state.products.singleProduct;
export const selectStatus = (state) => state.products.status;
export const selectSimilarPage = (state) => state.products.similarPage;

// Selects all products that have a matching tag to current product
export const selectSimilar = (state) => {
  const allProducts = state.products.products;
  const currentProd = state.products.singleProduct;
  const currentProdTags = currentProd.tags?.map(({ tagName }) => tagName);

  return allProducts.filter((product) => {
    return (
      product?.tags.some(({ tagName }) => currentProdTags?.includes(tagName)) &&
      product?.id !== currentProd.id
    );
  });
};

export default productSlice.reducer;
