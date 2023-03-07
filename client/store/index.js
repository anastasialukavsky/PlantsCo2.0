import { configureStore } from '@reduxjs/toolkit';
import usersSlice from '../slices/users/userSlice';
import productSlice from '../slices/product/productSlice';
import authSlice from '../slices/users/authSlice';
import orderSlice from '../slices/users/orderSlice';
import cartSlice from '../slices/users/cartSlice';
import wishlistSlice from '../slices/users/wishlistSlice';

const store = configureStore({
  reducer: {
    users: usersSlice,
    products: productSlice,
    auth: authSlice,
    orders: orderSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
  },
});

export default store;
