import { convertScale } from '.';
import { maximum } from '../utils';
import { Dinero } from '../types';
import { Dependencies } from './types';

type MultiplyOptions<TAmount> = {
  readonly scale: TAmount;
};

export function unsafeMultiply<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<
  TAmount,
  TDinero,
  'add' | 'multiply' | 'zero' | 'power' | 'round' | 'subtract' | 'compare'
>) {
  const convertScaleFn = convertScale({ factory, calculator });
  const maxFn = maximum(calculator);

  return function multiply(
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

export function safeMultiply<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<
  TAmount,
  TDinero,
  'add' | 'multiply' | 'zero' | 'power' | 'round' | 'subtract' | 'compare'
>) {
  const multiplyFn = unsafeMultiply({ factory, calculator });

  return function _multiply(
    multiplier: TDinero,
    multiplicand: TAmount,
    options?: MultiplyOptions<TAmount>
  ) {
    return multiplyFn(multiplier, multiplicand, options);
  };
}
