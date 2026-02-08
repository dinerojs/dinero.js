<p align="center">
  <a href="https://v2.dinerojs.com">
    <img alt="Dinero.js" src="https://raw.githubusercontent.com/dinerojs/dinero.js/main/.github/banner.png">
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/dinero.js"><img alt="npm version" src="https://img.shields.io/npm/v/dinero.js/alpha" /></a>
  <a href="https://www.npmjs.com/package/dinero.js"><img alt="npm monthly downloads" src="https://img.shields.io/npm/dm/dinero.js" /></a>
  <a href="https://github.com/dinerojs/dinero.js/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/dinerojs/dinero.js" /></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Ready-blue" /></a>
  <a href="https://github.com/dinerojs/dinero.js/actions/workflows/ci.yml"><img alt="GitHub Actions" src="https://img.shields.io/github/actions/workflow/status/dinerojs/dinero.js/ci.yml?branch=main"></a>
  <a href="https://github.com/dinerojs/dinero.js/blob/master/LICENSE"><img alt="NPM" src="https://img.shields.io/npm/l/dinero.js"></a>
</p>

<p align="center">
  Dinero.js lets you create, calculate, and format money safely in JavaScript and TypeScript.<br>
  <a href="https://v2.dinerojs.com"><strong>v2.dinerojs.com</strong></a>
</p>

---

Money is complex, and the primitives of the language aren't enough to properly represent it. Dinero.js is a JavaScript library that lets you express monetary values, but also perform mutations, conversions, comparisons, formatting, and overall make money manipulation easier and safer in your application.

> ℹ️ Dinero.js v2 is currently in alpha. For v1, check the [`v1` branch](https://github.com/dinerojs/dinero.js/tree/v1) and [docs](https://v1.dinerojs.com/).

## ✨ Features

- **Immutable & pure:** every operation returns a new object, no side effects
- **Type-safe:** first-class TypeScript support with full type inference
- **Tree-shakeable:** import only what you use, keep bundles small
- **Pluggable precision:** use `number` by default or `bigint` for large amounts
- **Non-decimal currencies:** support for any base, including multi-subdivision currencies
- **Framework-agnostic:** works everywhere JavaScript runs

## 📦 Install

```sh
npm install dinero.js@alpha

# or

yarn add dinero.js@alpha
```

## ⚡️ Quick start

`Dinero` objects are minimal. Every function in `dinero.js` is side-effect free, allowing you only to bundle exactly what you use.

```js
import { dinero, add, toDecimal } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d1 = dinero({ amount: 500, currency: USD });
const d2 = dinero({ amount: 800, currency: USD });

const total = add(d1, d2);

toDecimal(total); // "13.00"
```

Check out the [quick start guide](https://v2.dinerojs.com/getting-started/quick-start.html) on the documentation.

## 📚 Documentation

The documentation lets you learn about all aspects of the library.

- [**Getting started**](https://v2.dinerojs.com/getting-started/quick-start.html) to get up and running quickly with Dinero.js
- [**Core concepts**](https://v2.dinerojs.com/core-concepts/amount.html) to learn about the underlying principles behind the library
- [**Guides**](https://v2.dinerojs.com/guides/precision-and-large-numbers.html) to dig deeper into specific use cases.
- [**API**](https://v2.dinerojs.com/api/mutations/add.html) for a comprehensive list of available functions and their parameters.
- [**FAQ**](https://v2.dinerojs.com/faq/does-dinerojs-support-cryptocurrencies.html) for common answers to questions you might have

Visit the [full documentation](https://v2.dinerojs.com) to know more.

## 🏢 Used by

Dinero.js is used by [WooCommerce](https://github.com/woocommerce/woocommerce), [Highlight](https://github.com/highlight/highlight), [Cypress](https://github.com/cypress-io/cypress-realworld-app), [Vercel](https://github.com/vercel/next-app-router-playground), [AWS Labs](https://github.com/awslabs/aws-lambda-web-adapter), [Module Federation](https://github.com/module-federation/core), and [many more](https://github.com/dinerojs/dinero.js/network/dependents).

[![Used by](https://api.usedby.dev/npm/dinero.js?max=50&sort=stars)](https://github.com/dinerojs/dinero.js/network/dependents)

## 👥 Contributors

[![Dinero.js contributors](https://contrib.rocks/image?repo=dinerojs/dinero.js)](https://github.com/dinerojs/dinero.js/graphs/contributors)

**From v1:** <a href="https://sarahdayan.dev"><img src="https://avatars1.githubusercontent.com/u/5370675?v=4" alt="Sarah Dayan" width="30" height="30" style="border-radius:50%" /></a> <a href="https://github.com/yacinehmito"><img src="https://avatars1.githubusercontent.com/u/6893840?v=4" alt="Yacine Hmito" width="30" height="30" style="border-radius:50%" /></a> <a href="https://github.com/scotttrinh"><img src="https://avatars1.githubusercontent.com/u/1682194?v=4" alt="Scott Trinh" width="30" height="30" style="border-radius:50%" /></a> <a href="https://rolandasb.com"><img src="https://avatars0.githubusercontent.com/u/1409998?v=4" alt="Rolandas Barysas" width="30" height="30" style="border-radius:50%" /></a> <a href="https://www.luizpb.com/en/"><img src="https://avatars1.githubusercontent.com/u/1798830?v=4" alt="Luiz Bills" width="30" height="30" style="border-radius:50%" /></a> <a href="https://kunst.com.br"><img src="https://avatars2.githubusercontent.com/u/8649362?v=4" alt="Leonardo Dino" width="30" height="30" style="border-radius:50%" /></a> <a href="https://www.kizu.ru/"><img src="https://avatars3.githubusercontent.com/u/177485?v=4" alt="Roman Komarov" width="30" height="30" style="border-radius:50%" /></a> <a href="http://jotaoncode.com/"><img src="https://avatars3.githubusercontent.com/u/4575026?v=4" alt="Juan Garcia" width="30" height="30" style="border-radius:50%" /></a> <a href="https://github.com/frobinsonj"><img src="https://avatars3.githubusercontent.com/u/16726902?v=4" alt="Freddy Robinson" width="30" height="30" style="border-radius:50%" /></a> <a href="https://twitter.com/andybrk"><img src="https://avatars0.githubusercontent.com/u/273857?v=4" alt="Andy Burke" width="30" height="30" style="border-radius:50%" /></a> <a href="https://github.com/andrewiggins"><img src="https://avatars3.githubusercontent.com/u/459878?v=4" alt="Andre Wiggins" width="30" height="30" style="border-radius:50%" /></a> <a href="https://desandro.com"><img src="https://avatars0.githubusercontent.com/u/85566?v=4" alt="David DeSandro" width="30" height="30" style="border-radius:50%" /></a> <a href="http://maxk.se"><img src="https://avatars1.githubusercontent.com/u/19932622?v=4" alt="Max Körlinge" width="30" height="30" style="border-radius:50%" /></a> <a href="https://github.com/dotpack"><img src="https://avatars2.githubusercontent.com/u/1175814?v=4" alt="Ilia Ermolin" width="30" height="30" style="border-radius:50%" /></a> <a href="https://coina.ge"><img src="https://avatars1.githubusercontent.com/u/1531750?v=4" alt="Kevin Brown" width="30" height="30" style="border-radius:50%" /></a> <a href="https://seankwalker.com"><img src="https://avatars.githubusercontent.com/u/20524136?v=4" alt="Sean Walker" width="30" height="30" style="border-radius:50%" /></a> <a href="http://jnguyen.me/"><img src="https://avatars0.githubusercontent.com/u/1127677?v=4" alt="John Nguyen" width="30" height="30" style="border-radius:50%" /></a> <a href="https://journal.artfuldev.com"><img src="https://avatars.githubusercontent.com/u/3091087?v=4" alt="Sudarsan Balaji" width="30" height="30" style="border-radius:50%" /></a>

## 📜 License

[MIT](LICENSE)
