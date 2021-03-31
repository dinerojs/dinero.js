import { Dinero } from '.';

export type PartialDinero<TAmount> = (amount: TAmount) => Dinero<TAmount>;
