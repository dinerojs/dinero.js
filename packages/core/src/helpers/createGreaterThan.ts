import { createFunction } from '../utils';

import {
  UnsafeGreaterThanDependencies,
  SafeGreaterThanDependencies,
  unsafeGreaterThan,
  safeGreaterThan,
} from '../api';
import { Dinero } from '../types';

type UnsafeGreaterThanCalculator<TAmount> = UnsafeGreaterThanDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createUnsafeGreaterThan<TAmount>(
  calculator: UnsafeGreaterThanCalculator<TAmount>
) {
  return createFunction(unsafeGreaterThan, calculator);
}

type SafeGreaterThanCalculator<TAmount> = SafeGreaterThanDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createSafeGreaterThan<TAmount>(
  calculator: SafeGreaterThanCalculator<TAmount>
) {
  return createFunction(safeGreaterThan, calculator);
}
