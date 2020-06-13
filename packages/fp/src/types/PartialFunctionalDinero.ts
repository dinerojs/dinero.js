import { FunctionalDinero } from '..';

type PartialFunctionalDinero<TType> = (
  amount: TType
) => FunctionalDinero<TType>;

export default PartialFunctionalDinero;
