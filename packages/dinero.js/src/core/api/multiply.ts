import type { DineroCalculator, Dinero, DineroScaledAmount } from '../types';
import { getAmountAndScale } from '../utils';

import { transformScale } from './transformScale';

export type MultiplyParams<
  TAmount,
  TCurrency extends string = string,
> = readonly [
  multiplicand: Dinero<TAmount, TCurrency>,
  multiplier: DineroScaledAmount<TAmount> | TAmount,
];

export function multiply<TAmount>(calculator: DineroCalculator<TAmount>) {
  const convertScaleFn = transformScale(calculator);
  const zero = calculator.zero();

  return function multiplyFn<TCurrency extends string>(
    ...[multiplicand, multiplier]: MultiplyParams<TAmount, TCurrency>
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
