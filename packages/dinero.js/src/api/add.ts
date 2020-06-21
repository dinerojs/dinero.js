import { DineroOptions, add, Calculator } from '@dinero.js/core';
import { ChainableDinero } from '../types';

function chainableAdd<TAmount>(
  dineroFactory: (options: DineroOptions<TAmount>) => ChainableDinero<TAmount>,
  calculator: Calculator<TAmount>
) {
  return add(dineroFactory, calculator);
}

export default chainableAdd;
