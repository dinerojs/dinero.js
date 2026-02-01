---
title: Why functions instead of methods?
description: Why Dinero.js uses standalone functions instead of chainable methods.
---

# Why functions instead of methods?

Dinero.js uses standalone functions:

```js
add(d1, d2);
```

Instead of chainable methods:

```js
d1.add(d2);
```

**The primary reason is modularity.** With standalone functions, bundlers can eliminate unused code. With methods, every Dinero object would carry every operation on its prototype, including the ones you never use.

## Composition

Standalone functions compose well with functional utilities:

```js
import { pipe } from 'ramda';

pipe(
  (d) => multiply(d, 2),
  (d) => add(d, fee),
  (d) => toDecimal(d),
)(price);
```

## Custom chaining

Nesting can get verbose and hard to understand when inlining:

```js
// Multiplies, then adds, but looks like the opposite
add(multiply(d1, 2), d2);
```

If you prefer chaining, you can create your own wrapper:

```js
function chain(d) {
  return {
    multiply: (n) => chain(multiply(d, n)),
    add: (other) => chain(add(d, other)),
  };
}

chain(d1).multiply(2).add(d2);
```

For most use cases, the functional style works well and keeps your bundle small.
