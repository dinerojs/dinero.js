import { DineroOptions, percentage, Calculator } from '@dinero.js/core';
import { ChainableDinero } from '../types';

function chainablePercentage<TAmount>(
  dineroFactory: (options: DineroOptions<TAmount>) => ChainableDinero<TAmount>,
  calculator: Calculator<TAmount>
) {
  return percentage(dineroFactory, calculator);
}

export default chainablePercentage;
