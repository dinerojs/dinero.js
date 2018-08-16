export type Options = Partial<ObjectLiteral>

export interface ConversionOptions {
  readonly endpoint: string
  readonly propertyPath: string
  readonly headers?: object
  readonly roundingMode?: RoundingMode
}

// Omit taken from https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type ExchangeRatesApi = Omit<ConversionOptions, "roundingMode">

export type RoundingMode =
  | 'HALF_ODD'
  | 'HALF_EVEN'
  | 'HALF_UP'
  | 'HALF_DOWN'
  | 'HALF_TOWARDS_ZERO'
  | 'HALF_AWAY_FROM_ZERO'

export interface ObjectLiteral {
  readonly amount: number,
  readonly currency: string,
  readonly precision: number
}

export interface Defaults {
  defaultAmount: number
  defaultCurrency: string
  defaultPrecision: number
}

interface Globals {
  globalLocale: string
  globalFormat: string
  globalRoundingMode: RoundingMode
  globalFormatRoundingMode: RoundingMode
  globalExchangeRatesApi: ExchangeRatesApi
}

export type Dinero = Base & Defaults & Globals

interface Base {
  getAmount(): number
  getCurrency(): string
  getLocale(): string
  setLocale(newLocale: string): Dinero
  getPrecision(): number
  convertPrecision(newPrecision: number): Dinero
  add(addend: Dinero): Dinero
  subtract(subtrahend: Dinero): Dinero
  multiply(multiplier: number, roundingMode?: RoundingMode): Dinero
  divide(divisor: number, roundingMode?: RoundingMode): Dinero
  percentage(percentage: number): Dinero
  allocate(ratios: number[]): Dinero[]
  convert(currency: string, options: ConversionOptions): Promise<Dinero>
  equalsTo(comparator: Dinero): boolean
  lessThan(comparator: Dinero): boolean
  lessThanOrEqual(comparator: Dinero): boolean
  greaterThan(comparator: Dinero): boolean
  greaterThanOrEqual(comparator: Dinero): boolean
  isZero(): boolean
  isPositive(): boolean
  isNegative(): boolean
  hasSubUnits(): boolean
  /**
   * @deprecated since version 1.4.0, will be removed in 2.0.0.
   * Use {@link hasSubUnits} instead.
   */
  hasCents(): boolean
  hasSameCurrency(comparator: Dinero): boolean
  hasSameAmount(comparator: Dinero): boolean
  toFormat(format?: string, roundingMode?: RoundingMode): string
  toUnit(): number
  toRoundedUnit(digits, roundingMode?: RoundingMode): number
  toObject(): ObjectLiteral
  normalizePrecision(objects: Dinero[]): Dinero[]
}

export default function DineroConstructor(options: Options): Dinero
