/* eslint-disable functional/no-expression-statement */
import { BaseDinero } from '../types';
import { RoundingMode } from '../calculator';
import {
  distribute,
  greaterThanOrEqual,
  greaterThan,
} from '../calculator/helpers';
import { Dependencies } from './types';
import { assertValidRatios } from '../guards';

export function unsafeAllocate<TAmount, TDinero extends BaseDinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<
  TAmount,
  TDinero,
  'add' | 'compare' | 'divide' | 'increment' | 'multiply' | 'subtract' | 'zero'
>) {
  return function allocate(
    dineroObject: TDinero,
    ratios: readonly TAmount[],
    down?: RoundingMode<TAmount>
  ) {
    const { amount, currency, scale } = dineroObject.toJSON();
    const shares = distribute(calculator, down)(amount, ratios);

    return shares.map((share) => {
      return factory({
        amount: share,
        currency,
        scale,
      });
    });
  };
}

export function safeAllocate<TAmount, TDinero extends BaseDinero<TAmount>>({
  factory,
  calculator,
}: Dependencies<
  TAmount,
  TDinero,
  'add' | 'compare' | 'divide' | 'increment' | 'multiply' | 'subtract' | 'zero'
>) {
  const allocateFn = unsafeAllocate({ factory, calculator });
  const greaterThanOrEqualFn = greaterThanOrEqual(calculator);
  const greaterThanFn = greaterThan(calculator);

  return function allocate(
    dineroObject: TDinero,
    ratios: readonly TAmount[],
    down?: RoundingMode<TAmount>
  ) {
    const condition =
      ratios.length > 0 &&
      ratios.every((ratio) => greaterThanOrEqualFn(ratio, calculator.zero())) &&
      ratios.some((ratio) => greaterThanFn(ratio, calculator.zero()));

    assertValidRatios(condition);

    return allocateFn(dineroObject, ratios, down);
  };
}
