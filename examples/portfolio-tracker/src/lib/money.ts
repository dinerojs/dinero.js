import { dinero, add, multiply, toDecimal, convert } from 'dinero.js';
import type { Dinero, DineroCurrency, DineroRates } from 'dinero.js';
import { USD, EUR, GBP, JPY } from 'dinero.js/currencies';

import type { CurrencyCode } from '@/lib/types';

const CURRENCIES_MAP = { USD, EUR, GBP, JPY } as const;

const CURRENCY_LOCALES: Record<CurrencyCode, string> = {
  USD: 'en-US',
  EUR: 'de-DE',
  GBP: 'en-GB',
  JPY: 'ja-JP',
};

const NON_NUMERIC = /[^0-9.-]/g;

/**
 * Hardcoded realistic exchange rates (base: USD).
 * 1 USD = X of target currency.
 */
const BASE_RATES_FROM_USD: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
};

export function currencyFor<TCode extends CurrencyCode>(
  code: TCode
): DineroCurrency<number, TCode> {
  return CURRENCIES_MAP[code] as DineroCurrency<number, TCode>;
}

function scaleFor(code: CurrencyCode): number {
  const { base, exponent } = currencyFor(code);

  return (typeof base === 'number' ? base : base[0]) ** exponent;
}

/**
 * Convert a decimal string (e.g. "198.50") to an integer amount in minor units.
 */
export function toMinorUnits(value: string, code: CurrencyCode): number {
  const cleaned = value.replace(NON_NUMERIC, '');

  if (cleaned === '' || cleaned === '-' || cleaned === '.') {
    return 0;
  }

  return Math.round(parseFloat(cleaned) * scaleFor(code));
}

/**
 * Convert minor-unit amount back to a display string for input fields.
 */
export function minorUnitsToInputString(
  amount: number,
  code: CurrencyCode
): string {
  if (amount === 0) {
    return '';
  }

  const { exponent } = currencyFor(code);

  if (exponent === 0) {
    return String(amount);
  }

  return (amount / 10 ** exponent).toFixed(exponent);
}

export function zero<TCode extends CurrencyCode>(
  code: TCode
): Dinero<number, TCode> {
  return dinero({ amount: 0, currency: currencyFor(code) });
}

export function fromMinorUnits<TCode extends CurrencyCode>(
  amount: number,
  code: TCode
): Dinero<number, TCode> {
  return dinero({ amount, currency: currencyFor(code) });
}

/**
 * Count the number of decimal places in a number.
 */
function countDecimals(n: number): number {
  const str = String(n);
  const dotIndex = str.indexOf('.');

  return dotIndex === -1 ? 0 : str.length - dotIndex - 1;
}

/**
 * Compute the total value of a holding: quantity * unitPrice.
 * `unitPriceCents` is in minor units; `quantity` can be fractional.
 * Uses a scaled amount for `multiply` to avoid non-integer intermediate results.
 */
export function holdingValue<TCode extends CurrencyCode>(
  unitPriceCents: number,
  quantity: number,
  code: TCode
): Dinero<number, TCode> {
  const price = fromMinorUnits(unitPriceCents, code);
  const scale = countDecimals(quantity);

  return multiply(price, { amount: Math.round(quantity * 10 ** scale), scale });
}

/**
 * Build a Dinero.js-compatible Rates object for converting from `from` to `to`.
 */
function buildRates<TFrom extends CurrencyCode, TTo extends CurrencyCode>(
  from: TFrom,
  to: TTo
): DineroRates<number> {
  const fromToUsd = 1 / BASE_RATES_FROM_USD[from];
  const usdToTarget = BASE_RATES_FROM_USD[to];
  const rate = fromToUsd * usdToTarget;

  const toCurrency = currencyFor(to);
  const scale = scaleFor(to);
  const scaledRate = Math.round(rate * scale);

  return {
    [toCurrency.code]: {
      amount: scaledRate,
      scale: toCurrency.exponent,
    },
  } as DineroRates<number>;
}

/**
 * Convert a Dinero object from one currency to another.
 */
export function convertToBase<
  TFrom extends CurrencyCode,
  TTo extends CurrencyCode,
>(amount: Dinero<number, TFrom>, from: TFrom, to: TTo): Dinero<number, TTo> {
  if (from === (to as string)) {
    return amount as unknown as Dinero<number, TTo>;
  }

  return convert(amount, currencyFor(to), buildRates(from, to));
}

/**
 * Sum an array of Dinero objects in the same currency.
 */
export function sumDineros<TCode extends CurrencyCode>(
  items: Dinero<number, TCode>[],
  code: TCode
): Dinero<number, TCode> {
  return items.reduce((sum, item) => add(sum, item), zero(code));
}

/**
 * Get the raw exchange rate number from one currency to another.
 */
export function getRate(from: CurrencyCode, to: CurrencyCode): number {
  if (from === to) {
    return 1;
  }

  const fromToUsd = 1 / BASE_RATES_FROM_USD[from];

  return fromToUsd * BASE_RATES_FROM_USD[to];
}

/**
 * Display string for exchange rates: "1 USD = 0.9200 EUR"
 */
export function getRateDisplay(from: CurrencyCode, to: CurrencyCode): string {
  const rate = getRate(from, to);
  const decimals = to === 'JPY' ? 2 : 4;

  return `1 ${from} = ${rate.toFixed(decimals)} ${to}`;
}

/**
 * Format a Dinero object for display (e.g. "$2,977.50").
 */
export function formatMoney<TCode extends CurrencyCode>(
  amount: Dinero<number, TCode>,
  code: TCode
): string {
  const locale = CURRENCY_LOCALES[code];

  return toDecimal(amount, ({ value, currency }) =>
    Number(value).toLocaleString(locale, {
      style: 'currency',
      currency: currency.code,
    })
  );
}

/**
 * Format a raw minor-unit amount for display.
 */
export function formatCents<TCode extends CurrencyCode>(
  minorUnits: number,
  code: TCode
): string {
  return formatMoney(fromMinorUnits(minorUnits, code), code);
}
