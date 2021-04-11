import { createFunction } from '../utils';

import {
  UnsafeLessThanDependencies,
  SafeLessThanDependencies,
  unsafeLessThan,
  safeLessThan,
} from '../api';

type UnsafeLessThanCalculator<TAmount> = UnsafeLessThanDependencies<
  TAmount
>['calculator'];

export function createUnsafeLessThan<TAmount>(
  calculator: UnsafeLessThanCalculator<TAmount>
) {
  return createFunction(unsafeLessThan, calculator);
}

type SafeLessThanCalculator<TAmount> = SafeLessThanDependencies<
  TAmount
>['calculator'];

export function createSafeLessThan<TAmount>(
  calculator: SafeLessThanCalculator<TAmount>
) {
  return createFunction(safeLessThan, calculator);
}
