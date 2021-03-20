# dinero.js

> An immutable library to create, calculate and format monetary values.

**This package exports Dinero.js with a side-effect free interface.** It caters to users who want to tree-shake their dependencies to control file size and those who prefer a more functional style (although it doesn't implement traditional functional patterns).

It works out of the box with `number` types. You can adapt it for custom types or libraries (e.g., `bigint`, [big.js](https://github.com/MikeMcl/big.js/), etc.) by implementing the calculator and formatter functions.

## 📦 Install

```sh
npm install dinero.js

# or

yarn add dinero.js
```

## ⚡️ Quick start

Pure `Dinero` objects are minimal and only contain a single method. Every function in `dinero.js` is side-effect free, allowing you only to bundle exactly what you use.

```js
import { USD } from "@dinero.js/currencies";
import { dinero, add } from "dinero.js";

const d1 = dinero({ amount: 500, currency: USD });
const d2 = dinero({ amount: 800, currency: USD });

add(d1, d2);
```

## 📚 Documentation

For full documentation, visit the [online documentation](#).
