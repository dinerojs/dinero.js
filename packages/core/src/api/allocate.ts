import { BaseDinero, DineroFactory } from '../types';
import { Calculator, RoundingMode } from '../calculator';
import { distribute } from '../helpers';

function allocate<TAmount, TDinero extends BaseDinero<TAmount>>(
  dineroFactory: DineroFactory<TAmount, TDinero>,
  calculator: Pick<
    Calculator<TAmount>,
    | 'add'
    | 'compare'
    | 'divide'
    | 'increment'
    | 'multiply'
    | 'subtract'
    | 'zero'
  >
) {
  return (
    dineroObject: TDinero,
    ratios: readonly TAmount[],
    down?: RoundingMode<TAmount>
  ) => {
    const { amount, currency, scale } = dineroObject.toJSON();
    const shares = distribute(calculator, down)(amount, ratios);

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
