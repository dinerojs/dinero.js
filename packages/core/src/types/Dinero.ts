import type { Calculator } from '@dinero.js/calculator';

import type { DineroSnapshot, DineroOptions } from '.';

export type Dinero<TAmount> = {
  readonly calculator: Calculator<TAmount>;
  readonly create: (options: DineroOptions<TAmount>) => Dinero<TAmount>;
  readonly toJSON: () => DineroSnapshot<TAmount>;
};
