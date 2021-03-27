import { PureDinero } from '..';

export type PartialPureDinero<TAmount> = (
  amount: TAmount
) => PureDinero<TAmount>;
