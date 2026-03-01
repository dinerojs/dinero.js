import { Trash2 } from 'lucide-react';

import type { CurrencyCode, Category, Holding } from '@/lib/types';
import { CURRENCIES, CATEGORIES, CATEGORY_COLORS } from '@/lib/types';
import { toMinorUnits, minorUnitsToInputString } from '@/lib/money';

interface HoldingCardProps {
  holding: Holding;
  onUpdate: (id: string, updates: Partial<Omit<Holding, 'id'>>) => void;
  onRemove: (id: string) => void;
}

export function HoldingCard({ holding, onUpdate, onRemove }: HoldingCardProps) {
  const borderColor = CATEGORY_COLORS[holding.category];

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-xl shadow-black/20">
      <div
        className="absolute bottom-0 left-0 top-0 w-0.75"
        style={{ backgroundColor: borderColor }}
      />

      <div className="p-4 pl-5">
        <div className="mb-3 flex items-center gap-2">
          <label className="sr-only" htmlFor={`name-${holding.id}`}>
            Asset name
          </label>
          <input
            id={`name-${holding.id}`}
            type="text"
            name="asset-name"
            autoComplete="off"
            value={holding.name}
            onChange={(e) => onUpdate(holding.id, { name: e.target.value })}
            placeholder="Asset name"
            className="flex-1 rounded-md border border-white/8 bg-white/4 px-3 py-1.5 text-sm text-foreground transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          />
          <button
            type="button"
            onClick={() => onRemove(holding.id)}
            className="rounded-md p-1.5 text-muted-foreground opacity-100 transition-[background-color,color,opacity] duration-150 hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 lg:opacity-0 lg:group-hover:opacity-100"
            aria-label={`Delete ${holding.name}`}
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="mb-3">
          <label
            htmlFor={`category-${holding.id}`}
            className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Category
          </label>
          <select
            id={`category-${holding.id}`}
            name="category"
            value={holding.category}
            onChange={(e) =>
              onUpdate(holding.id, { category: e.target.value as Category })
            }
            className="w-full appearance-none rounded-md border border-white/8 bg-white/4 px-3 py-1.5 text-sm text-foreground transition-[border-color,box-shadow] duration-150 focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-card text-foreground">
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <div>
            <label
              htmlFor={`quantity-${holding.id}`}
              className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Quantity
            </label>
            <input
              id={`quantity-${holding.id}`}
              type="number"
              name="quantity"
              value={holding.quantity || ''}
              onChange={(e) =>
                onUpdate(holding.id, {
                  quantity: parseFloat(e.target.value) || 0,
                })
              }
              placeholder="0"
              step="any"
              className="w-full rounded-md border border-white/8 bg-white/4 px-3 py-1.5 text-sm tabular-nums text-foreground transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            />
          </div>
          <div>
            <label
              htmlFor={`unit-price-${holding.id}`}
              className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Unit Price
            </label>
            <input
              id={`unit-price-${holding.id}`}
              type="text"
              name="unit-price"
              inputMode="decimal"
              autoComplete="off"
              value={minorUnitsToInputString(
                holding.unitPriceCents,
                holding.currency
              )}
              onChange={(e) =>
                onUpdate(holding.id, {
                  unitPriceCents: toMinorUnits(
                    e.target.value,
                    holding.currency
                  ),
                })
              }
              placeholder="0.00"
              className="w-full rounded-md border border-white/8 bg-white/4 px-3 py-1.5 text-sm tabular-nums text-foreground transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor={`currency-${holding.id}`}
              className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Currency
            </label>
            <select
              id={`currency-${holding.id}`}
              name="currency"
              value={holding.currency}
              onChange={(e) =>
                onUpdate(holding.id, {
                  currency: e.target.value as CurrencyCode,
                })
              }
              className="w-full appearance-none rounded-md border border-white/8 bg-white/4 px-3 py-1.5 text-sm text-foreground transition-[border-color,box-shadow] duration-150 focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c} className="bg-card text-foreground">
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
