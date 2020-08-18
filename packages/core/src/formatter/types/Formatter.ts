import { PureDinero } from '@dinero.js/pure';

type Formatter<TAmount> = (pureDinero: PureDinero<TAmount>) => string;

export default Formatter;
