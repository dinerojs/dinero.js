---
title: Optimizing for production
description: Tips for reducing bundle size and improving performance.
---

# Optimizing for production

## Tree-shake your code

**Tree-shaking lets you bundle only the code you're using and eliminate the rest.** For example, if you're only using Dinero.js to add and subtract monetary values, only `dinero`, [`add`](/api/mutations/add), [`subtract`](/api/mutations/subtract), and their dependencies should be in your final bundle.

Dinero.js is a pure library, meaning it doesn't produce side-effects. If you're using a modern build system, you can tree-shake it. To do so, make sure to import only the functions you need, and enable tree-shaking in your bundler configuration if necessary.

```js
import { dinero, add, subtract } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

// Only these functions end up in your bundle
```

**Resources:**
- [Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
- [Scope Hoisting](https://v2.parceljs.org/features/scope-hoisting/)
- [Building for Production](https://vitejs.dev/guide/build.html)

## Compress your assets

If you're using the UMD build without a bundler, **make sure to compress it before you serve it in production.**

If you're importing Dinero.js via a CDN such as [jsDelivr](https://www.jsdelivr.com/) or [cdnjs](https://cdnjs.com/), you should get Gzip or Brotli compression out of the box. If you're hosting your own, make sure to use the production build and to compress it either manually or using an edge server like [Cloudflare](https://www.cloudflare.com/cdn) or [Cloudfront](https://aws.amazon.com/cloudfront/).

**Resources:**
- [Content delivery network](https://wikipedia.org/wiki/Content_delivery_network)
- [Gzip](https://gnu.org/software/gzip/)
- [Brotli](https://github.com/google/brotli)
