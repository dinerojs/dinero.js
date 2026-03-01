import type { CurrencyCode, Category } from '@/lib/types';
import { CATEGORY_COLORS, CURRENCY_COLORS } from '@/lib/types';
import { SummaryCards } from '@/components/summary-cards';
import { HoldingsTable } from '@/components/holdings-table';
import { BreakdownBar } from '@/components/breakdown-bar';

import type { HoldingWithValue } from '@/hooks/use-portfolio';

interface DashboardProps {
  totalValueFormatted: string;
  totalValueNumber: number;
  totalChange: { amount: number; percent: number };
  bestPerformer: { name: string; changePercent: number } | null;
  currencyExposure: number;
  holdingsWithValues: HoldingWithValue[];
  currencyBreakdown: {
    currency: CurrencyCode;
    value: number;
    percent: number;
  }[];
  categoryBreakdown: {
    category: Category;
    value: number;
    percent: number;
  }[];
  baseCurrency: CurrencyCode;
}

export function Dashboard({
  totalValueFormatted,
  totalValueNumber,
  totalChange,
  bestPerformer,
  currencyExposure,
  holdingsWithValues,
  currencyBreakdown,
  categoryBreakdown,
  baseCurrency,
}: DashboardProps) {
  const currencyItems = currencyBreakdown.map((item) => ({
    label: item.currency,
    value: item.value,
    percent: item.percent,
    color: CURRENCY_COLORS[item.currency] ?? '#9ca3af',
  }));

  const categoryItems = categoryBreakdown.map((item) => ({
    label: item.category,
    value: item.value,
    percent: item.percent,
    color: CATEGORY_COLORS[item.category] ?? '#9ca3af',
  }));

  return (
    <div className="flex flex-col gap-5">
      <SummaryCards
        totalValueFormatted={totalValueFormatted}
        totalChange={totalChange}
        bestPerformer={bestPerformer}
        currencyExposure={currencyExposure}
        holdingsCount={holdingsWithValues.length}
        baseCurrency={baseCurrency}
      />

      <HoldingsTable
        holdings={holdingsWithValues}
        totalValueNumber={totalValueNumber}
        baseCurrency={baseCurrency}
      />

      <BreakdownBar
        title="Currency Breakdown"
        items={currencyItems}
        baseCurrency={baseCurrency}
      />

      <BreakdownBar
        title="Category Breakdown"
        items={categoryItems}
        baseCurrency={baseCurrency}
      />
    </div>
  );
}
