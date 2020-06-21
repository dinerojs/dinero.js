import {
  RoundingMode,
  DineroSnapshot,
  Transformer,
  Rates,
  BaseDinero,
} from '@dinero.js/core';
import { Currency } from '@dinero.js/currencies';

type FormatOptions<TAmount> = {
  readonly digits?: TAmount;
  readonly roundingMode?: RoundingMode<TAmount>;
};

type ChainableDinero<TAmount> = BaseDinero<TAmount> & {
  readonly getAmount: () => TAmount;
  readonly getCurrency: () => Currency<TAmount>;
  readonly getScale: () => TAmount;
  readonly convertScale: (
    newScale: TAmount,
    roundingMode?: RoundingMode<TAmount>
  ) => ChainableDinero<TAmount>;
  readonly add: (addend: ChainableDinero<TAmount>) => ChainableDinero<TAmount>;
  readonly subtract: (
    subtrahend: ChainableDinero<TAmount>
  ) => ChainableDinero<TAmount>;
  readonly multiply: (
    multiplier: TAmount,
    roundingMode?: RoundingMode<TAmount>
  ) => ChainableDinero<TAmount>;
  readonly divide: (
    divisor: TAmount,
    roundingMode?: RoundingMode<TAmount>
  ) => ChainableDinero<TAmount>;
  readonly percentage: (percentage: TAmount) => ChainableDinero<TAmount>;
  readonly allocate: (
    ratios: readonly TAmount[]
  ) => ReadonlyArray<ChainableDinero<TAmount>>;
  readonly convert: (
    currency: Currency<TAmount>,
    {
      rates,
      roundingMode,
    }: {
      readonly rates: Readonly<Promise<Rates<TAmount>>>;
      readonly roundingMode?: RoundingMode<TAmount>;
    }
  ) => Readonly<Promise<ChainableDinero<TAmount>>>;
  readonly equalsTo: (comparator: ChainableDinero<TAmount>) => boolean;
  readonly lessThan: (comparator: ChainableDinero<TAmount>) => boolean;
  readonly lessThanOrEqual: (comparator: ChainableDinero<TAmount>) => boolean;
  readonly greaterThan: (comparator: ChainableDinero<TAmount>) => boolean;
  readonly greaterThanOrEqual: (
    comparator: ChainableDinero<TAmount>
  ) => boolean;
  readonly isZero: () => boolean;
  readonly isPositive: () => boolean;
  readonly isNegative: () => boolean;
  readonly hasSubUnits: () => boolean;
  readonly hasSameCurrency: (comparator: ChainableDinero<TAmount>) => boolean;
  readonly hasSameAmount: (comparator: ChainableDinero<TAmount>) => boolean;
  readonly toFormat: (
    transformer: Transformer<TAmount>,
    formatOptions: FormatOptions<TAmount>
  ) => string;
  readonly toUnit: () => TAmount;
  readonly toRoundedUnit: (
    digits: TAmount,
    roundingMode?: RoundingMode<TAmount>
  ) => TAmount;
  readonly toSnapshot: () => DineroSnapshot<TAmount>;
};

export default ChainableDinero;
