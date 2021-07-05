import { isScaledAmount } from '../utils';

import { transformScale } from './transformScale';

import type { ScaledAmount } from '../../dist/esm';
import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type MultiplyParams<TAmount> = readonly [
  multiplicand: Dinero<TAmount>,
  multiplier: ScaledAmount<TAmount> | TAmount
];

export type MultiplyDependencies<TAmount> = Dependencies<
  TAmount,
  'add' | 'multiply' | 'zero' | 'power' | 'subtract' | 'integerDivide'
>;

export function multiply<TAmount>({
  calculator,
}: MultiplyDependencies<TAmount>) {
  const convertScaleFn = transformScale({ calculator });

  return function multiplyFn(
    ...[multiplicand, multiplier]: MultiplyParams<TAmount>
  ) {
    const zero = calculator.zero();
    const { amount, currency, scale } = multiplicand.toJSON();

    const multiplierAmount = isScaledAmount(multiplier)
      ? multiplier.amount
      : multiplier;
    const multiplierScale = isScaledAmount(multiplier)
      ? multiplier?.scale ?? zero
      : zero;

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
