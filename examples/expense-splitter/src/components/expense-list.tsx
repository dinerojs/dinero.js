import type { DineroCurrency } from 'dinero.js';
import { isPositive } from 'dinero.js';

import type { Expense, Person } from '../types';
import { calculateShares, format } from '../utils';

interface ExpenseListProps {
  expenses: Expense[];
  people: Person[];
  currency: DineroCurrency<number>;
  onRemove(id: string): void;
}

export function ExpenseList({
  expenses,
  people,
  currency,
  onRemove,
}: ExpenseListProps) {
  function getPersonName(id: string) {
    return people.find((person) => person.id === id)?.name || 'Unknown';
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-bg-alt mb-4">
          <svg
            className="w-8 h-8 text-text-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <p className="text-text-3">No expenses yet</p>
        <p className="text-text-3 text-sm mt-1">Add your first expense above</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense, index) => {
        const shares = calculateShares(expense, people, currency);
        const payer = getPersonName(expense.paidBy);

        return (
          <div
            key={expense.id}
            className="group bg-bg-alt border border-border rounded-lg p-4 animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text-1 truncate">
                  {expense.description}
                </h3>
                <p className="text-sm text-text-3 mt-0.5">
                  Paid by{' '}
                  <span className="text-text-2 font-medium">{payer}</span>
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xl font-bold text-text-1">
                  {format(expense.amount)}
                </p>
                <button
                  onClick={() => onRemove(expense.id)}
                  className="text-xs text-text-3 hover:text-red-400 transition-colors mt-1 opacity-0 group-hover:opacity-100"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-text-3 uppercase tracking-wider">
                  Split
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-bg-soft text-text-3">
                  {expense.splitType}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(shares.entries())
                  .filter(([_, amount]) => isPositive(amount))
                  .map(([personId, amount]) => (
                    <span
                      key={personId}
                      className="inline-flex items-center gap-1.5 text-sm bg-bg-soft px-3 py-1.5 rounded-lg"
                    >
                      <span className="text-text-3">
                        {getPersonName(personId)}
                      </span>
                      <span className="text-text-1 font-medium">
                        {format(amount)}
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
