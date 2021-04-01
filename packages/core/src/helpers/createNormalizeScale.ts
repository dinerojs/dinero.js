import { createFunction } from '../utils';

import { normalizeScale, NormalizeScaleDependencies } from '../api';
import { Dinero } from '../types';

type NormalizeScaleCalculator<TAmount> = NormalizeScaleDependencies<
  TAmount,
  Dinero<TAmount>
>['calculator'];

export function createNormalizeScale<TAmount>(
  calculator: NormalizeScaleCalculator<TAmount>
) {
  return createFunction(normalizeScale, calculator);
}
