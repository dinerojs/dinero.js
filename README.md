<p align="center">
  <a href="https://v2.dinerojs.com/docs">
    <img alt="Dinero.js" src="https://raw.githubusercontent.com/dinerojs/dinero.js/main/.github/banner.png">
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/dinero.js?activeTab=versions"><img alt="Stability: alpha" src="https://img.shields.io/badge/stability-alpha-f4d03f.svg" /></a>
  <a href="https://circleci.com/gh/dinerojs/dinero.js"><img alt="CircleCI" src="https://img.shields.io/circleci/build/gh/dinerojs/dinero.js"></a>
  <a href="https://github.com/dinerojs/dinero.js/blob/master/LICENSE"><img alt="NPM" src="https://img.shields.io/npm/l/dinero.js"></a>
</p>

<p align="center">
  Dinero.js lets you create, calculate, and format money safely in JavaScript and TypeScript.<br>
  <a href="https://v2.dinerojs.com/docs"><strong>v2.dinerojs.com/docs</strong></a>
</p>

---

Money is complex, and the primitives of the language aren't enough to properly represent it. Dinero.js is a JavaScript library that lets you express monetary values, but also perform mutations, conversions, comparisons, formatting, and overall make money manipulation easier and safer in your application.

> ℹ️ Dinero.js v2 is currently in alpha. For v1, check the [`v1` branch](https://github.com/dinerojs/dinero.js/tree/v1) and [docs](https://v1.dinerojs.com/).

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

Check out the [quick start guide](https://v2.dinerojs.com/docs/getting-started/quick-start) on the documentation.

## 📚 Documentation

The documentation lets you learn about all aspects of the library.

- [**Getting started**](https://v2.dinerojs.com/docs/getting-started/quick-start) to get up and running quickly with Dinero.js
- [**Core concepts**](https://v2.dinerojs.com/docs/core-concepts/amount) to learn about the underlying principles behind the library
- [**Guides**](https://v2.dinerojs.com/docs/guides/using-different-amount-types) to dig deeper into specific use cases.
- [**API**](https://v2.dinerojs.com/docs/api/mutations/add) for a comprehensive list of available functions and their parameters.
- [**FAQ**](https://v2.dinerojs.com/docs/faq/does-dinerojs-support-cryptocurrencies) for common answers to questions you might have

Visit the [full documentation](https://v2.dinerojs.com/docs) to know more.

## 👥 Contributors

[![Dinero.js contributors](https://contrib.rocks/image?repo=dinerojs/dinero.js)](https://github.com/dinerojs/dinero.js/graphs/contributors)

**From v1**

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://sarahdayan.dev" rel="nofollow"
          ><img
            src="https://avatars1.githubusercontent.com/u/5370675?v=4"
            alt=""
            width="50"
            height="50"
          /><br /><sub><b>Sarah Dayan</b></sub></a
        >
      </td>
      <td align="center">
        <a href="https://github.com/yacinehmito"
          ><img
            src="https://avatars1.githubusercontent.com/u/6893840?v=4"
            alt=""
            width="50"
            height="50"
          /><br /><sub><b>Yacine Hmito</b></sub></a
        >
      </td>
      <td align="center">
        <a href="https://github.com/scotttrinh"
          ><img
            src="https://avatars1.githubusercontent.com/u/1682194?v=4"
            alt=""
            width="50"
            height="50"
          /><br /><sub><b>Scott Trinh</b></sub></a
        >
      </td>
      <td align="center">
        <a href="https://rolandasb.com" rel="nofollow"
          ><img
            src="https://avatars0.githubusercontent.com/u/1409998?v=4"
            alt=""
            width="50"
            height="50"
          /><br /><sub><b>Rolandas Barysas</b></sub></a
        >
      </td>
      <td align="center">
        <a href="https://www.luizpb.com/en/" rel="nofollow"
          ><img
            src="https://avatars1.githubusercontent.com/u/1798830?v=4"
            alt=""
            width="50"
            height="50"
          /><br /><sub><b>Luiz "Bills"</b></sub></a
        >
      </td>
      <td align="center">
        <a href="https://kunst.com.br" rel="nofollow"
          ><img
            src="https://avatars2.githubusercontent.com/u/8649362?v=4"
            alt=""
            width="50"
            height="50"
          /><br /><sub><b>Leonardo Dino</b></sub></a
        >
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://www.kizu.ru/" rel="nofollow"
          ><img
            src="https://avatars3.githubusercontent.com/u/177485?v=4"
            alt=""
            width="50"
            height="50"
          /><br /><sub><b>Roman Komarov</b></sub></a
        >
      </td>
      <td align="center">
        <a href="http://jotaoncode.com/" rel="nofollow"
          ><img
            src="https://avatars3.githubusercontent.com/u/4575026?v=4"
            alt=""
            width="50"
            height="50"
          /><br /><sub><b>Juan Garcia</b></sub></a
        >
      </td>
      <td align="center">
        <a href="https://github.com/frobinsonj"
          ><img
            src="https://avatars3.githubusercontent.com/u/16726902?v=4"
            alt=""
            width="50"
            height="50"
          /><br /><sub><b>Freddy Robinson</b></sub></a
        >
      </td>
      <td align="center">
        <a href="https://twitter.com/andybrk" rel="nofollow"
          ><img
            src="https://avatars0.githubusercontent.com/u/273857?v=4"
            alt=""
            width="50"
            height="50"
          /><br /><sub><b>Andy Burke</b></sub></a
        >
      </td>
      <td align="center">
        <a href="https://github.com/andrewiggins"
          ><img
            src="https://avatars3.githubusercontent.com/u/459878?v=4"
            alt=""
            width="50"
            height="50"
          /><br /><sub><b>Andre Wiggins</b></sub></a
        >
      </td>
      <td align="center">
        <a href="https://desandro.com" rel="nofollow"
          ><img
            src="https://avatars0.githubusercontent.com/u/85566?v=4"
            alt=""
            width="50"
            height="50"
          /><br /><sub><b>David DeSandro</b></sub></a
        >
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="http://maxk.se" rel="nofollow"
          ><img
            src="https://avatars1.githubusercontent.com/u/19932622?v=4"
            alt=""
            width="50"
            height="50"
          /><br /><sub><b>Max Körlinge</b></sub></a
        >
      </td>
      <td align="center">
        <a href="https://github.com/dotpack"
          ><img
            src="https://avatars2.githubusercontent.com/u/1175814?v=4"
            alt=""
            width="50"
            height="50"
          /><br /><sub><b>Ilia Ermolin</b></sub></a
        >
      </td>
      <td align="center">
        <a href="https://coina.ge" rel="nofollow"
          ><img
            src="https://avatars1.githubusercontent.com/u/1531750?v=4"
            alt=""
            width="50"
            height="50"
          /><br /><sub><b>Kevin Brown</b></sub></a
        >
      </td>
      <td align="center">
        <a href="https://seankwalker.com" rel="nofollow"
          ><img
            src="https://avatars.githubusercontent.com/u/20524136?v=4"
            alt=""
            width="50"
            height="50"
          /><br /><sub><b>Sean Walker</b></sub></a
        >
      </td>
      <td align="center">
        <a href="http://jnguyen.me/" rel="nofollow"
          ><img
            src="https://avatars0.githubusercontent.com/u/1127677?v=4"
            alt=""
            width="50"
            height="50"
          /><br /><sub><b>John Nguyen</b></sub></a
        >
      </td>
      <td align="center">
        <a href="https://journal.artfuldev.com" rel="nofollow"
          ><img
            src="https://avatars.githubusercontent.com/u/3091087?v=4"
            alt=""
            width="50"
            height="50"
          /><br /><sub><b>Sudarsan Balaji</b></sub></a
        >
      </td>
    </tr>
  </tbody>
</table>

## 📜 License

[MIT](LICENSE)

---

<div align="center">

[![Powered by Vercel](.github/powered-by-vercel.svg)](https://vercel.com/?utm_source=dinerojs&utm_campaign=oss)

</div>
