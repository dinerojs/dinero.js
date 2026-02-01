import type {
  DineroCalculator,
  DineroFormatter,
  DineroOptions,
  DineroSnapshot,
} from '.';

export type Dinero<TAmount> = {
  readonly calculator: DineroCalculator<TAmount>;
  readonly formatter: DineroFormatter<TAmount>;
  readonly create: (options: DineroOptions<TAmount>) => Dinero<TAmount>;
  readonly toJSON: () => DineroSnapshot<TAmount>;
};
