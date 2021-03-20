import { DineroSnapshot } from '.';

export type BaseDinero<TAmount> = {
  readonly toJSON: () => DineroSnapshot<TAmount>;
};
