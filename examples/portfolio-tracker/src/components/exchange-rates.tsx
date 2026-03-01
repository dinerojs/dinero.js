import { RefreshCw } from 'lucide-react';

import type { CurrencyCode } from '@/lib/types';
import { CURRENCIES } from '@/lib/types';
import { getRateDisplay } from '@/lib/money';

interface ExchangeRatesCardProps {
  baseCurrency: CurrencyCode;
}

export function ExchangeRatesCard({ baseCurrency }: ExchangeRatesCardProps) {
  const otherCurrencies = CURRENCIES.filter((c) => c !== baseCurrency);

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-xl shadow-black/20">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Exchange Rates
        </h3>
        <button
          type="button"
          className="rounded-md p-1.5 text-muted-foreground transition-[background-color,color] duration-150 hover:bg-white/4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label="Refresh rates"
        >
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
      <div className="space-y-2">
        {otherCurrencies.map((currency) => (
          <div
            key={currency}
            className="flex items-center justify-between gap-3 rounded-md bg-surface-raised px-3 py-2"
          >
            <span className="shrink-0 text-xs font-medium text-muted-foreground">
              {baseCurrency} / {currency}
            </span>
            <span className="min-w-0 truncate text-xs font-semibold tabular-nums text-foreground">
              {getRateDisplay(baseCurrency, currency)}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-muted-foreground">
        Last updated: Mar 1, 2026 09:30 UTC
      </p>
    </div>
  );
}
