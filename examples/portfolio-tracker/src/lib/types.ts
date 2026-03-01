export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY';

export type Category =
  | 'Stocks'
  | 'Crypto'
  | 'Cash'
  | 'Bonds'
  | 'Real Estate'
  | 'Other';

export interface Holding {
  id: string;
  name: string;
  category: Category;
  quantity: number;
  unitPriceCents: number;
  currency: CurrencyCode;
}

export const CURRENCIES: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'JPY'];

export const CATEGORIES: Category[] = [
  'Stocks',
  'Crypto',
  'Cash',
  'Bonds',
  'Real Estate',
  'Other',
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Stocks: '#60a5fa',
  Crypto: '#fb923c',
  Cash: '#34d399',
  Bonds: '#c084fc',
  'Real Estate': '#fbbf24',
  Other: '#9ca3af',
};

export const CURRENCY_COLORS: Record<CurrencyCode, string> = {
  USD: '#60a5fa',
  EUR: '#34d399',
  GBP: '#fb923c',
  JPY: '#f472b6',
};
