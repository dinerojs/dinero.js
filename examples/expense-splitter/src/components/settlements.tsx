import type { DineroCurrency } from 'dinero.js';

import type { Expense, Person } from '../types';
import { calculateSettlements, format } from '../utils';

interface SettlementsProps {
  expenses: Expense[];
  people: Person[];
  currency: DineroCurrency<number>;
}

export function Settlements({ expenses, people, currency }: SettlementsProps) {
  const settlements = calculateSettlements(expenses, people, currency);

  function getPersonName(id: string) {
    return people.find((person) => person.id === id)?.name || 'Unknown';
  }

  if (expenses.length === 0) {
    return null;
  }

  if (settlements.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-positive/[0.08] mb-4">
          <svg
            className="w-8 h-8 text-positive"
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
        </div>
        <p className="text-positive font-semibold text-lg">All settled up!</p>
        <p className="text-text-3 text-sm mt-1">No payments needed</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-text-3">
        <span className="text-text-1 font-medium">{settlements.length}</span>{' '}
        payment{settlements.length !== 1 ? 's' : ''} to settle:
      </p>
      {settlements.map((settlement, index) => (
        <div
          key={`${settlement.from}-${settlement.to}`}
          className="bg-bg-alt border border-divider rounded-lg p-4 animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-medium text-text-1">
                  {getPersonName(settlement.from)}
                </span>
              </div>
              <svg
                className="w-5 h-5 text-text-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-medium text-text-1">
                  {getPersonName(settlement.to)}
                </span>
              </div>
            </div>
            <span className="text-lg font-bold text-brand flex-shrink-0">
              {format(settlement.amount)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
