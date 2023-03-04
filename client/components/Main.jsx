import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import store from '../store';
import { Homepage, AllProducts, SingleProduct, NavBar, Login } from './index';

export default function Main() {
  return (
    <>
      <div className="font-fraunces text-primary-deep-green">
        <Provider store={store}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
          </Routes>
        </Provider>
      </div>
    </>
  );
}
