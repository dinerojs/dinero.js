import { DineroSnapshot } from '.';

type BaseDinero<TAmount> = {
  readonly toJSON: () => DineroSnapshot<TAmount>;
};

export default BaseDinero;
