import { FunctionalDinero } from '..';

type PartialFunctionalDinero<TAmountType> = (
  amount: TAmountType
) => FunctionalDinero<TAmountType>;

export default PartialFunctionalDinero;
