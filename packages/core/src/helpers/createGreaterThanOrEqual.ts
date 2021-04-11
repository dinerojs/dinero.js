import { createFunction } from '../utils';

import {
  UnsafeGreaterThanOrEqualDependencies,
  SafeGreaterThanOrEqualDependencies,
  unsafeGreaterThanOrEqual,
  safeGreaterThanOrEqual,
} from '../api';

type UnsafeGreaterThanCalculator<
  TAmount
> = UnsafeGreaterThanOrEqualDependencies<TAmount>['calculator'];

export function createUnsafeGreaterThanOrEqual<TAmount>(
  calculator: UnsafeGreaterThanCalculator<TAmount>
) {
  return createFunction(unsafeGreaterThanOrEqual, calculator);
}

type SafeGreaterThanCalculator<TAmount> = SafeGreaterThanOrEqualDependencies<
  TAmount
>['calculator'];

export function createSafeGreaterThanOrEqual<TAmount>(
  calculator: SafeGreaterThanCalculator<TAmount>
) {
  return createFunction(safeGreaterThanOrEqual, calculator);
}
