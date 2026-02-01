import type { DineroCurrency } from 'dinero.js';

import type { Expense } from '../types';
import { format, getTotalExpenses } from '../utils';

interface SummaryProps {
  expenses: Expense[];
  currency: DineroCurrency<number>;
  peopleCount: number;
}

export function Summary({ expenses, currency, peopleCount }: SummaryProps) {
  const total = getTotalExpenses(expenses, currency);

  return (
    <div className="relative overflow-hidden rounded-3xl glow-emerald">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600" />

      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

      <div className="relative p-8">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <p className="text-emerald-100 text-sm font-medium mb-1">
              Total Spent
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {format(total)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-emerald-100 text-sm font-medium mb-1">
              Expenses
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {expenses.length}
            </p>
          </div>
          <div className="text-right">
            <p className="text-emerald-100 text-sm font-medium mb-1">People</p>
            <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {peopleCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
