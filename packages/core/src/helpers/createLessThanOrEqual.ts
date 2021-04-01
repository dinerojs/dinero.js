import { createFunction } from '../utils';

import {
  UnsafeLessThanOrEqualDependencies,
  SafeLessThanOrEqualDependencies,
  unsafeLessThanOrEqual,
  safeLessThanOrEqual,
} from '../api';
import { Dinero } from '../types';

type UnsafeLessThanCalculator<TAmount> = UnsafeLessThanOrEqualDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createUnsafeLessThanOrEqual<TAmount>(
  calculator: UnsafeLessThanCalculator<TAmount>
) {
  return createFunction(unsafeLessThanOrEqual, calculator);
}

type SafeLessThanCalculator<TAmount> = SafeLessThanOrEqualDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createSafeLessThanOrEqual<TAmount>(
  calculator: SafeLessThanCalculator<TAmount>
) {
  return createFunction(safeLessThanOrEqual, calculator);
}
