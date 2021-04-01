import { createFunction } from '../utils';

import {
  unsafeAllocate,
  safeAllocate,
  UnsafeAllocateDependencies,
  SafeAllocateDependencies,
} from '../api';
import { Dinero } from '../types';

type UnsafeAllocateCalculator<TAmount> = UnsafeAllocateDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createUnsafeAllocate<TAmount>(
  calculator: UnsafeAllocateCalculator<TAmount>
) {
  return createFunction(unsafeAllocate, calculator);
}

type SafeAllocateCalculator<TAmount> = SafeAllocateDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createSafeAllocate<TAmount>(
  calculator: SafeAllocateCalculator<TAmount>
) {
  return createFunction(safeAllocate, calculator);
}
