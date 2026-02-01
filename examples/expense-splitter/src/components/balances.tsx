import type { DineroCurrency } from 'dinero.js';
import { isNegative, isPositive, isZero, multiply } from 'dinero.js';

import type { Expense, Person } from '../types';
import { calculateNetBalances, format } from '../utils';

interface BalancesProps {
  expenses: Expense[];
  people: Person[];
  currency: DineroCurrency<number>;
}

export function Balances({ expenses, people, currency }: BalancesProps) {
  const netBalances = calculateNetBalances(expenses, people, currency);

  if (expenses.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {Array.from(netBalances.entries()).map(([personId, balance]) => {
        const isOwed = isPositive(balance) && !isZero(balance);
        const owes = !isPositive(balance) && !isZero(balance);
        const settled = isZero(balance);

        return (
          <div
            key={personId}
            className={`flex justify-between items-center p-3 rounded-xl transition-all ${
              isOwed
                ? 'bg-emerald-500/10 border border-emerald-500/20'
                : owes
                  ? 'bg-red-500/10 border border-red-500/20'
                  : 'bg-white/[0.03] border border-white/[0.06]'
            }`}
          >
            <span className="font-medium text-white">
              {people.find(({ id }) => id === personId)?.name || 'Unknown'}
            </span>
            {settled ? (
              <span className="text-slate-500 flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Settled
              </span>
            ) : isOwed ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                {format(balance)}
              </span>
            ) : (
              <span className="text-red-400 font-semibold flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                {format(isNegative(balance) ? multiply(balance, -1) : balance)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
