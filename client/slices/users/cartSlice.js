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

    // VVV use this one instead if we need to keep cart info bulky
    // const cartData = res.data.products;

    // const userCartDataSimple = cartData.map((product) => {
    //   return product.cart;
    // });
    // ^^^
  }

  // check for cart in localStorage (even if logged in)

  // VVV use this one

  // what does the localstorage cart look like?
  // what if we generate a user ID for *every* guest so we're always working with DB objects?
  // gigantic fkn pain in the ass - lots of backend rework
  // what if the localstorage cart was the same as userCartDataSimple?
  // how do we look up product images / names / prices given product ID?
  // can we just send little requests to /api/product/:productId to collect info?
  // maybe build a route off of cart to take in an array of prodIds?
  // could serve both logged-in and guest users

  // {prodId: qty}

  // merge db cart & localstorage cart
  // {
  //   productId,
  //   qty
  // }

  // localCart looks like [{productId, qty}] (may also include userId)
  localCart = localStorage.getItem('cart') || [];

  // dummy data for testing
  const cartData = [
    {
      userId: 1,
      productId: 3,
      qty: 4,
    },
    {
      userId: 1,
      productId: 2,
      qty: 1,
    },
    {
      userId: 1,
      productId: 6,
      qty: 2,
    },
  ];

  localCart = [
    {
      productId: 2,
      qty: 4,
    },
    {
      productId: 6,
      qty: 1,
    },
    {
      productId: 12,
      qty: 14,
    },
  ];

  console.log('db cart data:', dbCart);
  console.log('localstorage cart data', localCart);

  // create hash of product IDs & quantities from both carts
  // larger number wins
  let mergedCart = {};

  for (let product of [...dbCart, ...localCart]) {
    if (Object.hasOwn(mergedCart, product.productId)) {
      mergedCart[product.productId] = Math.max(
        product.qty,
        mergedCart[product.productId]
      );
    } else mergedCart[product.productId] = product.qty;
  }

  mergedCart = Object.keys(mergedCart).map((key) => {
    return { userId, productId: +key, qty: mergedCart[key] };
  });

  // resulting cart object (identical to backend response):
  // {
  //   userId,
  //   productId,
  //   qty
  // }
  return mergedCart;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    cartSimple: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, { payload }) => {
      state.cart = payload;
    });
  },
});

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
