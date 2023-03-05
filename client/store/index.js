import { configureStore } from '@reduxjs/toolkit';
import usersSlice from '../slices/users/userSlice';
import productSlice from '../slices/product/productSlice';
import authSlice from '../slices/users/authSlice';
import cartSlice from '../slices/users/cartSlice';

const store = configureStore({
  reducer: {
    users: usersSlice,
    products: productSlice,
    auth: authSlice,
    cart: cartSlice,
  },
});

export default store;
