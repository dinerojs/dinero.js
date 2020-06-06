import { RoundingMode } from '@dinero.js/_/calculator';
import { Currency } from '@dinero.js/currencies';

import FunctionalDinero from './FunctionalDinero';
import DineroSnapshot from './DineroSnapshot';

type Rates<TType> = Readonly<Promise<{ readonly [key: string]: TType }>>;

type OODinero<TType> = FunctionalDinero<TType> & {
  readonly convertPrecision: (
    newPrecision: TType,
    roundingMode?: RoundingMode<TType>
  ) => OODinero<TType>;
  readonly add: (addend: OODinero<TType>) => OODinero<TType>;
  readonly subtract: (subtrahend: OODinero<TType>) => OODinero<TType>;
  readonly multiply: (
    multiplier: OODinero<TType>,
    roundingMode?: RoundingMode<TType>
  ) => OODinero<TType>;
  readonly divide: (
    divisor: OODinero<TType>,
    roundingMode?: RoundingMode<TType>
  ) => OODinero<TType>;
  readonly percentage: (percentage: TType) => OODinero<TType>;
  readonly allocate: (
    ratios: readonly TType[]
  ) => ReadonlyArray<OODinero<TType>>;
  readonly convert: (
    currency: Currency<TType>,
    {
      rates,
      roundingMode,
    }: {
      readonly rates: Rates<TType>;
      readonly roundingMode?: RoundingMode<TType>;
    }
  ) => Readonly<Promise<OODinero<TType>>>;
  readonly equalsTo: (comparator: OODinero<TType>) => boolean;
  readonly lessThan: (comparator: OODinero<TType>) => boolean;
  readonly lessThanOrEqual: (comparator: OODinero<TType>) => boolean;
  readonly greaterThan: (comparator: OODinero<TType>) => boolean;
  readonly greaterThanOrEqual: (comparator: OODinero<TType>) => boolean;
  readonly isZero: () => boolean;
  readonly isPositive: () => boolean;
  readonly isNegative: () => boolean;
  readonly hasSubUnits: () => boolean;
  readonly hasSameCurrency: (comparator: OODinero<TType>) => boolean;
  readonly hasSameAmount: (comparator: OODinero<TType>) => boolean;
  readonly toFormat: (
    format: string,
    roundingMode?: RoundingMode<TType>
  ) => string;
  readonly toUnit: () => TType;
  readonly toRoundedUnit: (
    digits: TType,
    roundingMode?: RoundingMode<TType>
  ) => TType;
  readonly toObject: () => DineroSnapshot<TType>;
  readonly toJSON: () => DineroSnapshot<TType>;
};

export default OODinero;
