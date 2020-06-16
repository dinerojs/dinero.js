import { FunctionalDinero } from '@dinero.js/fp';

type Formatter<TAmountType> = (functionalDinero: FunctionalDinero<TAmountType>) => string;

export default Formatter;
