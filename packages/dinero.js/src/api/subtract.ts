import {
  createUnsafeSubtract,
  createSafeSubtract,
  Dinero,
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
  minuend: Dinero<TAmount>,
  subtrahend: Dinero<TAmount>
) {
  const subtract = createUnsafeSubtract(minuend.calculator);

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
  minuend: Dinero<TAmount>,
  subtrahend: Dinero<TAmount>
) {
  const subtract = createSafeSubtract(minuend.calculator);

  return subtract(minuend, subtrahend);
}
