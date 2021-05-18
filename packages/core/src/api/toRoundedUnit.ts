import type { Dinero, RoundingOptions } from '../types';
import type { Dependencies } from './types';

export type ToRoundedUnitParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  options: RoundingOptions<TAmount>
];

export type ToRoundedUnitDependencies<TAmount> = Dependencies<
  TAmount,
  'multiply' | 'power' | 'toNumber'
>;

export function toRoundedUnit<TAmount>({
  calculator,
}: ToRoundedUnitDependencies<TAmount>) {
  return function toRoundedUnitFn(
    ...[
      dineroObject,
      { digits, round = (value: number) => value },
    ]: ToRoundedUnitParams<TAmount>
  ) {
    const { amount, currency, scale } = dineroObject.toJSON();
    const { power, toNumber } = calculator;

    const toUnitFactor = toNumber(power(currency.base, scale));
    const factor = toNumber(power(currency.base, digits ?? currency.exponent));

    return round((toNumber(amount) / toUnitFactor) * factor) / factor;
  };
}
