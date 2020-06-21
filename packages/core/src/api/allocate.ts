import { DineroOptions, BaseDinero } from '../types';
import { Calculator } from '../calculator';

function allocate<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: (options: DineroOptions<TAmount>) => TDinero,
  calculator: Pick<Calculator<TAmount>, 'distribute'>
) {
  return (dineroObject: TDinero, ratios: readonly TAmount[]) => {
    const { amount, currency, scale } = dineroObject.toJSON();
    const shares = calculator.distribute(amount, ratios);

    return shares.map((share) =>
      dineroFactory({
        amount: share,
        currency,
        scale,
      })
    );
  };
}

export default allocate;
