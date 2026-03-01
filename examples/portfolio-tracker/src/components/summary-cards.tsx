import { TrendingUp, TrendingDown, Wallet, Globe, Trophy } from 'lucide-react';

import type { CurrencyCode } from '@/lib/types';

interface SummaryCardsProps {
  totalValueFormatted: string;
  totalChange: { amount: number; percent: number };
  bestPerformer: { name: string; changePercent: number } | null;
  currencyExposure: number;
  holdingsCount: number;
  baseCurrency: CurrencyCode;
}

export function SummaryCards({
  totalValueFormatted,
  totalChange,
  bestPerformer,
  currencyExposure,
  holdingsCount,
  baseCurrency,
}: SummaryCardsProps) {
  const isPositive = totalChange.amount >= 0;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <div className="relative overflow-hidden rounded-lg border border-border p-4 shadow-xl shadow-black/20 backdrop-blur-xl bg-white/3">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/4 to-transparent" />
        <div className="relative">
          <div className="mb-2 flex items-center gap-1.5 min-w-0">
            <Wallet
              className="h-3.5 w-3.5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span className="truncate text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Total Value
            </span>
          </div>
          <p className="text-xl font-extrabold tabular-nums tracking-tight text-foreground sm:text-2xl lg:text-3xl">
            {totalValueFormatted}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            across {holdingsCount} holding{holdingsCount !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-border p-4 shadow-xl shadow-black/20 backdrop-blur-xl bg-white/3">
        <div className="relative">
          <div className="mb-2 flex items-center gap-1.5 min-w-0">
            {isPositive ? (
              <TrendingUp
                className="h-3.5 w-3.5 shrink-0 text-positive"
                aria-hidden="true"
              />
            ) : (
              <TrendingDown
                className="h-3.5 w-3.5 shrink-0 text-destructive"
                aria-hidden="true"
              />
            )}
            <span className="truncate text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Today{'\u2019'}s Change
            </span>
          </div>
          <p
            className="text-xl font-extrabold tabular-nums tracking-tight transition-colors duration-300 sm:text-2xl lg:text-3xl"
            style={{ color: isPositive ? 'var(--positive)' : 'var(--loss)' }}
          >
            {isPositive ? '+' : ''}
            {formatChangeAmount(totalChange.amount, baseCurrency)}
          </p>
          <p
            className="mt-1 text-[11px] font-semibold tabular-nums"
            style={{ color: isPositive ? 'var(--positive)' : 'var(--loss)' }}
          >
            {isPositive ? '+' : ''}
            {totalChange.percent.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-border p-4 shadow-xl shadow-black/20 backdrop-blur-xl bg-white/3">
        <div className="relative">
          <div className="mb-2 flex items-center gap-1.5 min-w-0">
            <Trophy
              className="h-3.5 w-3.5 shrink-0 text-warning"
              aria-hidden="true"
            />
            <span className="truncate text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Best Performer
            </span>
          </div>
          {bestPerformer ? (
            <>
              <p className="truncate text-lg font-bold text-foreground">
                {bestPerformer.name || 'Unnamed'}
              </p>
              <p
                className="mt-1 text-[11px] font-semibold tabular-nums"
                style={{
                  color:
                    bestPerformer.changePercent >= 0
                      ? 'var(--positive)'
                      : 'var(--loss)',
                }}
              >
                {bestPerformer.changePercent >= 0 ? '+' : ''}
                {bestPerformer.changePercent.toFixed(2)}% today
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No holdings</p>
          )}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-border p-4 shadow-xl shadow-black/20 backdrop-blur-xl bg-white/3">
        <div className="relative">
          <div className="mb-2 flex items-center gap-1.5 min-w-0">
            <Globe
              className="h-3.5 w-3.5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span className="truncate text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Currencies
            </span>
          </div>
          <p className="text-xl font-extrabold tabular-nums tracking-tight text-foreground sm:text-2xl lg:text-3xl">
            {currencyExposure}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            currency exposure{currencyExposure !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
}

function formatChangeAmount(amount: number, currency: CurrencyCode): string {
  const locale = currency === 'JPY' ? 'ja-JP' : 'en-US';

  return Math.abs(amount).toLocaleString(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'JPY' ? 0 : 2,
    maximumFractionDigits: currency === 'JPY' ? 0 : 2,
  });
}
