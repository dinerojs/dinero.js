import { DineroOptions, allocate, Calculator } from '@dinero.js/core';
import { ChainableDinero } from '../types';

function chainableAllocate<TAmount>(
  dineroFactory: (options: DineroOptions<TAmount>) => ChainableDinero<TAmount>,
  calculator: Calculator<TAmount>
) {
  return allocate(dineroFactory, calculator);
}

export default chainableAllocate;
