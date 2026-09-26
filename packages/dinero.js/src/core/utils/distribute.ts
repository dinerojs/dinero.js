import type { DineroCalculator } from '../types';

import { equal } from './equal';
import { greaterThan } from './greaterThan';
import { greaterThanOrEqual } from './greaterThanOrEqual';
import { lessThan } from './lessThan';

type DistributeCalculator<TAmount> = DineroCalculator<TAmount>;

// The number calculator multiplies before it divides. A safe amount times a
// safe ratio can round to the next integer, so one share takes the whole amount.
function exactNumberQuotient<TAmount>(
  value: TAmount,
  ratio: TAmount,
  total: TAmount
): number | undefined {
  if (
    typeof value !== 'number' ||
    typeof ratio !== 'number' ||
    typeof total !== 'number' ||
    !Number.isSafeInteger(value) ||
    !Number.isSafeInteger(ratio) ||
    !Number.isSafeInteger(total)
  ) {
    return undefined;
  }

  const quotient = (BigInt(value) * BigInt(ratio)) / BigInt(total);

  if (
    quotient > BigInt(Number.MAX_SAFE_INTEGER) ||
    quotient < BigInt(Number.MIN_SAFE_INTEGER)
  ) {
    return undefined;
  }

  return Number(quotient);
}

/**
 * Returns a distribute function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The distribute function.
 */
export function distribute<TAmount>(calculator: DistributeCalculator<TAmount>) {
  return (value: TAmount, ratios: readonly TAmount[]) => {
    const equalFn = equal(calculator);
    const greaterThanFn = greaterThan(calculator);
    const lessThanFn = lessThan(calculator);
    const greaterThanOrEqualFn = greaterThanOrEqual(calculator);

    const zero = calculator.zero();
    const one = calculator.increment(zero);

    const total = ratios.reduce((a, b) => calculator.add(a, b), zero);

    if (equalFn(total, zero)) {
      return ratios;
    }

    let remainder = value;

    const shares = ratios.map((ratio) => {
      const share =
        (exactNumberQuotient(value, ratio, total) ??
          calculator.integerDivide(calculator.multiply(value, ratio), total)) ||
        zero;

      remainder = calculator.subtract(remainder, share);

      return share;
    });

    const isPositive = greaterThanOrEqualFn(value, zero);
    const compare = isPositive ? greaterThanFn : lessThanFn;
    const amount = isPositive ? one : calculator.decrement(zero);

    // Create indices sorted by descending ratio for remainder distribution
    // Indices with larger ratios receive remainder first
    const sortedIndices = ratios
      .map((ratio, index) => ({ ratio, index }))
      .filter(({ ratio }) => !equalFn(ratio, zero))
      .sort((a, b) => (greaterThanFn(a.ratio, b.ratio) ? -1 : 1))
      .map(({ index }) => index);

    let i = 0;

    while (compare(remainder, zero)) {
      const index = sortedIndices[i % sortedIndices.length];
      shares[index] = calculator.add(shares[index], amount);

      const newRemainder = calculator.subtract(remainder, amount);

      // Guard against infinite loop due to floating-point precision loss.
      // When using the number calculator with amounts larger than
      // Number.MAX_SAFE_INTEGER, subtraction may have no effect.
      if (equalFn(newRemainder, remainder)) {
        break;
      }

      remainder = newRemainder;
      i++;
    }

    return shares;
  };
}
