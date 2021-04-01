import { createFunction } from '../utils';
import { isZero, IsZeroDependencies } from '../api';
import { Dinero } from '../types';

type IsZeroCalculator<TAmount> = IsZeroDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createIsZero<TAmount>(calculator: IsZeroCalculator<TAmount>) {
  return createFunction(isZero, calculator);
}
