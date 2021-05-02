import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { items, shipping, languages } from './data';

import 'tailwindcss/tailwind.css';

ReactDOM.render(
  <React.StrictMode>
    <App
      initialItems={items}
      languageOptions={languages}
      shippingOptions={shipping}
      defaultLanguage={languages[0].code}
      defaultShippingOption={shipping[0].label}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
