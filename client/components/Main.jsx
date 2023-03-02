import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import store from '../store';
import { Homepage } from './index';

export default function Main() {
  return (
    <div>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Provider>
    </div>
  );
}
