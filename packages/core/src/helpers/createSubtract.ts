import { createFunction } from '../utils';

import {
  unsafeSubtract,
  safeSubtract,
  UnsafeSubtractDependencies,
  SafeSubtractDependencies,
} from '../api';
import { Dinero } from '../types';

type UnsafeSubtractCalculator<TAmount> = UnsafeSubtractDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createUnsafeSubtract<TAmount>(
  calculator: UnsafeSubtractCalculator<TAmount>
) {
  return createFunction(unsafeSubtract, calculator);
}

type SafeSubtractCalculator<TAmount> = SafeSubtractDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createSafeSubtract<TAmount>(
  calculator: SafeSubtractCalculator<TAmount>
) {
  return createFunction(safeSubtract, calculator);
}
