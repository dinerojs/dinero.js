import type {
  SubtractParams} from '@dinero.js/core';
import {
  unsafeSubtract as coreUnsafeSubtract,
  safeSubtract as coreSafeSubtract
} from '@dinero.js/core';

/**
 * Unsafely subtract the passed Dinero objects.
 *
 * @param minuend The Dinero object to subtract from.
 * @param subtrahend The Dinero object to subtract.
 *
 * @returns A new Dinero object.
 */
export function unsafeSubtract<TAmount>(
  ...[minuend, subtrahend]: SubtractParams<TAmount>
) {
  const subtract = coreUnsafeSubtract({ calculator: minuend.calculator });

  return subtract(minuend, subtrahend);
}

/**
 * Subtract the passed Dinero objects.
 *
 * @param minuend The Dinero object to subtract from.
 * @param subtrahend The Dinero object to subtract.
 *
 * @returns A new Dinero object.
 */
export function safeSubtract<TAmount>(
  ...[minuend, subtrahend]: SubtractParams<TAmount>
) {
  const subtract = coreSafeSubtract({ calculator: minuend.calculator });

  return subtract(minuend, subtrahend);
}
