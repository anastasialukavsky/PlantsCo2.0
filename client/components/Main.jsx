import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import {
  Homepage,
  AllProducts,
  SingleProduct,
  NavBar,
  Login,
  UserAccount,
  Cart,
  EditProfile,
  OrderHistory,
} from './index';
import { selectAuth, attemptTokenLogin } from '../slices/users/authSlice';

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(attemptTokenLogin());
  }, []);

  const { auth } = useSelector(selectAuth);

  return (
    <>
      <div className="font-fraunces text-primary-deep-green">
        <NavBar auth={auth} />
        <Cart />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/account" element={<UserAccount />} />
          <Route path="/account/editprofile" element={<EditProfile />} />
          <Route path="/account/orderhistory" element={<OrderHistory />} />
        </Routes>
      </div>
    </>
  );
}
