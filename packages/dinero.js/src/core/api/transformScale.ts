import { down } from '../divide';
import type { DineroCalculator, Dinero, DineroDivideOperation } from '../types';
import { computeBase, greaterThan } from '../utils';

export type TransformScaleParams<
  TAmount,
  TCurrency extends string = string,
> = readonly [
  dineroObject: Dinero<TAmount, TCurrency>,
  newScale: TAmount,
  divide?: DineroDivideOperation,
];

export function transformScale<TAmount>(calculator: DineroCalculator<TAmount>) {
  const greaterThanFn = greaterThan(calculator);
  const computeBaseFn = computeBase(calculator);

  return function transformScaleFn<TCurrency extends string>(
    ...[dineroObject, newScale, divide = down]: TransformScaleParams<
      TAmount,
      TCurrency
    >
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
