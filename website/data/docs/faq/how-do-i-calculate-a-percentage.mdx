---
title: How do I calculate a percentage?
description: How to create a Dinero object that represents a percentage of another.
---

There are two ways to calculate a percentage with Dinero.js: using `allocate` or `multiply`.

For example, if you need to calculate 15% of a Dinero object, you can split it with `allocate`.

```js
import { dinero, allocate } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

const price = dinero({ amount: 5000, currency: USD });

const [tax] = allocate(price, [15, 85]);
```

You can do the same with `multiply`.

```js
import { dinero, multiply } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

const price = dinero({ amount: 5000, currency: USD });

const tax = multiply(price, { amount: 15, scale: 2 });
```

If you need this often, you can abstract it into your own `percentage` function.

```js
function percentage(dineroObject, share, scale = 0) {
  const power = scale + 1;
  const rest = 100 ** power - share;
  const [chunk] = allocate(price, [share, rest], { scale });

  return chunk;
}
```
