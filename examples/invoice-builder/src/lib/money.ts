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

export const CURRENCIES: Record<CurrencyCode, DineroCurrency<number>> = {
  USD,
  EUR,
  GBP,
  JPY,
};

export const CURRENCY_LOCALES: Record<CurrencyCode, string> = {
  USD: 'en-US',
  EUR: 'de-DE',
  GBP: 'en-GB',
  JPY: 'ja-JP',
};

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
