import { DineroOptions, normalizeScale, Calculator } from '@dinero.js/core';
import { ChainableDinero } from '../types';

function chainableNormalizeScale<TAmount>(
  dineroFactory: (options: DineroOptions<TAmount>) => ChainableDinero<TAmount>,
  calculator: Calculator<TAmount>
) {
  return normalizeScale(dineroFactory, calculator);
}

export default chainableNormalizeScale;
