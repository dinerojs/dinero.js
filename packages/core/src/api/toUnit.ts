import type { Calculator, Dinero, RoundingOptions } from '../types';

export type ToUnitParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  options?: RoundingOptions<TAmount>
];

export function toUnit<TAmount>(calculator: Calculator<TAmount>) {
  return function toUnitFn(...[dineroObject, options]: ToUnitParams<TAmount>) {
    const round = options?.round || identity;
    const { amount, currency, scale } = dineroObject.toJSON();
    const { power, toNumber } = calculator;

    const toUnitFactor = toNumber(power(currency.base, scale));
    const factor = toNumber(power(currency.base, options?.digits ?? scale));

    return round((toNumber(amount) / toUnitFactor) * factor) / factor;
  };
}

function identity<TValue>(value: TValue) {
  return value;
}
