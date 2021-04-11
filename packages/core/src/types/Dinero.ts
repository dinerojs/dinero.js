/* eslint-disable functional/no-mixed-type */
import { Calculator } from '@dinero.js/calculator';

import { DineroSnapshot } from '.';
import { DineroOptions } from './DineroOptions';

export type Dinero<TAmount> = {
  readonly calculator: Calculator<TAmount>;
  readonly create: ({
    amount,
    currency,
    scale,
  }: DineroOptions<TAmount>) => Dinero<TAmount>;
  readonly toJSON: () => DineroSnapshot<TAmount>;
};
