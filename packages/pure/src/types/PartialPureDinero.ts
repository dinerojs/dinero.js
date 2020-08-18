import { PureDinero } from '..';

type PartialPureDinero<TAmount> = (
  amount: TAmount
) => PureDinero<TAmount>;

export default PartialPureDinero;
