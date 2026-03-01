import { dinero, add, multiply, allocate, toDecimal, convert } from 'dinero.js';
import type { Dinero, DineroCurrency } from 'dinero.js';
import { USD, EUR } from 'dinero.js/currencies';

import type { CurrencyCode } from '@/types';

const CURRENCIES_MAP = { USD, EUR } as const;

const CURRENCY_LOCALES: Record<CurrencyCode, string> = {
  USD: 'en-US',
  EUR: 'fr-FR',
};

export function currencyFor<TCode extends CurrencyCode>(
  code: TCode
): DineroCurrency<number, TCode> {
  return CURRENCIES_MAP[code] as DineroCurrency<number, TCode>;
}

export function zero(code: CurrencyCode): Dinero<number> {
  return dinero({ amount: 0, currency: currencyFor(code) });
}

export function fromMinorUnits(
  amount: number,
  code: CurrencyCode
): Dinero<number> {
  return dinero({ amount, currency: currencyFor(code) });
}

export function convertCurrency(
  amount: Dinero<number>,
  targetCode: CurrencyCode
): Dinero<number> {
  if (targetCode === 'USD') {
    return amount;
  }

  return convert(amount, currencyFor(targetCode), {
    [currencyFor(targetCode).code]: { amount: 83, scale: 2 },
  });
}

export function formatMoney(
  amount: Dinero<number>,
  code: CurrencyCode
): string {
  const locale = CURRENCY_LOCALES[code];

  return toDecimal(amount, ({ value, currency }) =>
    Number(value).toLocaleString(locale, {
      style: 'currency',
      currency: currency.code,
    })
  );
}

export { add, multiply, allocate };
