import { Dinero } from '../../types';

export type Formatter<TAmount> = (dineroObject: Dinero<TAmount>) => string;
