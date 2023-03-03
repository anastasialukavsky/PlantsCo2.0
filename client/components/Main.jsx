import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import store from '../store';
import { Homepage, AllProducts, SingleProduct } from './index';

export default function Main() {
  return (
    <div>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
        </Routes>
      </Provider>
    </div>
  );
}
