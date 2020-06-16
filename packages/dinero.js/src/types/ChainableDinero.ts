import {
  RoundingMode,
  DineroSnapshot,
  Transformer,
  Rates,
} from '@dinero.js/core';
import { Currency } from '@dinero.js/currencies';
import { FunctionalDinero } from '@dinero.js/fp';

type FormatOptions<TAmountType> = {
  readonly digits?: TAmountType;
  readonly roundingMode?: RoundingMode<TAmountType>;
};

type ChainableDinero<TAmountType> = FunctionalDinero<TAmountType> & {
  readonly getAmount: () => TAmountType;
  readonly getCurrency: () => Currency<TAmountType>;
  readonly getScale: () => TAmountType;
  readonly convertScale: (
    newScale: TAmountType,
    roundingMode?: RoundingMode<TAmountType>
  ) => ChainableDinero<TAmountType>;
  readonly add: (addend: ChainableDinero<TAmountType>) => ChainableDinero<TAmountType>;
  readonly subtract: (
    subtrahend: ChainableDinero<TAmountType>
  ) => ChainableDinero<TAmountType>;
  readonly multiply: (
    multiplier: TAmountType,
    roundingMode?: RoundingMode<TAmountType>
  ) => ChainableDinero<TAmountType>;
  readonly divide: (
    divisor: TAmountType,
    roundingMode?: RoundingMode<TAmountType>
  ) => ChainableDinero<TAmountType>;
  readonly percentage: (percentage: TAmountType) => ChainableDinero<TAmountType>;
  readonly allocate: (
    ratios: readonly TAmountType[]
  ) => ReadonlyArray<ChainableDinero<TAmountType>>;
  readonly convert: (
    currency: Currency<TAmountType>,
    {
      rates,
      roundingMode,
    }: {
      readonly rates: Rates<TAmountType>;
      readonly roundingMode?: RoundingMode<TAmountType>;
    }
  ) => Readonly<Promise<ChainableDinero<TAmountType>>>;
  readonly equalsTo: (comparator: ChainableDinero<TAmountType>) => boolean;
  readonly lessThan: (comparator: ChainableDinero<TAmountType>) => boolean;
  readonly lessThanOrEqual: (comparator: ChainableDinero<TAmountType>) => boolean;
  readonly greaterThan: (comparator: ChainableDinero<TAmountType>) => boolean;
  readonly greaterThanOrEqual: (comparator: ChainableDinero<TAmountType>) => boolean;
  readonly isZero: () => boolean;
  readonly isPositive: () => boolean;
  readonly isNegative: () => boolean;
  readonly hasSubUnits: () => boolean;
  readonly hasSameCurrency: (comparator: ChainableDinero<TAmountType>) => boolean;
  readonly hasSameAmount: (comparator: ChainableDinero<TAmountType>) => boolean;
  readonly toFormat: (
    transformer: Transformer<TAmountType>,
    formatOptions: FormatOptions<TAmountType>
  ) => string;
  readonly toUnit: () => TAmountType;
  readonly toRoundedUnit: (
    digits: TAmountType,
    roundingMode?: RoundingMode<TAmountType>
  ) => TAmountType;
  readonly toSnapshot: () => DineroSnapshot<TAmountType>;
};

export default ChainableDinero;
