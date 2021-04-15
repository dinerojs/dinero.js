import { convertScale } from '.';
import { maximum } from '../utils';
import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type MultiplyParams<TAmount> = readonly [
  multiplier: Dinero<TAmount>,
  multiplicand: TAmount,
  options?: MultiplyOptions<TAmount>
];

export type MultiplyDependencies<TAmount> = Dependencies<
  TAmount,
  'add' | 'multiply' | 'zero' | 'power' | 'subtract' | 'compare' | 'zero' | 'increment' | 'modulo'
>;

export type MultiplyOptions<TAmount> = {
  readonly scale: TAmount;
};

export function multiply<TAmount>({
  calculator,
}: MultiplyDependencies<TAmount>) {
  const convertScaleFn = convertScale({ calculator });
  const maxFn = maximum(calculator);

  return function _multiply(
    ...[
      multiplier,
      multiplicand,
      options = { scale: calculator.zero() },
    ]: MultiplyParams<TAmount>
  ) {
    const { amount, currency, scale } = multiplier.toJSON();
    const highestScale = maxFn([scale, options.scale]);

    return convertScaleFn(
      multiplier.create({
        amount: calculator.multiply(amount, multiplicand),
        currency,
        scale: calculator.add(scale, options.scale),
      }),
      highestScale
    );
  };
}
