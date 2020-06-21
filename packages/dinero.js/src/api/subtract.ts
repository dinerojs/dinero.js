import { DineroOptions, subtract, Calculator } from '@dinero.js/core';
import { ChainableDinero } from '../types';

function chainableSubtract<TAmount>(
  dineroFactory: (options: DineroOptions<TAmount>) => ChainableDinero<TAmount>,
  calculator: Calculator<TAmount>
) {
  return subtract(dineroFactory, calculator);
}

export default chainableSubtract;
