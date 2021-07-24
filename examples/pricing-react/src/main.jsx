import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { items } from './data';

import 'tailwindcss/tailwind.css';

ReactDOM.render(
  <React.StrictMode>
    <App items={items} />
  </React.StrictMode>,
  document.getElementById('root')
);
