import { PureDinero } from '@dinero.js/pure';

export type Formatter<TAmount> = (pureDinero: PureDinero<TAmount>) => string;
