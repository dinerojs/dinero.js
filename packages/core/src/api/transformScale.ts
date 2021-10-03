import { down } from '../divide';
import type { Calculator, Dinero, DivideOperation } from '../types';
import { computeBase, greaterThan } from '../utils';

export type TransformScaleParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  newScale: TAmount,
  divide?: DivideOperation
];

export function transformScale<TAmount>(calculator: Calculator<TAmount>) {
  const greaterThanFn = greaterThan(calculator);
  const computeBaseFn = computeBase(calculator);

  return function transformScaleFn(
    ...[dineroObject, newScale, divide = down]: TransformScaleParams<TAmount>
  ) {
    const { amount, currency, scale } = dineroObject.toJSON();

    const isLarger = greaterThanFn(newScale, scale);
    const operation = isLarger ? calculator.multiply : divide;
    const [a, b] = isLarger ? [newScale, scale] : [scale, newScale];
    const base = computeBaseFn(currency.base);

    const factor = calculator.power(base, calculator.subtract(a, b));

    return dineroObject.create({
      amount: operation(amount, factor, calculator),
      currency,
      scale: newScale,
    });
  };
}
