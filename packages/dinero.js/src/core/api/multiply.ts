import type { DineroCalculator, Dinero, DineroScaledAmount } from '../types';
import { getAmountAndScale } from '../utils';

import { transformScale } from './transformScale';

export type MultiplyParams<TAmount> = readonly [
  multiplicand: Dinero<TAmount>,
  multiplier: DineroScaledAmount<TAmount> | TAmount,
];

export function multiply<TAmount>(calculator: DineroCalculator<TAmount>) {
  const convertScaleFn = transformScale(calculator);
  const zero = calculator.zero();

  return function multiplyFn(
    ...[multiplicand, multiplier]: MultiplyParams<TAmount>
  ) {
    const { amount, currency, scale } = multiplicand.toJSON();
    const { amount: multiplierAmount, scale: multiplierScale } =
      getAmountAndScale(multiplier, zero);

    const newScale = calculator.add(scale, multiplierScale);

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
