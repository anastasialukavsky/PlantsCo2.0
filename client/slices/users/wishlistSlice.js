import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  wishlist: [],
};

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async () => {
    let res;
    let userId;

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
      const { data } = await axios.get(`/api/users/${userId}/wishlists`, {
        headers: { authorization: token },
      });
      return data;
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWishlist.fulfilled, (state, { payload }) => {
      state.wishlist = payload;
    });
    builder.addCase(fetchWishlist.rejected, (state, action) => {
      console.log(action.error);
    });
  },
});

export const selectWishlist = (state) => state.wishlist.wishlist;

export const {} = wishlistSlice.actions;

export default wishlistSlice.reducer;
