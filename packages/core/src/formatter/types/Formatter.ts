import { FunctionalDinero } from '@dinero.js/fp';

type Formatter<TAmount> = (
  functionalDinero: FunctionalDinero<TAmount>
) => string;

export default Formatter;
