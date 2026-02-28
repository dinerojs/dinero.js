import type {
  DineroCalculator,
  DineroFormatter,
  DineroOptions,
  DineroSnapshot,
} from '.';

export type Dinero<TAmount, TCurrency extends string = string> = {
  readonly calculator: DineroCalculator<TAmount>;
  readonly formatter: DineroFormatter<TAmount>;
  readonly create: <TC extends string = TCurrency>(
    options: DineroOptions<TAmount, TC>
  ) => Dinero<TAmount, TC>;
  readonly toJSON: () => DineroSnapshot<TAmount, TCurrency>;
};
