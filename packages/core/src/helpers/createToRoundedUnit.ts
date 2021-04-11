import { createFunction } from '../utils';
import { toRoundedUnit, ToRoundedUnitDependencies } from '../api';

type ToRoundedUnitCalculator<TAmount> = ToRoundedUnitDependencies<
  TAmount
>['calculator'];

export function createToRoundedUnit<TAmount>(
  calculator: ToRoundedUnitCalculator<TAmount>
) {
  return createFunction(toRoundedUnit, calculator);
}
