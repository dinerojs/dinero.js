/**
 * Type-level tests for currency safety.
 *
 * These tests don't run at runtime. They are validated by `npm run test:types`.
 * Lines marked with `@ts-expect-error` must produce a type error.
 * If they don't, tsc will report an "unused @ts-expect-error" error, failing
 * the type check.
 */

import { USD, EUR } from 'dinero.js/currencies';

import {
  dinero,
  add,
  subtract,
  greaterThan,
  greaterThanOrEqual,
  lessThan,
  lessThanOrEqual,
  equal,
  compare,
  minimum,
  maximum,
  haveSameAmount,
  normalizeScale,
  allocate,
  multiply,
  trimScale,
  transformScale,
  convert,
  toSnapshot,
  toDecimal,
  toUnits,
  haveSameCurrency,
} from 'dinero.js';

const dineroUSD = dinero({ amount: 1000, currency: USD });
const dineroEUR = dinero({ amount: 1000, currency: EUR });

/**
 * Same-currency operations should compile
 */

add(dineroUSD, dineroUSD);
subtract(dineroUSD, dineroUSD);
greaterThan(dineroUSD, dineroUSD);
greaterThanOrEqual(dineroUSD, dineroUSD);
lessThan(dineroUSD, dineroUSD);
lessThanOrEqual(dineroUSD, dineroUSD);
equal(dineroUSD, dineroUSD);
compare(dineroUSD, dineroUSD);
minimum([dineroUSD, dineroUSD]);
maximum([dineroUSD, dineroUSD]);
haveSameAmount([dineroUSD, dineroUSD]);
normalizeScale([dineroUSD, dineroUSD]);

/**
 * Cross-currency operations should NOT compile
 */

// @ts-expect-error - Different currencies
add(dineroUSD, dineroEUR);

// @ts-expect-error - Different currencies
subtract(dineroUSD, dineroEUR);

// @ts-expect-error - Different currencies
greaterThan(dineroUSD, dineroEUR);

// @ts-expect-error - Different currencies
greaterThanOrEqual(dineroUSD, dineroEUR);

// @ts-expect-error - Different currencies
lessThan(dineroUSD, dineroEUR);

// @ts-expect-error - Different currencies
lessThanOrEqual(dineroUSD, dineroEUR);

// @ts-expect-error - Different currencies
equal(dineroUSD, dineroEUR);

// @ts-expect-error - Different currencies
compare(dineroUSD, dineroEUR);

// @ts-expect-error - Different currencies
minimum([dineroUSD, dineroEUR]);

// @ts-expect-error - Different currencies
maximum([dineroUSD, dineroEUR]);

// @ts-expect-error - Different currencies
haveSameAmount([dineroUSD, dineroEUR]);

// @ts-expect-error - Different currencies
normalizeScale([dineroUSD, dineroEUR]);

/**
 * Unary operations preserve currency
 */

const allocated = allocate(dineroUSD, [50, 50]);
// Each allocation result should still be USD-typed
add(allocated[0], dineroUSD);
// @ts-expect-error - Allocated USD + EUR
add(allocated[0], dineroEUR);

const multiplied = multiply(dineroUSD, 2);
add(multiplied, dineroUSD);
// @ts-expect-error - Multiplied USD + EUR
add(multiplied, dineroEUR);

const trimmed = trimScale(dineroUSD);
add(trimmed, dineroUSD);
// @ts-expect-error - Trimmed USD + EUR
add(trimmed, dineroEUR);

const transformed = transformScale(dineroUSD, 4);
add(transformed, dineroUSD);
// @ts-expect-error - Transformed USD + EUR
add(transformed, dineroEUR);

/**
 * `convert` changes currency type
 */

const converted = convert(dineroUSD, EUR, { EUR: { amount: 89, scale: 2 } });
// Converted object should be EUR-typed
add(converted, dineroEUR);
// @ts-expect-error - Converted EUR + USD
add(converted, dineroUSD);

/**
 * `toSnapshot` preserves currency type
 */

const snapshot = toSnapshot(dineroUSD);
// Snapshot currency should be compatible with USD
const _usdCode: 'USD' = snapshot.currency.code;

/**
 * `toDecimal` transformer receives typed currency
 */

toDecimal(dineroUSD, ({ currency }) => {
  const _code: 'USD' = currency.code;

  return _code;
});

/**
 * `toUnits` transformer receives typed currency
 */

toUnits(dineroUSD, ({ currency }) => {
  const _code: 'USD' = currency.code;

  return _code;
});

/**
 * `haveSameCurrency` accepts different currencies (intentional — it's a runtime check)
 */

haveSameCurrency([dineroUSD, dineroEUR]);

/**
 * Untyped currencies (plain string) still work (backward compatibility)
 */

const untypedCurrency = { code: 'XYZ', base: 10, exponent: 2 };
const dineroUntyped1 = dinero({ amount: 100, currency: untypedCurrency });
const dineroUntyped2 = dinero({ amount: 200, currency: untypedCurrency });

// Two untyped Dinero objects can be added (both are string)
add(dineroUntyped1, dineroUntyped2);
