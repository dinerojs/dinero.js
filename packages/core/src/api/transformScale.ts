import type { Calculator, Dinero } from '../types';
import { computeBase, greaterThan } from '../utils';

export type TransformScaleParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  newScale: TAmount
];

export function transformScale<TAmount>(calculator: Calculator<TAmount>) {
  const greaterThanFn = greaterThan(calculator);
  const computeBaseFn = computeBase(calculator);

  return function transformScaleFn(
    ...[dineroObject, newScale]: TransformScaleParams<TAmount>
  ) {
    const { amount, currency, scale } = dineroObject.toJSON();

    const isLarger = greaterThanFn(newScale, scale);
    const operation = isLarger ? calculator.multiply : calculator.integerDivide;
    const [a, b] = isLarger ? [newScale, scale] : [scale, newScale];
    const base = computeBaseFn(currency.base);

    const factor = calculator.power(base, calculator.subtract(a, b));

    return dineroObject.create({
      amount: operation(amount, factor),
      currency,
      scale: newScale,
    });
  };
}
