---
title: Currency
description: Passing a currency to a new Dinero object.
---

# Currency

The currency is one of the three pieces of domain data necessary to create a Dinero object.

A Dinero currency is composed of:

- A unique **code**.
- A **base**, or radix.
- An **exponent**.

## Currency code

The currency code is a **unique identifier for the currency.** By convention, they're usually a three-letter or number. For example, in the case of national [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currencies, the first two letters of the code are the two letters of the [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code, and the third is usually the initial of the currency itself.

```js
// United States dollar
const USD = {
  code: 'USD',
  // ...
};
```

When they don't refer to a specific country (e.g., euro) or aren't a traditional currency (e.g., cryptocurrencies), the code can vary into a less standard but more mnemonic scheme. Ultimately, **the code is your choice and needs to make sense in your application.** The only requirement is for it to be unique.

## Currency base

The currency base (or radix) is the **number of unique digits used to represent a currency's minor unit.** Most currencies in circulation are decimal, meaning their base is 10.

```js
const USD = {
  code: 'USD',
  base: 10,
  // ...
};
```

There are still non-decimal currencies in circulation, such as the [Mauritanian ouguiya](https://en.wikipedia.org/wiki/Mauritanian_ouguiya) and the [Malagasy ariary](https://en.wikipedia.org/wiki/Malagasy_ariary).

```js
// Mauritanian ouguiya
const MRU = {
  code: 'MRU',
  base: 5,
  // ...
};
```

Some currencies have multiple subdivisions. For example, before [decimalization](https://en.wikipedia.org/wiki/Decimalisation), the British pound sterling was divided into 20 shillings, and each shilling into 12 pence. You also have examples in fiction, like Harry Potter, where one Galleon is divided into 17 Sickles, and each Sickle into 29 Knuts.

To represent these currencies, you can specify each subdivision with an array.

```js
// Pre-decimal Great Britain pound sterling
const GBP = {
  code: 'GBP',
  base: [20, 12],
  exponent: 1,
};

// Great Britain wizarding currency (Harry Potter universe)
const GBW = {
  code: 'GBW',
  base: [17, 29],
  exponent: 1,
};
```

::: info
When working with non-decimal currencies, you should set the exponent to `1`.
:::

## Currency exponent

The currency exponent expresses the **decimal relationship between the currency and its minor unit.** For example, there are 100 cents in a US dollar, being 10 to the power of 2, so the exponent for the US dollar is 2.

```js
const USD = {
  code: 'USD',
  base: 10,
  exponent: 2,
};
```

An easier way to think about it is as the number of digits after the decimal separator.

When a currency doesn't have minor currency units (e.g., the Japanese yen), the exponent should be 0. In this case, you can express the [amount](/core-concepts/amount) in major currency units.

```js
// Japanese yen
const JPY = {
  code: 'JPY',
  base: 10,
  exponent: 0,
};
```

When you pass a [scale](/core-concepts/scale) to a Dinero object, it overrides the exponent. This has an impact on how you should specify the [amount](/core-concepts/amount).

## Using built-in currencies

Dinero.js provides ISO 4217 currency objects out of the box via the `dinero.js/currencies` subpath export.

Once you've [installed Dinero.js](/getting-started/quick-start#install-the-library), you can import currencies:

```js
import { dinero } from 'dinero.js';
import { USD, EUR } from 'dinero.js/currencies';

const d1 = dinero({ amount: 1000, currency: USD });
const d2 = dinero({ amount: 1000, currency: EUR });
```

Dinero.js tracks the [ISO 4217 standard](https://www.six-group.com/en/products-services/financial-information/data-standards.html) and updates currencies when amendments are published. This means currency properties can occasionally change when you upgrade Dinero.js.

::: warning
**Currency data may change between Dinero.js versions.** If you need stability, pin your Dinero.js version in your package manager. You can also [define your own currency objects](#creating-custom-currencies) for full control.
:::

## Creating custom currencies

You can build your own currency object if it isn't available in `dinero.js/currencies`.

```js
const FRF = {
  code: 'FRF',
  base: 10,
  exponent: 2,
};
```

If you're a TypeScript user, you can implement the `Currency` type. It takes a generic parameter `TAmount` which represents the type you're using for numeric values (`number` by default).

```ts
import { Currency } from 'dinero.js';

const FRF: Currency<number> = {
  code: 'FRF',
  base: 10,
  exponent: 2,
};
```

If you want to use a different amount type, you'll need to pass a custom `Calculator` to Dinero.

**See also:** [Precision and large numbers](/guides/precision-and-large-numbers)
