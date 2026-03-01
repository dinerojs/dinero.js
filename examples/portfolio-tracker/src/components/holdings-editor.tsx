import { Plus } from 'lucide-react';

import type { CurrencyCode, Holding } from '@/lib/types';
import { CURRENCIES } from '@/lib/types';
import { ExchangeRatesCard } from '@/components/exchange-rates';
import { HoldingCard } from '@/components/holding-card';

interface HoldingsEditorProps {
  baseCurrency: CurrencyCode;
  onBaseCurrencyChange: (currency: CurrencyCode) => void;
  holdings: Holding[];
  onAddHolding: () => void;
  onRemoveHolding: (id: string) => void;
  onUpdateHolding: (id: string, updates: Partial<Omit<Holding, 'id'>>) => void;
}

export function HoldingsEditor({
  baseCurrency,
  onBaseCurrencyChange,
  holdings,
  onAddHolding,
  onRemoveHolding,
  onUpdateHolding,
}: HoldingsEditorProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-border bg-card p-4 shadow-xl shadow-black/20">
        <label
          htmlFor="base-currency"
          className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground"
        >
          Base Currency
        </label>
        <select
          id="base-currency"
          name="base-currency"
          value={baseCurrency}
          onChange={(e) => onBaseCurrencyChange(e.target.value as CurrencyCode)}
          className="w-full appearance-none rounded-md border border-white/8 bg-white/4 px-3 py-2 text-sm font-medium text-foreground transition-[border-color,box-shadow] duration-150 focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c} className="bg-card text-foreground">
              {c}
            </option>
          ))}
        </select>
      </div>

      <ExchangeRatesCard baseCurrency={baseCurrency} />

      <div>
        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Holdings ({holdings.length})
        </h3>
        <div className="flex flex-col gap-3">
          {holdings.map((holding) => (
            <HoldingCard
              key={holding.id}
              holding={holding}
              onUpdate={onUpdateHolding}
              onRemove={onRemoveHolding}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onAddHolding}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/12 px-4 py-2.5 text-sm text-muted-foreground transition-[border-color,background-color,color,transform] duration-150 hover:scale-[1.01] hover:border-primary/40 hover:bg-primary/4 hover:text-foreground focus-visible:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Holding
        </button>
      </div>
    </div>
  );
}
