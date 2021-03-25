import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { dineroUSD } from './utils';

import 'tailwindcss/tailwind.css';

const initialItems = [
  {
    name: 'Apple iPhone 12',
    image:
      'https://images-na.ssl-images-amazon.com/images/I/71ZOtNdaZCL._AC_SX679_.jpg',
    brand: 'Apple',
    price: dineroUSD(89900),
    amount: 1,
  },
  {
    name: 'Apple AirPods Pro',
    image:
      'https://images-na.ssl-images-amazon.com/images/I/71lj9Fdeq0L._AC_SX679_.jpg',
    brand: 'Apple',
    price: dineroUSD(17495),
    amount: 1,
  },
  {
    name: 'Apple Lightning to USB-C Cable',
    image:
      'https://images-na.ssl-images-amazon.com/images/I/41%2B7SQNld6L._AC_SX679_.jpg',
    brand: 'Apple',
    price: dineroUSD(1700),
    amount: 2,
  },
];

ReactDOM.render(
  <React.StrictMode>
    <App initialItems={initialItems} />
  </React.StrictMode>,
  document.getElementById('root')
);
