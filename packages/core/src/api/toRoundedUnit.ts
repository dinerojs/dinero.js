import { RoundingMode } from '@dinero.js/calculator';
import { Dinero } from '../types';
import { toUnit } from '.';
import { Dependencies } from './types';

export type ToRoundedUnitDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<TAmount, TDinero, 'multiply' | 'divide' | 'power' | 'round'>;

export function toRoundedUnit<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: ToRoundedUnitDependencies<TAmount, TDinero>) {
  const toUnitFn = toUnit({ factory, calculator });

  return function _toRoundedUnit(
    dineroObject: TDinero,
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
