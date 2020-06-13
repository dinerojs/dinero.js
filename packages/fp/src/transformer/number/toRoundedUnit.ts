import { RoundingMode } from '@dinero.js/core';
import {
  multiply,
  divide,
  power,
  halfEven,
} from '@dinero.js/core/calculator/number';
import { FunctionalDinero } from '../../..';
import { toSnapshot, toUnit } from '.';

/**
 * Get the amount of a functional Dinero object in rounded units.
 *
 * @param functionalDinero The functional Dinero object to transform.
 * @param digits The number of fraction digits to round to.
 * @param roundingMode The rounding mode to use.
 *
 * @returns The amount in rounded units.
 */
function toRoundedUnit(
  functionalDinero: FunctionalDinero<number>,
  digits: number,
  roundingMode: RoundingMode<number> = halfEven
) {
  const { currency } = toSnapshot(functionalDinero);
  const factor = power(currency.base, digits);

  return divide(
    roundingMode(multiply(toUnit(functionalDinero), factor)),
    factor
  );
}

export default toRoundedUnit;
