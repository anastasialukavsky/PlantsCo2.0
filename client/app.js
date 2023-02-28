import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Main } from './components';

const container = document.querySelector('#root');
const Root = createRoot(container);
Root.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);
