import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlist: [],
};

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async () => {
    const token = localStorage.getItem('token');
    if (token) {
      res = await axios.get(`/api/auth`, {
        headers: {
          authorization: token,
        },
      });

      // extract userId from token response
      userId = +res.data.id;

      // request wishlist from db

      const { data } = await axios.get(`/api/users/${userId}/cart`, {
        headers: { authorization: token },
      });
      console.log('wishlist payload data', data);
      return data;
    } else {
      console.log('theres no token');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWishlist.fulfilled, (state, { payload }) => {
      state.wishlist = action.payload;
    });
  },
});

export const selectWishlist = (state) => state.wishlist.wishlist;

export const {} = wishlistSlice.actions;

export default wishlistSlice.reducer;
