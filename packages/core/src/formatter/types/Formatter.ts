import { BaseDinero } from '../../types';

export type Formatter<TAmount> = (dineroObject: BaseDinero<TAmount>) => string;
