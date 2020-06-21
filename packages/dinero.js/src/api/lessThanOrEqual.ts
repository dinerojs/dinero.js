import { DineroOptions, lessThanOrEqual, Calculator } from '@dinero.js/core';
import { ChainableDinero } from '../types';

function chainableLessThanOrEqual<TAmount>(
  dineroFactory: (options: DineroOptions<TAmount>) => ChainableDinero<TAmount>,
  calculator: Calculator<TAmount>
) {
  return lessThanOrEqual(dineroFactory, calculator);
}

export default chainableLessThanOrEqual;
