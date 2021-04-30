import type { Dinero } from '../types';
import { transformScale } from '.';
import type { Dependencies } from './types';

export type MultiplyParams<TAmount> = readonly [
  multiplier: Dinero<TAmount>,
  multiplicand: TAmount,
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
      multiplier,
      multiplicand,
      options = { scale: calculator.zero() },
    ]: MultiplyParams<TAmount>
  ) {
    const { amount, currency, scale } = multiplier.toJSON();
    const newScale = calculator.add(scale, options.scale);

    return convertScaleFn(
      multiplier.create({
        amount: calculator.multiply(amount, multiplicand),
        currency,
        scale: newScale,
      }),
      newScale
    );
  };
}
