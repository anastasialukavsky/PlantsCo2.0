import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Homepage } from './index';

export default function Main() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}
