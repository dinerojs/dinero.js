import { createApp } from 'vue';

import App from './App.vue';
import { items, shipping, currencies } from './data';

import 'tailwindcss/tailwind.css';

// eslint-disable-next-line functional/no-expression-statement
createApp(App, {
  initialItems: items,
  currencyOptions: currencies,
  shippingOptions: shipping,
  defaultCurrencyCode: currencies[0].currency,
  defaultShippingOption: shipping[0].label,
}).mount('#app');
