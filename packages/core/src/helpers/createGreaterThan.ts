import { createFunction } from '../utils';

import {
  UnsafeGreaterThanDependencies,
  SafeGreaterThanDependencies,
  unsafeGreaterThan,
  safeGreaterThan,
} from '../api';

type UnsafeGreaterThanCalculator<TAmount> = UnsafeGreaterThanDependencies<
  TAmount
>['calculator'];

export function createUnsafeGreaterThan<TAmount>(
  calculator: UnsafeGreaterThanCalculator<TAmount>
) {
  return createFunction(unsafeGreaterThan, calculator);
}

type SafeGreaterThanCalculator<TAmount> = SafeGreaterThanDependencies<
  TAmount
>['calculator'];

export function createSafeGreaterThan<TAmount>(
  calculator: SafeGreaterThanCalculator<TAmount>
) {
  return createFunction(safeGreaterThan, calculator);
}
