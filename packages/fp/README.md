# @dinero.js/fp

> A functional implementation of Dinero.js.

**This package exports Dinero.js with a functional interface.** It caters to users who want to tree-shake their dependencies to control file size and those who prefer a more functional style.

It comes in two implementations: `number` and `bigint`. You can adapt it for custom types or libraries (e.g., [big.js](https://github.com/MikeMcl/big.js/)) by implementing the calculator and formatter functions.

## 📦 Install

```sh
npm install @dinero.js/fp

# or

yarn add @dinero.js/fp
```

## ⚡️ Quick start

Functional `Dinero` objects are minimal and only contain a single method. Every function in `@dinero.js/fp` is side-effect free, allowing you only to bundle exactly what you use.

```js
import { USD } from "@dinero.js/currencies";
import dinero, { add } from "@dinero.js/fp";

const d1 = dinero({ amount: 500, currency: USD });
const d2 = dinero({ amount: 800, currency: USD });

add(d1, d2);
```

**Note:** functional and chainable `Dinero` objects are incompatible. You can't use them together, and you shouldn't mix them in your codebase.

## 📚 Documentation

For full documentation, visit the [online documentation](#).
