import { createFunction } from '../utils';

import {
  UnsafeLessThanDependencies,
  SafeLessThanDependencies,
  unsafeLessThan,
  safeLessThan,
} from '../api';
import { Dinero } from '../types';

type UnsafeLessThanCalculator<TAmount> = UnsafeLessThanDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createUnsafeLessThan<TAmount>(
  calculator: UnsafeLessThanCalculator<TAmount>
) {
  return createFunction(unsafeLessThan, calculator);
}

type SafeLessThanCalculator<TAmount> = SafeLessThanDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createSafeLessThan<TAmount>(
  calculator: SafeLessThanCalculator<TAmount>
) {
  return createFunction(safeLessThan, calculator);
}
