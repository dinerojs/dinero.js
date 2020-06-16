import {
  RoundingMode,
  DineroSnapshot,
  Transformer,
  Rates,
} from '@dinero.js/core';
import { Currency } from '@dinero.js/currencies';
import { FunctionalDinero } from '@dinero.js/fp';

type FormatOptions<TType> = {
  readonly digits?: TType;
  readonly roundingMode?: RoundingMode<TType>;
};

type ChainableDinero<TType> = FunctionalDinero<TType> & {
  readonly getAmount: () => TType;
  readonly getCurrency: () => Currency<TType>;
  readonly getScale: () => TType;
  readonly convertScale: (
    newScale: TType,
    roundingMode?: RoundingMode<TType>
  ) => ChainableDinero<TType>;
  readonly add: (addend: ChainableDinero<TType>) => ChainableDinero<TType>;
  readonly subtract: (
    subtrahend: ChainableDinero<TType>
  ) => ChainableDinero<TType>;
  readonly multiply: (
    multiplier: TType,
    roundingMode?: RoundingMode<TType>
  ) => ChainableDinero<TType>;
  readonly divide: (
    divisor: TType,
    roundingMode?: RoundingMode<TType>
  ) => ChainableDinero<TType>;
  readonly percentage: (percentage: TType) => ChainableDinero<TType>;
  readonly allocate: (
    ratios: readonly TType[]
  ) => ReadonlyArray<ChainableDinero<TType>>;
  readonly convert: (
    currency: Currency<TType>,
    {
      rates,
      roundingMode,
    }: {
      readonly rates: Rates<TType>;
      readonly roundingMode?: RoundingMode<TType>;
    }
  ) => Readonly<Promise<ChainableDinero<TType>>>;
  readonly equalsTo: (comparator: ChainableDinero<TType>) => boolean;
  readonly lessThan: (comparator: ChainableDinero<TType>) => boolean;
  readonly lessThanOrEqual: (comparator: ChainableDinero<TType>) => boolean;
  readonly greaterThan: (comparator: ChainableDinero<TType>) => boolean;
  readonly greaterThanOrEqual: (comparator: ChainableDinero<TType>) => boolean;
  readonly isZero: () => boolean;
  readonly isPositive: () => boolean;
  readonly isNegative: () => boolean;
  readonly hasSubUnits: () => boolean;
  readonly hasSameCurrency: (comparator: ChainableDinero<TType>) => boolean;
  readonly hasSameAmount: (comparator: ChainableDinero<TType>) => boolean;
  readonly toFormat: (
    transformer: Transformer<TType>,
    formatOptions: FormatOptions<TType>
  ) => string;
  readonly toUnit: () => TType;
  readonly toRoundedUnit: (
    digits: TType,
    roundingMode?: RoundingMode<TType>
  ) => TType;
  readonly toSnapshot: () => DineroSnapshot<TType>;
};

export default ChainableDinero;
