import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Main } from './components';
import { Provider } from 'react-redux';
import store from './store';

const container = document.querySelector('#root');
const Root = createRoot(container);
Root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </Provider>
);
