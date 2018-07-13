declare namespace dinero {
  type Options = Partial<ObjectLiteral>

  interface ConversionOptions {
    endpoint: string,
    propertyPath: string,
    headers?: object,
    roundingMode?: RoundingMode
  }

  type RoundingMode = 'HALF_ODD'
    | 'HALF_EVEN'
    | 'HALF_UP'
    | 'HALF_DOWN'
    | 'HALF_TOWARDS_ZERO'
    | 'HALF_AWAY_FROM_ZERO'

  interface Constructor {
    (options: Options): Dinero
    new (options: Options): Dinero
  }

  interface ObjectLiteral {
    amount: number,
    currency: string,
    precision: number
  }
  
  interface Defaults {
    defaultAmount: number,
    defaultCurrency: string
    defaultPrecision: number
  }

  interface Globals {
    globalLocale: string,
    globalFormat: string,
    globalRoundingMode: RoundingMode,
    globalFormatRoundingMode: RoundingMode,
    globalExchangeRatesApi: {
      endpoint: string,
      propertyPath: string,
      headers: object
    }
  }
}

declare type Dinero = Base & dinero.Defaults & dinero.Globals

declare function Constructor(options: dinero.Options): Dinero;

declare interface Base {
  getAmount(): number;
  getCurrency(): string;
  getLocale(): string;
  setLocale(newLocale: string): Dinero;
  getPrecision(): number;
  convertPrecision(newPrecision: number): Dinero;
  add(addend: Dinero): Dinero;
  subtract(subtrahend: Dinero): Dinero;
  multiply(multiplier: number, roundingMode?: dinero.RoundingMode): Dinero;
  divide(divisor: number, roundingMode?: dinero.RoundingMode): Dinero;
  percentage(percentage: number): Dinero;
  allocate(ratios: number[]): Dinero[];
  convert(currency: string): Promise<Dinero>;
  equalsTo(comparator: Dinero): boolean;
  lessThan(comparator: Dinero): boolean;
  lessThanOrEqual(comparator: Dinero): boolean;
  greaterThan(comparator: Dinero): boolean;
  greaterThanOrEqual(comparator: Dinero): boolean;
  isZero(): boolean;
  isPositive(): boolean;
  isNegative(): boolean;
  hasSubUnits(): boolean;
  // deprecated
  hasCents(): boolean;
  hasSameCurrency(comparator: Dinero): boolean;
  hasSameAmount(comparator: Dinero): boolean;
  toFormat(format?: string, roundingMode?: dinero.RoundingMode): string;
  toUnit(): number;
  toRoundedUnit(digits, roundingMode?: dinero.RoundingMode): number;
  toObject(): dinero.ObjectLiteral;
  normalizePrecision(objects: Dinero[]): Dinero[];
}

declare module 'dinero.js' {
  export = Constructor
}
