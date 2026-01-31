import { safeSubtract } from '../core';
import type { SubtractParams } from '../core';

/**
 * Subtract the passed Dinero objects.
 *
 * @param minuend - The Dinero object to subtract from.
 * @param subtrahend - The Dinero object to subtract.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export function subtract<TAmount>(
  ...[minuend, subtrahend]: SubtractParams<TAmount>
) {
  const { calculator } = minuend;
  const subtractFn = safeSubtract(calculator);

  return subtractFn(minuend, subtrahend);
}
