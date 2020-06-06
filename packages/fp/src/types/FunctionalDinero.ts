import { DineroSnapshot } from '@dinero.js/core';

type FunctionalDinero<TType> = {
  readonly toJSON: () => DineroSnapshot<TType>;
};

export default FunctionalDinero;
