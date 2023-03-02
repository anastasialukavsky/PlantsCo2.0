import { configureStore } from '@reduxjs/toolkit';
import usersSlice from '../slices/users/userSlice';
import productSlice from '../slices/product/productSlice';

const store = configureStore({
  reducer: {
    users: usersSlice,
    products: productSlice,
  },
});

export default store;
