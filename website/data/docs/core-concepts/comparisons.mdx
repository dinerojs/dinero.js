---
title: Comparisons
description: Comparing Dinero objects for amount, currency, equality, sign, and more.
---

Within the control flow of your application, you'll inevitably need to write conditional expressions to make decisions. The Dinero.js API provides functions to compare objects.

```js
import { dinero, lessThan } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

const d1 = dinero({ amount: 500, currency: USD });
const d2 = dinero({ amount: 800, currency: USD });

lessThan(d1, d2);
```

## Comparing Dinero objects

For example, if you're building a shopping cart checkout page, you'll probably need to see if an amount is greater or lesser than another.

```js
import { dinero, greaterThanOrEqual } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

const total = dinero({ amount: 25000, currency: USD });
const freeShippingThreshold = dinero({ amount: 10000, currency: USD });

const hasFreeShipping = greaterThanOrEqual(total, freeShippingThreshold);
```

You can also use comparison functions to control your user interface logic.

```js
import React, { useState } from 'react';
import { dinero, isZero } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

import { format } from './utils';

function Cart() {
  const [products] = useState([
    {
      name: 'Apple AirPods Pro',
      price: dinero({ amount: 17495, currency: USD }),
    },
    {
      name: 'Apple Stickers',
      price: dinero({ amount: 0, currency: USD }),
    },
  ]);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map(({ name, price }) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{isZero(price) ? 'Complimentary' : format(price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```
