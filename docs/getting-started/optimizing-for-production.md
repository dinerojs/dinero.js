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

If you're not using a bundler but still want to minimize your bundle size, Dinero.js provides **granular UMD bundles** for individual functions. This lets you load only what you need without a build step.

### Loading individual functions

Instead of loading the full bundle, you can load specific functions:

```html
<script src="https://cdn.jsdelivr.net/npm/dinero.js/dist/umd/dinero.production.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dinero.js/dist/umd/add.production.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dinero.js/dist/umd/currencies/index.production.js"></script>
```

Alternatively, you can use jsDelivr's combine feature to load multiple files in a single request, or load the complete bundle from the main endpoint.

### Available bundles

**Functions:**

```
https://cdn.jsdelivr.net/npm/dinero.js/dist/umd/{name}.production.js
```

- `dinero` - Create Dinero objects
- `add`, `subtract`, `multiply`, `allocate`
- `compare`, `equal`, `greaterThan`, `greaterThanOrEqual`, `lessThan`, `lessThanOrEqual`, `minimum`, `maximum`
- `isZero`, `isPositive`, `isNegative`, `hasSubUnits`, `haveSameAmount`, `haveSameCurrency`
- `convert`, `normalizeScale`, `transformScale`, `trimScale`
- `toDecimal`, `toSnapshot`, `toUnits`

**Currencies:**

```
https://cdn.jsdelivr.net/npm/dinero.js/dist/umd/currencies/index.production.js
```

All ISO 4217 currencies are bundled together. For granular currency imports, use the ESM build with a bundler that supports tree-shaking.

### Full bundle

If you need everything, use the full bundle:

```html
<script src="https://cdn.jsdelivr.net/npm/dinero.js/dist/umd/index.production.js"></script>
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
