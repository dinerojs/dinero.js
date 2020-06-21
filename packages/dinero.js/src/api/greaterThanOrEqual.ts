import { DineroOptions, greaterThanOrEqual, Calculator } from '@dinero.js/core';
import { ChainableDinero } from '../types';

function chainableGreaterThanOrEqual<TAmount>(
  dineroFactory: (options: DineroOptions<TAmount>) => ChainableDinero<TAmount>,
  calculator: Calculator<TAmount>
) {
  return greaterThanOrEqual(dineroFactory, calculator);
}

export default chainableGreaterThanOrEqual;
