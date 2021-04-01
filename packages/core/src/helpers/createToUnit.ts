import { createFunction } from '../utils';
import { toUnit, ToUnitDependencies } from '../api';
import { Dinero } from '../types';

type ToUnitCalculator<TAmount> = ToUnitDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createToUnit<TAmount>(calculator: ToUnitCalculator<TAmount>) {
  return createFunction(toUnit, calculator);
}
