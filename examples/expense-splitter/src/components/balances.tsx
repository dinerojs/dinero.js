import { ArrowUp, ArrowDown, Check } from 'lucide-react';

import {
  calculateNetBalances,
  formatMoney,
  isNegative,
  isPositive,
  isZero,
  negate,
} from '@/lib/money';
import type { Expense, Person } from '@/types';

interface BalancesProps {
  expenses: Expense[];
  people: Person[];
}

export function Balances({ expenses, people }: BalancesProps) {
  const netBalances = calculateNetBalances(expenses, people);

  if (expenses.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {Array.from(netBalances.entries()).map(([personId, balance]) => {
        const isOwed = isPositive(balance);
        const owes = isNegative(balance);
        const settled = isZero(balance);

        return (
          <div
            key={personId}
            className={`flex items-center justify-between rounded-lg border p-3 ${
              isOwed
                ? 'border-positive/20 bg-positive/[0.08]'
                : owes
                  ? 'border-destructive/20 bg-destructive/[0.08]'
                  : 'border-border bg-muted'
            }`}
          >
            <span className="text-sm font-medium text-foreground">
              {people.find(({ id }) => id === personId)?.name || 'Unknown'}
            </span>
            {settled ? (
              <span className="flex items-center gap-1.5 text-sm text-text-muted">
                <Check className="h-3.5 w-3.5" />
                Settled
              </span>
            ) : isOwed ? (
              <span className="flex items-center gap-1.5 text-sm font-semibold tabular-nums text-positive">
                <ArrowUp className="h-3.5 w-3.5" />
                {formatMoney(balance)}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-sm font-semibold tabular-nums text-destructive">
                <ArrowDown className="h-3.5 w-3.5" />
                {formatMoney(isNegative(balance) ? negate(balance) : balance)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
