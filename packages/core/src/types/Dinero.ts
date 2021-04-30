import type { Calculator } from '@dinero.js/calculator';

import type { DineroOptions, DineroSnapshot } from '.';

export type Dinero<TAmount> = {
  readonly calculator: Calculator<TAmount>;
  readonly create: (options: DineroOptions<TAmount>) => Dinero<TAmount>;
  readonly toJSON: () => DineroSnapshot<TAmount>;
};
