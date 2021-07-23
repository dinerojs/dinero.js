import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { items, shipping, currencies } from './data';

import 'tailwindcss/tailwind.css';

ReactDOM.render(
  <React.StrictMode>
    <App
      initialItems={items}
      currencyOptions={currencies}
      shippingOptions={shipping}
      defaultCurrencyCode={currencies[0].currency}
      defaultShippingOption={shipping[0].label}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
