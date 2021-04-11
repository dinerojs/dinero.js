import { convertScale } from '.';
import { maximum } from '../utils';
import { Dinero } from '../types';
import { Dependencies } from './types';

export type MultiplyDependencies<TAmount> = Dependencies<
  TAmount,
  'add' | 'multiply' | 'zero' | 'power' | 'round' | 'subtract' | 'compare'
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
    multiplier: Dinero<TAmount>,
    multiplicand: TAmount,
    options: MultiplyOptions<TAmount> = { scale: calculator.zero() }
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
