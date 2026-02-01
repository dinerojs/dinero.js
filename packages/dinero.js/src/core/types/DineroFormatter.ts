export type DineroFormatter<TAmount> = {
  readonly toNumber: (value?: TAmount) => number;
  readonly toString: (value?: TAmount) => string;
};
