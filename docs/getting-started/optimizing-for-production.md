---
title: Optimizing for production
description: Removing unused code from your production builds for maximum performance.
---

# Optimizing for production

When importing the full UMD version of Dinero.js, you can take advantage of various optimization techniques to reduce your bundle size.

::: info
The `dinero.js` package includes all core functionality, currencies, and the default number calculator in a single consolidated package.
:::

## Compress your assets

If you're using the UMD build, **make sure to compress it before you serve it in production.**

If you're importing Dinero.js via a CDN such as [jsDelivr](https://www.jsdelivr.com/) or [cdnjs](https://cdnjs.com/), you should get Gzip or Brotli compression out of the box. If you're hosting your own, make sure to use the production build and to compress it either manually or using an edge server like [Cloudflare](https://www.cloudflare.com/cdn) or [Cloudfront](https://aws.amazon.com/cloudfront/).

**Resources:**
- [Content delivery network](https://wikipedia.org/wiki/Content_delivery_network)
- [Gzip](https://gnu.org/software/gzip/)
- [Brotli](https://github.com/google/brotli)

## Use the ESM build

Dinero.js comes in two builds: **Universal Module Definition (UMD) and ECMAScript Modules (ESM).**

The UMD build bundles the entire library. It's meant for usage in Node.js 13.1 or older (before ES modules support), or when your web project doesn't use a build system.

If you're using a modern build system like [webpack](https://webpack.js.org/), [Parcel](https://parceljs.org/) or [Vite](https://vitejs.dev/), you should use the ESM build and bundle it yourself. This lets you take advantage of performance features like [tree-shaking](#tree-shake-your-code) and code splitting.

## Use granular UMD bundles

If you're not using a bundler but still want to minimize your bundle size, Dinero.js provides **granular UMD bundles** for individual functions and currencies. This lets you load only what you need without a build step.

### Loading individual functions

Instead of loading the full bundle, you can load specific functions:

```html
<!-- Load only what you need -->
<script src="https://cdn.jsdelivr.net/npm/dinero.js@alpha/dist/umd/dinero.production.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dinero.js@alpha/dist/umd/add.production.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dinero.js@alpha/dist/umd/currencies/usd.production.js"></script>

<script>
  const { dinero } = window['dinero.js/dinero'];
  const { add } = window['dinero.js/add'];
  const { USD } = window['dinero.js/currencies/usd'];

  const d1 = dinero({ amount: 500, currency: USD });
  const d2 = dinero({ amount: 300, currency: USD });
  const total = add(d1, d2);
</script>
```

### Using jsDelivr's combine endpoint

You can combine multiple files into a single request using jsDelivr's combine endpoint:

```html
<script src="https://cdn.jsdelivr.net/combine/npm/dinero.js@alpha/dist/umd/dinero.production.js,npm/dinero.js@alpha/dist/umd/add.production.js,npm/dinero.js@alpha/dist/umd/currencies/usd.production.js"></script>
```

### Available granular bundles

- **Creation:** `dinero`
- **Mutations:** `add`, `subtract`, `multiply`, `allocate`
- **Comparisons:** `compare`, `equal`, `greaterThan`, `greaterThanOrEqual`, `lessThan`, `lessThanOrEqual`, `minimum`, `maximum`
- **Checks:** `isZero`, `isPositive`, `isNegative`, `hasSubUnits`, `haveSameAmount`, `haveSameCurrency`
- **Conversions:** `convert`, `normalizeScale`, `transformScale`, `trimScale`
- **Formatting:** `toDecimal`, `toSnapshot`, `toUnits`
- **Currencies:** all ISO 4217 currencies (e.g., `usd`, `eur`, `gbp`)

Each bundle is available at:

```
https://cdn.jsdelivr.net/npm/dinero.js@alpha/dist/umd/{name}.production.js
https://cdn.jsdelivr.net/npm/dinero.js@alpha/dist/umd/currencies/{code}.production.js
```

And accessible via:

```js
window['dinero.js/{name}']
window['dinero.js/currencies/{code}']
```

### Full bundle (convenience)

If you need all functions and currencies, use the full bundle:

```html
<script src="https://cdn.jsdelivr.net/npm/dinero.js@alpha/dist/umd/index.production.js"></script>
<script>
  const { dinero, add, USD } = window['dinero.js'];
</script>
```

**Resources:**
- [JavaScript modules](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules)
- [Tree-shaking](https://developer.mozilla.org/docs/Glossary/Tree_shaking)
- [Code splitting](https://developer.mozilla.org/docs/Glossary/Code_splitting)

## Tree-shake your code

**Tree-shaking lets you bundle only the code you're using and eliminate the rest.** For example, if you're only using Dinero.js to add and subtract monetary values, only `dinero`, [`add`](/api/mutations/add), [`subtract`](/api/mutations/subtract), and their dependencies should be in your final bundle.

Dinero.js is a pure library, meaning it doesn't produce side-effects. If you're using a modern build system, you can tree-shake it. To do so, make sure to import only the functions you need, and enable tree-shaking in your bundler configuration if necessary.

```js
import { dinero, add, subtract } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

// ...
```

**Resources:**
- [Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
- [Scope Hoisting](https://v2.parceljs.org/features/scope-hoisting/)
- [Building for Production](https://vitejs.dev/guide/build.html)
