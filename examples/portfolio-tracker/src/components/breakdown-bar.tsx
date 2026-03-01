import type { CurrencyCode } from '@/lib/types';

interface BreakdownItem {
  label: string;
  value: number;
  percent: number;
  color: string;
}

interface BreakdownBarProps {
  title: string;
  items: BreakdownItem[];
  baseCurrency: CurrencyCode;
}

function formatValue(amount: number, currency: CurrencyCode): string {
  const locale = currency === 'JPY' ? 'ja-JP' : 'en-US';
  return amount.toLocaleString(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'JPY' ? 0 : 2,
    maximumFractionDigits: currency === 'JPY' ? 0 : 2,
  });
}

export function BreakdownBar({
  title,
  items,
  baseCurrency,
}: BreakdownBarProps) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-xl shadow-black/20">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h3>

      {/* Stacked bar */}
      <div className="mb-4 flex h-3 overflow-hidden rounded-full bg-white/[0.04]">
        {items.map((item) => (
          <div
            key={item.label}
            className="h-full transition-[width] duration-500 first:rounded-l-full last:rounded-r-full"
            style={{
              width: `${Math.max(item.percent, 0.5)}%`,
              backgroundColor: item.color,
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-2 rounded-md bg-surface-raised px-3 py-2"
          >
            <div className="flex min-w-0 items-center gap-2">
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate text-xs font-medium text-foreground">
                {item.label}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden text-xs tabular-nums text-muted-foreground sm:inline">
                {formatValue(item.value, baseCurrency)}
              </span>
              <span
                className="rounded-md px-1.5 py-0.5 text-[10px] font-bold tabular-nums"
                style={{
                  backgroundColor: `${item.color}15`,
                  color: item.color,
                }}
              >
                {item.percent.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
