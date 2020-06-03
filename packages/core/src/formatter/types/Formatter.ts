import { FunctionalDinero } from "@dinero.js/fp";

type Formatter<TType> = (functionalDinero: FunctionalDinero<TType>) => string;

export default Formatter;
