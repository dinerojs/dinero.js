import type { RoundingMode } from '@dinero.js/calculator';
import type { Dinero } from '../types';
import { toUnit } from '.';
import type { Dependencies } from './types';

export type ToRoundedUnitParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  digits: TAmount,
  roundingMode?: RoundingMode<TAmount>
];

export type ToRoundedUnitDependencies<TAmount> = Dependencies<
  TAmount,
  'multiply' | 'divide' | 'power' | 'round'
>;

export function toRoundedUnit<TAmount>({
  calculator,
}: ToRoundedUnitDependencies<TAmount>) {
  const toUnitFn = toUnit({ calculator });

  return function _toRoundedUnit(
    ...[
      dineroObject,
      digits,
      roundingMode = calculator.round,
    ]: ToRoundedUnitParams<TAmount>
  ) {
    const { currency } = dineroObject.toJSON();
    const factor = calculator.power(currency.base, digits);

    return calculator.divide(
      roundingMode(calculator.multiply(toUnitFn(dineroObject), factor)),
      factor
    );
  };
}
