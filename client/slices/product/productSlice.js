import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  singleProduct: {},
  filterBy: [],
  searchBy: '',
  error: '',
  loading: false,
  status: '',
  similarPage: 0,
  productPage: 0,
  useSearch: false,
};

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
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
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      return data;
    } catch (err) {
      console.log('axios error getting all users');
      return rejectWithValue(err);
    }
  }
);

export const editSingleProduct = createAsyncThunk(
  'editProduct',
  async ({ productId, updates, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/products/${productId}`, updates, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.log('axios error updating single product');
      return rejectWithValue(error);
    }
  }
);

export const addProduct = createAsyncThunk(
  'addProduct',
  async ({ token, newProduct }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/products`, newProduct, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.log('axios error adding new product');
      return rejectWithValue(error);
    }
  }
);

export const deleteSingleProduct = createAsyncThunk(
  'deleteProduct',
  async ({ productId, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/products/${productId}`, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.log('axios error updating single product');
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
        state.similarPage = Math.min(payload[1] - 4, state.similarPage + 4);
      if (payload === 'previous')
        state.similarPage = Math.max(0, state.similarPage - 4);
    },
    productPageChange(state, { payload }) {
      if (payload[0] === 'next')
        state.productPage = Math.min(payload[1] - 8, state.productPage + 8);
      if (payload === 'previous')
        state.productPage = Math.max(0, state.productPage - 8);
    },
    adjustFilter(state, { payload }) {
      state.productPage = 0;
      if (payload) state.filterBy = [payload];
      // If it's an empty string set filter to blank
      else state.filterBy = [];
      // set useSearch to false
      state.useSearch = false;
      state.searchBy = '';
    },
    adjustSort(state, { payload }) {
      state.products.sort((a, b) => {
        if (payload === 'price') {
          return +a[payload] > +b[payload]
            ? 1
            : +a[payload] < +b[payload]
            ? -1
            : 0;
        }
        return a[payload] > b[payload] ? 1 : a[payload] < b[payload] ? -1 : 0;
      });
    },
    adjustSearchBy(state, { payload }) {
      state.searchBy = payload || '';
      state.useSearch = true;
      state.filterBy = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = 'success';
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = 'success';
        state.error = '';
        state.singleProduct = action.payload;
      })
      .addCase(editSingleProduct.fulfilled, (state, { payload }) => {
        state.singleProduct = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(editSingleProduct.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(editSingleProduct.rejected, (state, { payload }) => {
        state.status = 'failed';
        console.log('failed payload', payload);
        state.error = payload.message;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.singleProduct = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(addProduct.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.status = 'failed';
        console.log('failed payload', payload);
        state.error = payload.message;
      })
      .addCase(deleteSingleProduct.fulfilled, (state, { payload }) => {
        state.singleProduct = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(deleteSingleProduct.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(deleteSingleProduct.rejected, (state, { payload }) => {
        state.status = 'failed';
        console.log('failed payload', payload);
        state.error = payload.message;
      });
  },
});

export const {
  resetStatusError,
  similarPageChange,
  productPageChange,
  adjustFilter,
  adjustSort,
  adjustSearchBy,
} = productSlice.actions;

export const selectAllProducts = (state) => state.products.products;
export const selectSingleProduct = (state) => state.products.singleProduct;
export const selectProductStatus = (state) => state.products.status;
export const selectProductLoading = (state) => state.products.loading;
export const selectFilterBy = (state) => state.products.filterBy;
// Page for scrolling through similar items
export const selectSimilarPage = (state) => state.products.similarPage;
// Page for scrolling through ALL products page
export const selectProductPage = (state) => state.products.productPage;

export const selectSearchBy = (state) => state.products.searchBy;

export const selectUseSearch = (state) => state.products.useSearch;

export const selectFilteredProducts = (state) => {
  const allProducts = state.products.products;
  if (state.products.filterBy.length === 0) return allProducts;
  return allProducts.filter((product) => {
    return product.tags.some(({ tagName }) => {
      return state.products.filterBy.includes(tagName);
    });
  });
};

export const selectSearchedItems = (state) => {
  const allProducts = state.products.products;
  return allProducts.filter((product) => {
    return (
      product?.name.toLowerCase().includes(state.products.searchBy) ||
      product?.tags.some(({ tagName }) =>
        tagName.toLowerCase().includes(state.products.searchBy?.toLowerCase())
      )
    );
  });
};

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
