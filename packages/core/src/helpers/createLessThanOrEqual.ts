import { createFunction } from '../utils';

import {
  UnsafeLessThanOrEqualDependencies,
  SafeLessThanOrEqualDependencies,
  unsafeLessThanOrEqual,
  safeLessThanOrEqual,
} from '../api';

type UnsafeLessThanCalculator<TAmount> = UnsafeLessThanOrEqualDependencies<
  TAmount
>['calculator'];

export function createUnsafeLessThanOrEqual<TAmount>(
  calculator: UnsafeLessThanCalculator<TAmount>
) {
  return createFunction(unsafeLessThanOrEqual, calculator);
}

type SafeLessThanCalculator<TAmount> = SafeLessThanOrEqualDependencies<
  TAmount
>['calculator'];

export function createSafeLessThanOrEqual<TAmount>(
  calculator: SafeLessThanCalculator<TAmount>
) {
  return createFunction(safeLessThanOrEqual, calculator);
}
