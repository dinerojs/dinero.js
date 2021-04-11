import type { Dinero } from '.';

export type Formatter<TAmount> = (dineroObject: Dinero<TAmount>) => string;
