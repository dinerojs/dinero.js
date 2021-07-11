<p align="center">
  <a href="https://v2.dinerojs.com/docs">
    <img alt="Dinero.js" src=".github/banner.png">
  </a>
</p>

<p align="center">
  <a href="http://npmjs.com/package/dinero.js"><img alt="npm" src="https://img.shields.io/npm/v/dinero.js"></a>
  <a href="https://circleci.com/gh/dinerojs/dinero.js"><img alt="CircleCI" src="https://img.shields.io/circleci/build/gh/dinerojs/dinero.js"></a>
  <a href="https://github.com/dinerojs/dinero.js/blob/master/LICENSE"><img alt="NPM" src="https://img.shields.io/npm/l/dinero.js"></a>
</p>

<p align="center">
  Dinero.js lets you create, calculate, and format money safely in JavaScript and TypeScript.<br>
  <a href="https://v2.dinerojs.com/docs"><strong>v2.dinerojs.com/docs</strong></a>
</p>

---

Money is complex, and the primitives of the language aren't enough to properly represent it. Dinero.js is a JavaScript library that lets you express monetary values, but also perform mutations, conversions, comparisons, formatting, and overall make money manipulation easier and safer in your application.

## 📦 Install

```sh
npm install dinero.js

# or

yarn add dinero.js
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

Check out the [quick start guide](https://v2.dinerojs.com/docs/getting-started/quick-start) on the documentation.

## 📚 Documentation

The documentation lets you learn about all aspects of the library.

- [**Getting started**](https://v2.dinerojs.com/docs/getting-started/quick-start) to get up and running quickly with Dinero.js
- [**Core concepts**](https://v2.dinerojs.com/docs/core-concepts/amount) to learn about the underlying principles behind the library
- [**API**](https://v2.dinerojs.com/docs/api/mutations/add) for a comprehensive list of available functions and their parameters.
- [**Advanced**](https://v2.dinerojs.com/docs/advanced/using-different-amount-types) for less common or more complex topics.
- [**FAQ**](https://v2.dinerojs.com/docs/faq/does-dinerojs-support-cryptocurrencies) for common answers to questions you might have

Visit the [full documentation](https://v2.dinerojs.com/docs) to know more.

## 👥 Contributors

[![Dinero.js contributors](https://contrib.rocks/image?repo=dinerojs/dinero.js)](https://github.com/dinerojs/dinero.js/graphs/contributors)

## 📜 License

[MIT](LICENSE.md)

---

<div align="center">

[![Powered by Vercel](.github/powered-by-vercel.svg)](https://vercel.com/?utm_source=dinerojs&utm_campaign=oss)

</div>
