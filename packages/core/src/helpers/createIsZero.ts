import { createFunction } from '../utils';
import { isZero, IsZeroDependencies } from '../api';

type IsZeroCalculator<TAmount> = IsZeroDependencies<TAmount>['calculator'];

export function createIsZero<TAmount>(calculator: IsZeroCalculator<TAmount>) {
  return createFunction(isZero, calculator);
}
