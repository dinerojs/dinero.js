import { createFunction } from '../utils';
import { toUnit, ToUnitDependencies } from '../api';

type ToUnitCalculator<TAmount> = ToUnitDependencies<TAmount>['calculator'];

export function createToUnit<TAmount>(calculator: ToUnitCalculator<TAmount>) {
  return createFunction(toUnit, calculator);
}
