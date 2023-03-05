import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  let dbCart = [];
  let localCart = [];
  let userId = null;

  // pull cart info from database (if we have a token)
  const token = localStorage.getItem('token');

  if (token) {
    let res = await axios.get(`/api/auth`, {
      headers: {
        authorization: token,
      },
    });

    // extract userId from token response
    userId = res.data.id;

    // request cart from db
    // expect response to be shaped as [{userId, productId, qty}]
    const { data } = await axios.get(`/api/users/${userId}/cart`, {
      headers: { authorization: token },
    });

    dbCart = data;
  }

  // pull cart from localStorage (even if we're logged in)
  // localCart looks like [{productId, qty}] (may also include userId)
  localCart = JSON.parse(localStorage.getItem('cart')) || [];

  console.log('db cart data:', dbCart);
  console.log('localstorage cart data', localCart);

  // create hash of product IDs & quantities from both carts
  // larger number wins
  let mergedCart = {};

  for (let product of [...dbCart, ...localCart]) {
    console.log('product:', product);
    if (Object.hasOwn(mergedCart, product.productId)) {
      mergedCart[product.productId] = Math.max(
        product.qty,
        mergedCart[product.productId]
      );
    } else mergedCart[product.productId] = product.qty;
  }
  console.log('mergedCart:', mergedCart);

  mergedCart = Object.keys(mergedCart).map((key) => {
    return { userId, productId: +key, qty: mergedCart[key] };
  });

  // resulting cart object (identical to backend response):
  // { userId, productId, qty }
  return mergedCart;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, { payload }) => {
      state.cart = payload;
    });
  },
});

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
