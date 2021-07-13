# dinero.js

> Create, calculate, and format money in JavaScript and TypeScript

**This package exports Dinero.js.** It works out of the box with `number` types, but you can adapt it for custom types or third-party libraries by implementing a custom calculator.

## 📦 Install

```sh
npm install dinero.js@alpha

# or

yarn add dinero.js@alpha
```

## ⚡️ Quick start

`Dinero` objects are minimal. Every function in `dinero.js` is side-effect free, allowing you only to bundle exactly what you use.

```js
import { USD } from '@dinero.js/currencies';
import { dinero, add } from 'dinero.js';

const d1 = dinero({ amount: 500, currency: USD });
const d2 = dinero({ amount: 800, currency: USD });

add(d1, d2);
```

## 📚 Documentation

For full documentation, visit the [online documentation](https://v2.dinerojs.com/docs).
