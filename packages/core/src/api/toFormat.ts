import { Calculator } from '../calculator';
import { BaseDinero } from '../types';
import { Transformer, FormatOptions } from '../formatter';
import toRoundedUnit from './toRoundedUnit';

function toFormat<TAmount, TDinero extends BaseDinero<TAmount>>(
  calculator: Pick<
    Calculator<TAmount>,
    'multiply' | 'divide' | 'power' | 'round'
  >
) {
  return (
    dineroObject: TDinero,
    transformer: Transformer<TAmount>,
    { digits, roundingMode }: FormatOptions<TAmount>
  ) => {
    const { currency } = dineroObject.toJSON();

    const amount = toRoundedUnit<TAmount>(calculator)(
      dineroObject,
      digits || currency.exponent,
      roundingMode || calculator.round
    );

    return transformer({ amount, currency });
  };
}

export default toFormat;
