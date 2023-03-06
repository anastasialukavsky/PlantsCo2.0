import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  // doesn't really merge DB + user cart the way I want yet...
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
    userId = +res.data.id;

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

  // create hash of product IDs & quantities from both carts
  // larger number wins
  let mergedCart = {};

  for (let product of [...dbCart, ...localCart]) {
    if (Object.hasOwn(mergedCart, product.productId)) {
      if (userId !== null) product.userId = userId;
      mergedCart[product.productId] = Math.max(
        product.qty,
        mergedCart[product.productId]
      );
    } else mergedCart[product.productId] = product.qty;
  }

  mergedCart = Object.keys(mergedCart).map((key) => {
    return { userId, productId: parseInt(key), qty: mergedCart[key] };
  });

  // resulting cart object (identical to backend response):
  // { userId, productId, qty }
  window.localStorage.setItem('cart', JSON.stringify(mergedCart));
  await axios.post('/');
  return mergedCart;
});

export const addOneToCart = createAsyncThunk(
  'cart/addOneToCart',
  async (productId) => {
    if (typeof productId === 'string') productId = parseInt(productId);

    const token = localStorage.getItem('token');
    let userId = null;

    if (token) {
      let res = await axios.get(`/api/auth`, {
        headers: {
          authorization: token,
        },
      });

      // extract userId from token response
      userId = res.data.id;
    }

    let localCart = JSON.parse(window.localStorage.getItem('cart')) || [];

    // iterate over cart items -- if same item already exists, iterate
    let found = false;
    let newQty = 1;
    for (let line of localCart) {
      if (line.productId === productId) {
        line.qty = line.qty + 1;
        newQty = line.qty;
        found = true;
        break;
      }
    }

    // if we never found the item in the cart, add it
    if (!found) localCart.push({ productId, userId, qty: 1 });

    window.localStorage.setItem('cart', JSON.stringify(localCart));

    // if there was a token (and a user ID), use it to update DB cart
    // send product ID & new qty (pulled from above) to PUT route
    if (token) {
      const updateObject = { productId, qty: newQty };
      const { data } = await axios.put(
        `/api/users/${userId}/cart`,
        updateObject,
        {
          headers: { authorization: token },
        }
      );
      console.log('result of PUT request:', data);
    }

    return localCart;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, { payload }) => {
      state.cart = payload;
    });
    builder.addCase(addOneToCart.fulfilled, (state, { payload }) => {
      state.cart = payload;
    });
  },
});

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
