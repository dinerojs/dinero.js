import { transformScale } from './transformScale';

import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type MultiplyParams<TAmount> = readonly [
  multiplicand: Dinero<TAmount>,
  multiplier: TAmount,
  options?: MultiplyOptions<TAmount>
];

export type MultiplyDependencies<TAmount> = Dependencies<
  TAmount,
  'add' | 'multiply' | 'zero' | 'power' | 'subtract' | 'integerDivide'
>;

export type MultiplyOptions<TAmount> = {
  readonly scale: TAmount;
};

export function multiply<TAmount>({
  calculator,
}: MultiplyDependencies<TAmount>) {
  const convertScaleFn = transformScale({ calculator });

  return function multiplyFn(
    ...[
      multiplicand,
      multiplier,
      options = { scale: calculator.zero() },
    ]: MultiplyParams<TAmount>
  ) {
    const { amount, currency, scale } = multiplicand.toJSON();
    const newScale = calculator.add(scale, options.scale);

    return convertScaleFn(
      multiplicand.create({
        amount: calculator.multiply(amount, multiplier),
        currency,
        scale: newScale,
      }),
      newScale
    );
  };
}
