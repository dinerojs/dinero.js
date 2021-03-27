/* eslint-disable functional/no-expression-statement */
import { Dinero } from '../types';
import { distribute, greaterThanOrEqual, greaterThan } from '../utils';
import { Dependencies } from './types';
import { assertValidRatios } from '../guards';

export function unsafeAllocate<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<
  TAmount,
  TDinero,
  | 'add'
  | 'compare'
  | 'divide'
  | 'increment'
  | 'multiply'
  | 'round'
  | 'subtract'
  | 'zero'
>) {
  return function allocate(dineroObject: TDinero, ratios: readonly TAmount[]) {
    const { amount, currency, scale } = dineroObject.toJSON();
    const shares = distribute(calculator, calculator.round)(amount, ratios);

    return shares.map((share) => {
      return factory({
        amount: share,
        currency,
        scale,
      });
    });
  };
}

export function safeAllocate<TAmount, TDinero extends Dinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<
  TAmount,
  TDinero,
  | 'add'
  | 'compare'
  | 'divide'
  | 'increment'
  | 'multiply'
  | 'round'
  | 'subtract'
  | 'zero'
>) {
  const allocateFn = unsafeAllocate({ factory, calculator });
  const greaterThanOrEqualFn = greaterThanOrEqual(calculator);
  const greaterThanFn = greaterThan(calculator);

  return function allocate(dineroObject: TDinero, ratios: readonly TAmount[]) {
    const condition =
      ratios.length > 0 &&
      ratios.every((ratio) => greaterThanOrEqualFn(ratio, calculator.zero())) &&
      ratios.some((ratio) => greaterThanFn(ratio, calculator.zero()));

    assertValidRatios(condition);

    return allocateFn(dineroObject, ratios);
  };
}
