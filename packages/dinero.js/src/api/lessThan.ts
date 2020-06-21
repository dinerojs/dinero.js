import { DineroOptions, lessThan, Calculator } from '@dinero.js/core';
import { ChainableDinero } from '../types';

function chainableLessThan<TAmount>(
  dineroFactory: (options: DineroOptions<TAmount>) => ChainableDinero<TAmount>,
  calculator: Calculator<TAmount>
) {
  return lessThan(dineroFactory, calculator);
}

export default chainableLessThan;
