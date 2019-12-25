import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { version } from '../package.json';
import { env } from './config';
import createStore from './redux/createStore';
import App from './app';

// Window Variables
// ------------------------------------
window.version = version;
window.env = env;

const store = createStore();


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
