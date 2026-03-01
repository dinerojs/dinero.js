import { ArrowRight, Check } from 'lucide-react';

import { calculateSettlements, formatMoney } from '@/lib/money';
import type { Expense, Person } from '@/types';

interface SettlementsProps {
  expenses: Expense[];
  people: Person[];
}

export function Settlements({ expenses, people }: SettlementsProps) {
  const settlements = calculateSettlements(expenses, people);

  function getPersonName(id: string) {
    return people.find((person) => person.id === id)?.name || 'Unknown';
  }

  if (expenses.length === 0) {
    return null;
  }

  if (settlements.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-positive/[0.08]">
          <Check className="h-8 w-8 text-positive" />
        </div>
        <p className="text-lg font-semibold text-positive">All settled up!</p>
        <p className="mt-1 text-sm text-text-muted">No payments needed</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-text-muted">
        <span className="font-medium text-foreground">
          {settlements.length}
        </span>{' '}
        payment{settlements.length !== 1 ? 's' : ''} to settle:
      </p>
      {settlements.map((settlement) => (
        <div
          key={`${settlement.from}-${settlement.to}`}
          className="rounded-lg border border-border bg-muted p-4"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                {getPersonName(settlement.from)}
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-text-secondary" />
              <span className="text-sm font-medium text-foreground">
                {getPersonName(settlement.to)}
              </span>
            </div>
            <span className="shrink-0 text-lg font-bold tabular-nums text-primary">
              {formatMoney(settlement.amount)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
