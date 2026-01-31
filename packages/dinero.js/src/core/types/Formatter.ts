export type Formatter<TAmount> = {
  readonly toNumber: (value?: TAmount) => number;
  readonly toString: (value?: TAmount) => string;
};
