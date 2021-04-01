import { createFunction } from '../utils';
import { toRoundedUnit, ToRoundedUnitDependencies } from '../api';
import { Dinero } from '../types';

type ToRoundedUnitCalculator<TAmount> = ToRoundedUnitDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createToRoundedUnit<TAmount>(
  calculator: ToRoundedUnitCalculator<TAmount>
) {
  return createFunction(toRoundedUnit, calculator);
}
