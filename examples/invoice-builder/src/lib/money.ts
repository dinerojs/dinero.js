import {
  dinero,
  add,
  subtract,
  multiply,
  allocate,
  toDecimal,
} from 'dinero.js';
import type { Dinero, DineroCurrency } from 'dinero.js';
import { USD, EUR, GBP, JPY } from 'dinero.js/currencies';

import type { CurrencyCode, DiscountType, LineItem } from '@/lib/invoice-types';

const CURRENCIES = {
  USD,
  EUR,
  GBP,
  JPY,
} as const;

const CURRENCY_LOCALES: Record<CurrencyCode, string> = {
  USD: 'en-US',
  EUR: 'de-DE',
  GBP: 'en-GB',
  JPY: 'ja-JP',
};

const NON_NUMERIC = /[^0-9.-]/g;

/**
 * Convert a decimal string (e.g. "19.99") to an integer amount in minor units.
 * Uses the currency base and exponent so JPY (exponent 0) stays in major units.
 */
export function toMinorUnits<TCurrency extends CurrencyCode>(
  value: string,
  code: TCurrency
): number {
  const cleaned = value.replace(NON_NUMERIC, '');

  if (cleaned === '' || cleaned === '-' || cleaned === '.') {
    return 0;
  }

  const { base, exponent } = CURRENCIES[code];
  const factor = (typeof base === 'number' ? base : base[0]) ** exponent;

  return Math.round(parseFloat(cleaned) * factor);
}

/**
 * Convert an integer amount to a display string for input fields.
 * Uses the currency exponent so JPY returns the value as-is.
 */
export function minorUnitsToInputString<TCurrency extends CurrencyCode>(
  amount: number,
  code: TCurrency
): string {
  if (amount === 0) {
    return '';
  }

  const { exponent } = CURRENCIES[code];

  if (exponent === 0) {
    return String(amount);
  }

  return (amount / 10 ** exponent).toFixed(exponent);
}

/**
 * Compute the line total as a Dinero object.
 */
export function lineTotal<TCurrency extends CurrencyCode>(
  item: LineItem,
  code: TCurrency
): Dinero<number, TCurrency> {
  const price = dinero({
    amount: item.unitPriceCents,
    currency: currencyFor(code),
  });

  return multiply(price, item.quantity);
}

/**
 * Sum of all line totals.
 */
export function invoiceSubtotal<TCurrency extends CurrencyCode>(
  items: LineItem[],
  code: TCurrency
): Dinero<number, TCurrency> {
  return items.reduce<Dinero<number, TCurrency>>(
    (sum, item) => add(sum, lineTotal(item, code)),
    zero(code)
  );
}

/**
 * Scale a float percentage (e.g. 8.25) to an integer ratio pair.
 * 8.25 → [825, 9175] (out of 10000), 5 → [500, 9500], 5.5 → [550, 9450].
 */
function percentageRatios(percentage: number): [number, number] {
  const scaled = Math.round(percentage * 100);

  return [scaled, 10000 - scaled];
}

/**
 * Compute the discount amount as a Dinero object.
 */
export function discountAmount<TCurrency extends CurrencyCode>(
  sub: Dinero<number, TCurrency>,
  discountType: DiscountType,
  discountValue: number,
  code: TCurrency
): Dinero<number, TCurrency> {
  if (discountValue <= 0) {
    return zero(code);
  }

  if (discountType === 'percentage') {
    const [discounted] = allocate(sub, percentageRatios(discountValue));

    return discounted;
  }

  return dinero({ amount: discountValue, currency: currencyFor(code) });
}

/**
 * Compute the tax amount as a Dinero object.
 */
export function taxAmount<TCurrency extends CurrencyCode>(
  sub: Dinero<number, TCurrency>,
  disc: Dinero<number, TCurrency>,
  taxRate: number,
  code: TCurrency
): Dinero<number, TCurrency> {
  if (taxRate <= 0) {
    return zero(code);
  }

  const taxable = subtract(sub, disc);
  const [taxPortion] = allocate(taxable, percentageRatios(taxRate));

  return taxPortion;
}

/**
 * Grand total: subtotal - discount + tax.
 */
export function grandTotal<TCurrency extends CurrencyCode>(
  sub: Dinero<number, TCurrency>,
  discount: Dinero<number, TCurrency>,
  tax: Dinero<number, TCurrency>
): Dinero<number, TCurrency> {
  return add(subtract(sub, discount), tax);
}

/**
 * Format a Dinero object for display (e.g. "$19.99").
 */
export function formatMoney<TCurrency extends CurrencyCode>(
  amount: Dinero<number, TCurrency>,
  code: TCurrency
): string {
  const locale = CURRENCY_LOCALES[code];

  return toDecimal(amount, ({ value, currency }) => {
    return Number(value).toLocaleString(locale, {
      style: 'currency',
      currency: currency.code,
    });
  });
}

/**
 * Format a raw minor-unit amount for display (used in preview for unit prices).
 */
export function formatCents<TCurrency extends CurrencyCode>(
  minorUnits: number,
  code: TCurrency
): string {
  const d = dinero({ amount: minorUnits, currency: currencyFor(code) });

  return formatMoney(d, code);
}

function zero<TCurrency extends CurrencyCode>(
  code: TCurrency
): Dinero<number, TCurrency> {
  return dinero({ amount: 0, currency: currencyFor(code) });
}

function currencyFor<TCurrency extends CurrencyCode>(
  code: TCurrency
): DineroCurrency<number, TCurrency> {
  return CURRENCIES[code] as DineroCurrency<number, TCurrency>;
}
