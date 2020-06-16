import { DineroSnapshot } from '@dinero.js/core';

type FunctionalDinero<TAmountType> = {
  readonly toJSON: () => DineroSnapshot<TAmountType>;
};

export default FunctionalDinero;
