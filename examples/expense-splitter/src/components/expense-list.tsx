import { ClipboardList } from 'lucide-react';

import { calculateShares, formatMoney, isPositive } from '@/lib/money';
import type { Expense, Person } from '@/types';

interface ExpenseListProps {
  expenses: Expense[];
  people: Person[];
  onRemove(id: string): void;
}

export function ExpenseList({ expenses, people, onRemove }: ExpenseListProps) {
  function getPersonName(id: string) {
    return people.find((person) => person.id === id)?.name || 'Unknown';
  }

  if (expenses.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
          <ClipboardList className="h-8 w-8 text-text-muted" />
        </div>
        <p className="text-sm text-text-muted">No expenses yet</p>
        <p className="mt-1 text-xs text-text-muted">
          Add your first expense above
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => {
        const shares = calculateShares(expense, people);
        const payer = getPersonName(expense.paidBy);

        return (
          <div
            key={expense.id}
            className="group rounded-lg border border-border bg-muted p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-foreground">
                  {expense.description}
                </h3>
                <p className="mt-0.5 text-xs text-text-muted">
                  Paid by{' '}
                  <span className="font-medium text-text-secondary">
                    {payer}
                  </span>
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-lg font-bold tabular-nums text-foreground">
                  {formatMoney(expense.amount)}
                </p>
                <button
                  onClick={() => onRemove(expense.id)}
                  aria-label={`Remove expense: ${expense.description}`}
                  className="mt-1 rounded text-xs text-text-muted transition-colors hover:text-destructive focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-muted focus-visible:outline-none sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="mt-3 border-t border-border pt-3">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-text-muted">
                  Split
                </span>
                <span className="rounded-full bg-card px-2 py-0.5 text-[10px] text-text-muted">
                  {expense.splitType}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(shares.entries())
                  .filter(([_, amount]) => isPositive(amount))
                  .map(([personId, amount]) => (
                    <span
                      key={personId}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-card px-3 py-1.5 text-xs"
                    >
                      <span className="text-text-muted">
                        {getPersonName(personId)}
                      </span>
                      <span className="font-medium text-foreground">
                        {formatMoney(amount)}
                      </span>
                    </span>
                  ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
