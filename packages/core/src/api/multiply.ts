import { convertScale } from '.';
import { maximum } from '../utils';
import { Dinero } from '../types';
import { Dependencies } from './types';

export type MultiplyDependencies<
  TAmount,
  TDinero extends Dinero<TAmount>
> = Dependencies<
  TAmount,
  TDinero,
  'add' | 'multiply' | 'zero' | 'power' | 'round' | 'subtract' | 'compare'
>;

type MultiplyOptions<TAmount> = {
  readonly scale: TAmount;
};

export function multiply<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: MultiplyDependencies<TAmount, TDinero>) {
  const convertScaleFn = convertScale({ factory, calculator });
  const maxFn = maximum(calculator);

  return function _multiply(
    multiplier: TDinero,
    multiplicand: TAmount,
    options: MultiplyOptions<TAmount> = { scale: calculator.zero() }
  ) {
    const { amount, currency, scale } = multiplier.toJSON();
    const highestScale = maxFn([scale, options.scale]);

    return convertScaleFn(
      factory({
        amount: calculator.multiply(amount, multiplicand),
        currency,
        scale: calculator.add(scale, options.scale),
      }),
      highestScale
    );
  };
}
