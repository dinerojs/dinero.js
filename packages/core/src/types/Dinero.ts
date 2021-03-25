import { DineroSnapshot } from '.';

export type Dinero<TAmount> = {
  readonly toJSON: () => DineroSnapshot<TAmount>;
};
