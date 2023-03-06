import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  // doesn't really merge DB + user cart the way I want yet...
  let dbCart = [];
  let localCart = [];
  let userId = null;
  let res;

  // pull cart info from database (if we have a token)
  const token = localStorage.getItem('token');

  if (token) {
    res = await axios.get(`/api/auth`, {
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
  let simpleCart = {};

  for (let product of [...dbCart, ...localCart]) {
    if (Object.hasOwn(simpleCart, product.productId)) {
      if (userId !== null) product.userId = userId;
      simpleCart[product.productId] = Math.max(
        product.qty,
        simpleCart[product.productId]
      );
    } else simpleCart[product.productId] = product.qty;
  }

  simpleCart = Object.keys(simpleCart).map((key) => {
    return { userId, productId: parseInt(key), qty: simpleCart[key] };
  });

  // resulting cart object (identical to backend response):
  // { userId, productId, qty }
  window.localStorage.setItem('cart', JSON.stringify(simpleCart));
  if (userId !== null && token) {
    await axios.post(
      `/api/users/${userId}/cart`,
      { cart: simpleCart },
      {
        headers: { authorization: token },
      }
    );
  }

  // use simplified / merged cart to request expanded cart (product detail + qty)
  res = await axios.post('/api/products/cart', simpleCart);
  const expandedCart = res.data;

  return { simpleCart, expandedCart };
});

export const addOneToCart = createAsyncThunk(
  'cart/addOneToCart',
  async (productId) => {
    if (typeof productId === 'string') productId = parseInt(productId);

    const token = localStorage.getItem('token');
    let userId = null;

    if (token) {
      res = await axios.get(`/api/auth`, {
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
    }

    return localCart;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    expandedCart: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, { payload }) => {
      state.cart = payload.simpleCart;
      state.expandedCart = payload.expandedCart;
    });
    builder.addCase(addOneToCart.fulfilled, (state, { payload }) => {
      state.cart = payload.simpleCart;
      state.expandedCart = payload.expandedCart;
    });
  },
});

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
