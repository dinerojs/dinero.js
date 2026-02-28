---
title: Quick start
description: Learn how to get Dinero.js up and running in your project.
---

# Quick start

## Install the library

To get started, you need to install the `dinero.js` package.

```sh
npm install dinero.js@alpha

# or

yarn add dinero.js@alpha
```

Then import it in your project:

```js
import { dinero, add } from 'dinero.js';
import { USD } from 'dinero.js/currencies';
```

If you don't use a package manager, you can use the HTML `script` element:

```html
<script src="https://cdn.jsdelivr.net/npm/dinero.js@alpha/dist/umd/index.production.js"></script>
<script>
  const { dinero, add, USD } = window.dinerojs;
</script>
```

## First steps

**Dinero.js lets you express monetary values in JavaScript.** You can perform mutations, conversions, comparisons, format them extensively, and overall make money manipulation in your application easier and safer.

To get started, you need to create a new Dinero object. Amounts are specified in minor currency units (like "cents" for the dollar) and currencies in `Currency` objects.

This represents $50:

```js
const price = dinero({ amount: 5000, currency: USD });
```

You can add or subtract any amount you want, by passing it another Dinero object:

```js
import { dinero, add, subtract } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const price = dinero({ amount: 5000, currency: USD });

// returns a Dinero object with amount 6000
add(price, dinero({ amount: 1000, currency: USD }));

// returns a Dinero object with amount 4000
subtract(price, dinero({ amount: 1000, currency: USD }));
```

Dinero objects are immutable, meaning you always get a new Dinero object when performing transformations. Your original objects remain untouched.

```js
price; // still returns a Dinero object with amount 5000
```

You can ask all kinds of questions to your Dinero objects.

```js
import { dinero, equal, isZero, hasSubUnits } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d1 = dinero({ amount: 500, currency: USD });
const d2 = dinero({ amount: 500, currency: USD });
equal(d1, d2); // returns true

const d3 = dinero({ amount: 100, currency: USD });
isZero(d3); // returns false

const d4 = dinero({ amount: 1150, currency: USD });
hasSubUnits(d4); // returns true
```

Dinero.js provides [formatting functions](/core-concepts/formatting) that expose a pre-formatted amount. You can use them as-is, or pass a custom transformer function to further customize the output.

```js
import { dinero, toDecimal, toUnits } from 'dinero.js';
import { USD, MGA } from 'dinero.js/currencies';

const d1 = dinero({ amount: 5000, currency: USD });
const d2 = dinero({ amount: 13, currency: MGA });

toDecimal(d1); // "50.00"
toDecimal(d1, ({ value, currency }) => `${currency.code} ${value}`); // "USD 50.00"
toUnits(d2, ({ value }) => `${value[0]} ariary, ${value[1]} iraimbilanja`); // "2 ariary, 3 iraimbilanja"
```

Dinero objects pick up their scale from their currency exponent. If you want to represent amounts differently, you can specify a scale manually.

This represents $5:

```js
const price = dinero({ amount: 5000, currency: USD, scale: 3 });
```

This is only a preview of what you can do. Dinero.js provides extensive documentation with examples and guides.

## Available exports

Dinero.js provides four entry points:

| Import path | Description |
|-------------|-------------|
| `dinero.js` | Core functions with `number` amounts (default) |
| `dinero.js/currencies` | ISO 4217 currency definitions for `number` |
| `dinero.js/bigint/currencies` | ISO 4217 currency definitions for `bigint` |
| `dinero.js/bigint` | Core functions with `bigint` amounts |

```js
// Standard usage
import { dinero, add, subtract } from 'dinero.js';
import { USD, EUR } from 'dinero.js/currencies';

// For large amounts (bigint)
import { dinero } from 'dinero.js/bigint';
import { USD, EUR } from 'dinero.js/bigint/currencies';
```

::: info
Dinero.js requires Node.js 14+ with ES modules. Use `import`, not `require()`.
:::

## Agent skills

If you use an AI coding agent (Claude Code, Cursor, GitHub Copilot, etc.), you can install the [Dinero.js skills](/agent-skills) to teach it best practices and common pitfalls.

```sh
npx skills add dinerojs/skills
```
