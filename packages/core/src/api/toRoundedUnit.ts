import type { Dinero, RoundingOptions } from '../types';
import { toUnit } from '.';
import type { Dependencies } from './types';

export type ToRoundedUnitParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  options: RoundingOptions<TAmount>
];

export type ToRoundedUnitDependencies<TAmount> = Dependencies<
  TAmount,
  'multiply' | 'divide' | 'power'
>;

export function toRoundedUnit<TAmount>({
  calculator,
}: ToRoundedUnitDependencies<TAmount>) {
  const toUnitFn = toUnit({ calculator });

  return function _toRoundedUnit(
    ...[
      dineroObject,
      { digits, roundingMode = (value: TAmount) => value }
    ]: ToRoundedUnitParams<TAmount>
  ) {
    const { currency } = dineroObject.toJSON();
    const factor = calculator.power(currency.base, digits ?? currency.exponent);

    return calculator.divide(
      roundingMode(calculator.multiply(toUnitFn(dineroObject), factor)),
      factor
    );
  };
}
