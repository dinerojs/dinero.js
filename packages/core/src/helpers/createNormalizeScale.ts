import { createFunction } from '../utils';

import { normalizeScale, NormalizeScaleDependencies } from '../api';

type NormalizeScaleCalculator<TAmount> = NormalizeScaleDependencies<
  TAmount
>['calculator'];

export function createNormalizeScale<TAmount>(
  calculator: NormalizeScaleCalculator<TAmount>
) {
  return createFunction(normalizeScale, calculator);
}
