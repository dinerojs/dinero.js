import type { Calculator, Dinero, ScaledAmount } from '../types';
import { getAmountAndScale } from '../utils';

import { transformScale } from './transformScale';

export type MultiplyParams<TAmount> = readonly [
  multiplicand: Dinero<TAmount>,
  multiplier: ScaledAmount<TAmount> | TAmount
];

export function multiply<TAmount>(
  calculator: Calculator<TAmount>
): (
  multiplicand: Dinero<TAmount>,
  multiplier: ScaledAmount<TAmount> | TAmount
) => Dinero<TAmount> {
  const convertScaleFn = transformScale(calculator);
  const zero = calculator.zero();

  return function multiplyFn(
    ...[multiplicand, multiplier]: MultiplyParams<TAmount>
  ): Dinero<TAmount> {
    const { amount, currency, scale } = multiplicand.toJSON();
    const { amount: multiplierAmount, scale: multiplierScale } =
      getAmountAndScale(multiplier, zero);

    const newScale = calculator.add(scale, multiplierScale ?? zero);

    return convertScaleFn(
      multiplicand.create({
        amount: calculator.multiply(amount, multiplierAmount),
        currency,
        scale: newScale,
      }),
      newScale
    );
  };
}
