import type { CurrencyCode, Category } from '@/lib/types';
import { CATEGORY_COLORS } from '@/lib/types';
import { formatCents } from '@/lib/money';

interface HoldingRow {
  id: string;
  name: string;
  category: Category;
  quantity: number;
  unitPriceCents: number;
  currency: CurrencyCode;
  baseValueFormatted: string;
  baseValueNumber: number;
  changePercent: number;
}

interface HoldingsTableProps {
  holdings: HoldingRow[];
  totalValueNumber: number;
  baseCurrency: CurrencyCode;
}

export function HoldingsTable({
  holdings,
  totalValueNumber,
  baseCurrency,
}: HoldingsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-xl shadow-black/20">
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Holdings Overview
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-120 text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Asset
              </th>
              <th className="hidden px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-muted-foreground md:table-cell">
                Category
              </th>
              <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Qty
              </th>
              <th className="hidden px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:table-cell">
                Unit Price
              </th>
              <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Value ({baseCurrency})
              </th>
              <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Alloc %
              </th>
              <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Change
              </th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => {
              const allocationPercent =
                totalValueNumber > 0
                  ? (h.baseValueNumber / totalValueNumber) * 100
                  : 0;
              const isPositive = h.changePercent >= 0;

              return (
                <tr
                  key={h.id}
                  className="border-b border-border transition-colors duration-100 last:border-b-0 hover:bg-white/2"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor: CATEGORY_COLORS[h.category],
                        }}
                      />
                      <span className="max-w-35 truncate font-medium text-foreground">
                        {h.name || 'Unnamed'}
                      </span>
                    </div>
                  </td>

                  <td className="hidden px-4 py-3 md:table-cell">
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{
                        backgroundColor: `${CATEGORY_COLORS[h.category]}15`,
                        color: CATEGORY_COLORS[h.category],
                      }}
                    >
                      {h.category}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right tabular-nums text-foreground">
                    {formatQuantity(h.quantity)}
                  </td>

                  <td className="hidden px-4 py-3 text-right tabular-nums text-muted-foreground sm:table-cell">
                    {formatCents(h.unitPriceCents, h.currency)}
                  </td>

                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-foreground">
                    {h.baseValueFormatted}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-white/6 lg:block">
                        <div
                          className="h-full rounded-full transition-[width] duration-500"
                          style={{
                            width: `${allocationPercent}%`,
                            backgroundColor: CATEGORY_COLORS[h.category],
                          }}
                        />
                      </div>
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {allocationPercent.toFixed(1)}%
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <span
                      className="text-xs font-semibold tabular-nums transition-colors duration-300"
                      style={{
                        color: isPositive ? 'var(--positive)' : 'var(--loss)',
                      }}
                    >
                      {isPositive ? '+' : ''}
                      {h.changePercent.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {holdings.length === 0 && (
        <div className="px-4 py-8 text-center text-sm text-muted-foreground">
          No holdings yet.
        </div>
      )}
    </div>
  );
}

function formatQuantity(num: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: num % 1 === 0 ? 0 : 2,
    maximumFractionDigits: num % 1 === 0 ? 0 : 2,
  }).format(num);
}
