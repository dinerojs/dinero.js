import { FunctionalDinero } from '..';

type PartialFunctionalDinero<TAmount> = (
  amount: TAmount
) => FunctionalDinero<TAmount>;

export default PartialFunctionalDinero;
