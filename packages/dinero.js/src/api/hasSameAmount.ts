import { haveSameAmount, DineroOptions, Calculator } from '@dinero.js/core';
import { ChainableDinero } from '../types';

function chainableHasSameAmount<TAmount>(
  dineroFactory: (options: DineroOptions<TAmount>) => ChainableDinero<TAmount>,
  calculator: Calculator<TAmount>
) {
  return haveSameAmount(dineroFactory, calculator);
}

export default chainableHasSameAmount;
