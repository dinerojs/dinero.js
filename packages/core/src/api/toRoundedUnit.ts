import { RoundingMode } from '@dinero.js/calculator';
import { Dinero } from '../types';
import { toUnit } from '.';
import { Dependencies } from './types';

export type ToRoundedUnitDependencies<TAmount> = Dependencies<
  TAmount,
  'multiply' | 'divide' | 'power' | 'round'
>;

export function toRoundedUnit<TAmount>({
  calculator,
}: ToRoundedUnitDependencies<TAmount>) {
  const toUnitFn = toUnit({ calculator });

  return function _toRoundedUnit(
    dineroObject: Dinero<TAmount>,
    digits: TAmount,
    roundingMode: RoundingMode<TAmount> = calculator.round
  ) {
    const { currency } = dineroObject.toJSON();
    const factor = calculator.power(currency.base, digits);

    return calculator.divide(
      roundingMode(calculator.multiply(toUnitFn(dineroObject), factor)),
      factor
    );
  };
}
