import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import {
  Homepage,
  AllProducts,
  SingleProduct,
  NavBar,
  Login,
  LoggedInNavBar,
} from './index';
import { selectAuth } from '../slices/users/authSlice';

export default function Main() {
  const { status } = useSelector(selectAuth);
  const { auth } = useSelector(selectAuth);

  return (
    <>
      <div className="font-fraunces text-primary-deep-green">
        {status ? <LoggedInNavBar auth={auth} /> : <NavBar />}

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
        </Routes>
      </div>
    </>
  );
}
