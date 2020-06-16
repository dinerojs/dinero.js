import { DineroOptions } from '@dinero.js/core';
import { ChainableDinero, Calculator } from '../types';

function allocate<TType>(
  dineroFactory: (options: DineroOptions<TType>) => ChainableDinero<TType>,
  calculator: Calculator<TType>
) {
  return (dineroObject: ChainableDinero<TType>, ratios: readonly TType[]) => {
    const shares = calculator.distribute(dineroObject.getAmount(), ratios);

    return shares.map((share) =>
      dineroFactory({
        amount: share,
        currency: dineroObject.getCurrency(),
        scale: dineroObject.getScale(),
      })
    );
  };
}

export default allocate;
