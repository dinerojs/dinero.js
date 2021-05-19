import { createApp } from 'vue';

import App from './App.vue';
import { items, shipping, languages } from './data';

import 'tailwindcss/tailwind.css';

// eslint-disable-next-line functional/no-expression-statement
createApp(App, {
  initialItems: items,
  languageOptions: languages,
  shippingOptions: shipping,
  defaultLanguage: languages[0].code,
  defaultShippingOption: shipping[0].label,
}).mount('#app');
