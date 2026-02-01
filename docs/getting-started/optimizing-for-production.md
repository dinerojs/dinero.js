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

## Module formats

Dinero.js ships in three formats:

| Format | Path | Use case |
|--------|------|----------|
| **ESM** | `dist/esm/` | Modern bundlers, Node.js 14+ with `import` |
| **CJS** | `dist/cjs/` | Node.js with `require()`, older bundlers |
| **UMD** | `dist/umd/` | Browser `<script>` tags, no build step |

The format is selected automatically based on how you import the library. Modern bundlers like [webpack](https://webpack.js.org/), [Parcel](https://parceljs.org/), and [Vite](https://vitejs.dev/) use ESM and can [tree-shake](#tree-shake-your-code) unused code.

## Use the UMD build

If you're not using a bundler, you can load Dinero.js via a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/dinero.js/dist/umd/index.production.js"></script>
<script>
  const { dinero, add, USD } = window['dinero.js'];
</script>
```

The UMD build includes all functions and currencies. For smaller bundles, use the ESM build with a bundler that supports tree-shaking.

**Available UMD bundles:**

| Bundle | Description |
|--------|-------------|
| `dist/umd/index.production.js` | Full library (functions + currencies) |
| `dist/umd/bigint/index.production.js` | BigInt variant |

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
