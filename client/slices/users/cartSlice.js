import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
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
    let res;

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

    res = await axios.post('/api/products/cart', localCart);
    const expandedCart = res.data;

    return { localCart, expandedCart };
  }
);

export const removeOneFromCart = createAsyncThunk(
  'cart/removeOneFromCart',
  async (productId) => {
    if (typeof productId === 'string') productId = parseInt(productId);
    let res;

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

    // iterate over cart items -- if same item already exists, decrement (or delete if qty === 1)
    // if the item wasn't in the cart to begin with, act like nothing happened
    let newQty = 0;
    let found;

    for (let cartItem of localCart) {
      if (cartItem.productId === productId) {
        cartItem.qty = cartItem.qty - 1;
        newQty = cartItem.qty;
        found = true;
        break;
      }
    }

    if (!found) return; // exit early without hitting db / resetting localstorage

    // remove zero qty lines
    console.log('localCart before filter', localCart);
    localCart = localCart.filter((cartItem) => cartItem.qty > 0);
    console.log('localCart after filter', localCart);
    window.localStorage.setItem('cart', JSON.stringify(localCart));

    // if there was a token (and a user ID), use it to update DB cart
    // send product ID & new qty (pulled from above) to PUT route
    // backend PUT will delete row if qty === 0

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

    res = await axios.post('/api/products/cart', localCart);
    const expandedCart = res.data;

    return { localCart, expandedCart };
  }
);

export const removeCartRow = createAsyncThunk(
  'cart/removeCartRow',
  async (productId) => {
    if (typeof productId === 'string') productId = parseInt(productId);
    let res;

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

    localCart = localCart.filter((cartRow) => cartRow.productId !== productId);

    res = await axios.post('/api/products/cart', localCart);
    const expandedCart = res.data;

    window.localStorage.setItem('cart', JSON.stringify(localCart));

    if (userId !== null && token) {
      await axios.post(
        `/api/users/${userId}/cart`,
        { cart: localCart },
        {
          headers: { authorization: token },
        }
      );
    }

    return { localCart, expandedCart };
  }
);

const purgeCart = createAsyncThunk('cart/purgeCart', async () => {
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

  if (userId !== null) {
    await axios.delete(
      `/api/users/${userId}/cart`,
      { action: 'purge' },
      {
        headers: { authorization: token },
      }
    );
  }

  window.localStorage.setItem('cart', JSON.stringify([]));

  return;
});

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
      state.cart = payload.localCart;
      state.expandedCart = payload.expandedCart;
    });
    builder.addCase(removeOneFromCart.fulfilled, (state, { payload }) => {
      if (!payload) return; // thunk will return null if nothing to remove
      state.cart = payload.localCart;
      state.expandedCart = payload.expandedCart;
    });
    builder.addCase(removeCartRow.fulfilled, (state, { payload }) => {
      if (!payload) return; // thunk will return null if nothing to remove
      state.cart = payload.localCart;
      state.expandedCart = payload.expandedCart;
    });
    builder.addCase(purgeCart.fulfilled, (state, { payload }) => {
      state.cart = [];
      state.expandedCart = [];
    });
  },
});

export const selectCart = (state) => state.cart;
export const selectCartSubtotal = (state) =>
  state.cart.expandedCart.reduce(
    (acc, cv) => (acc += +cv.product.price * cv.qty),
    0
  );

export default cartSlice.reducer;
