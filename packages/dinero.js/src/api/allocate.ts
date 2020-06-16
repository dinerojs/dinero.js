import { DineroOptions } from '@dinero.js/core';
import { ChainableDinero, Calculator } from '../types';

function allocate<TAmountType>(
  dineroFactory: (options: DineroOptions<TAmountType>) => ChainableDinero<TAmountType>,
  calculator: Calculator<TAmountType>
) {
  return (dineroObject: ChainableDinero<TAmountType>, ratios: readonly TAmountType[]) => {
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
