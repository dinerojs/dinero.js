import type { Calculator } from '../../types';

export type Dependencies<TAmount> = {
  readonly calculator: Calculator<TAmount>;
};
