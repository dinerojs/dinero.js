import { useState } from 'react';

import type { Person, Expense } from '@/types';

import {
  AddExpense,
  AddPerson,
  Balances,
  ExpenseList,
  PersonList,
  Settlements,
} from '@/components';
import { fromAmount, snapshot } from '@/lib/money';

interface StoredExpense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitType: 'equal' | 'percentage';
  shares: { personId: string; value: number }[];
  createdAt: string;
}

const LOGO = (
  <svg
    viewBox="0 0 361.4 213.6"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-auto"
    aria-hidden="true"
  >
    <path
      fill="#4466ff"
      d="M361.4 147.8h-41.1v-8.2c0-2.8-.1-5.5-.3-8.2h41.4V115h-43.5c-3.4-16.7-10.2-32.1-19.6-45.6 8.7-21 7.3-45.3-4.2-65.3-1.5-2.5-4.2-4.1-7.2-4.1-20 0-39 8.2-52.7 22.1-11.7-3.7-24.2-5.7-37.1-5.7h-32.8c-12.9 0-25.4 2-37.1 5.7C113.5 8.2 94.5 0 74.5 0c-2.9 0-5.6 1.6-7.1 4.1-11.5 20-12.9 44.3-4.2 65.3C53.8 82.9 47 98.3 43.6 115H0v16.4h41.4c-.2 2.7-.3 5.5-.3 8.2v8.2H0v16.4h41.1v49.3h279.3v-49.3h41.1v-16.4h-.1z"
    />
    <path
      fill="#fff"
      d="M197.1 32.9h-32.8c-58.9 0-106.8 47.9-106.8 106.8v57.5h246.3v-57.5c.1-58.9-47.8-106.8-106.7-106.8z"
    />
    <path
      fill="#4466ff"
      d="M96.7 115c-3.3 0-5.3-3.7-3.4-6.4 3.2-4.6 9.5-10 21.7-10 17 0 26.2 9.8 30.3 15.9 1.1 1.6-.3 3.6-2.2 3.2-4.8-1.2-13.6-2.6-28.1-2.6H96.7v-.1z"
    />
    <path
      fill="#f7a"
      d="M180.7 123.7c11 0 16.4 0 16.4 5.5 0 4-8.7 8-13.5 9.9-1.9.8-4 .8-5.9 0-4.7-1.9-13.5-5.9-13.5-9.8.1-5.6 5.6-5.6 16.5-5.6z"
    />
    <path
      fill="#4466ff"
      d="M118.7 148.3c-.7-1.3 1-2.7 2.1-1.7 5 4.5 13.6 9.4 27.1 9.4 16.4 0 24.6-8.2 32.9-8.2 8.2 0 16.4 8.2 32.9 8.2 13.5 0 22.1-5 27.1-9.4 1.1-1 2.8.3 2.1 1.7-4.5 8.5-13.5 20.1-29.2 20.1-16.4 0-24.6-8.2-32.8-8.2-8.2 0-16.4 8.2-32.8 8.2-15.9 0-24.9-11.6-29.4-20.1z"
    />
    <circle cx="82.1" cy="147.8" r="16.4" fill="#bcf" />
    <path
      fill="#bcf"
      d="M197.1 32.9h-32.8c-1 0-1.9.1-2.8.1-2.9 16.1 9.6 35.3 29.9 29.2 10.7-3.2 27.8-7.1 36.7 2.5 7.8 8.5 1.5 22.7 6.8 33 11.4 21.8 42.9 24.2 66.8 20.2-10.1-48.5-53.2-85-104.6-85z"
    />
    <path
      fill="#4466ff"
      d="M264.7 115c3.3 0 5.3-3.7 3.4-6.4-3.2-4.6-9.5-10-21.7-10-17 0-26.2 9.8-30.3 15.9-1 1.6.3 3.6 2.2 3.2 4.8-1.2 13.6-2.6 28.1-2.6h18.3v-.1z"
    />
    <circle cx="279.3" cy="147.8" r="16.4" fill="#bcf" />
  </svg>
);

const DEFAULT_PEOPLE: Person[] = [
  { id: 'alice', name: 'Alice' },
  { id: 'bob', name: 'Bob' },
  { id: 'charlie', name: 'Charlie' },
  { id: 'diana', name: 'Diana' },
];

const DEFAULT_EXPENSES: StoredExpense[] = [
  {
    id: 'sample-1',
    description: 'Dinner',
    amount: 12000,
    paidBy: 'alice',
    splitType: 'equal',
    shares: [
      { personId: 'alice', value: 25 },
      { personId: 'bob', value: 25 },
      { personId: 'charlie', value: 25 },
      { personId: 'diana', value: 25 },
    ],
    createdAt: '2026-02-28T19:00:00.000Z',
  },
  {
    id: 'sample-2',
    description: 'Uber ride',
    amount: 3500,
    paidBy: 'bob',
    splitType: 'equal',
    shares: [
      { personId: 'alice', value: 34 },
      { personId: 'bob', value: 33 },
      { personId: 'charlie', value: 33 },
    ],
    createdAt: '2026-02-28T21:00:00.000Z',
  },
  {
    id: 'sample-3',
    description: 'Concert tickets',
    amount: 20000,
    paidBy: 'charlie',
    splitType: 'percentage',
    shares: [
      { personId: 'charlie', value: 40 },
      { personId: 'alice', value: 30 },
      { personId: 'diana', value: 30 },
    ],
    createdAt: '2026-03-01T10:00:00.000Z',
  },
];

export default function App() {
  const [people, setPeople] = useState<Person[]>(DEFAULT_PEOPLE);
  const [storedExpenses, setStoredExpenses] =
    useState<StoredExpense[]>(DEFAULT_EXPENSES);

  const expenses = deserializeExpenses(storedExpenses);

  function setExpenses(updater: Expense[] | ((prev: Expense[]) => Expense[])) {
    setStoredExpenses((prev) => {
      const prevExpenses = deserializeExpenses(prev);
      const next =
        typeof updater === 'function' ? updater(prevExpenses) : updater;

      return serializeExpenses(next);
    });
  }

  return (
    <div className="flex min-h-screen touch-manipulation flex-col lg:h-screen lg:overflow-hidden">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {LOGO}
          <span className="truncate text-sm font-semibold text-foreground">
            Expense Splitter
          </span>
          <span className="hidden whitespace-nowrap rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary sm:inline">
            Built with Dinero.js
          </span>
        </div>
        <a
          href="https://github.com/dinerojs/dinero.js/tree/main/examples/expense-splitter"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs text-text-muted transition-colors hover:text-foreground"
        >
          GitHub
          <span className="hidden sm:inline"> source</span>
        </a>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="w-full border-b border-border lg:w-120 lg:min-w-120 lg:overflow-y-auto lg:border-b-0 lg:border-r">
          <div className="space-y-6 p-5">
            <section>
              <div className="mb-4 flex items-center gap-3">
                <h2 className="text-sm font-semibold text-foreground">
                  People
                </h2>
              </div>
              <div className="space-y-4">
                <AddPerson
                  onAdd={(person) => {
                    setPeople((prev) => [...prev, person]);
                  }}
                />
                <PersonList
                  people={people}
                  onRemove={(id: string) => {
                    setPeople((prev) => prev.filter((p) => p.id !== id));
                    setExpenses((prev) =>
                      prev
                        .filter((expense) => expense.paidBy !== id)
                        .map((expense) => ({
                          ...expense,
                          shares: expense.shares.filter(
                            ({ personId }) => personId !== id
                          ),
                        }))
                        .filter((expense) => expense.shares.length > 0)
                    );
                  }}
                />
              </div>
            </section>

            <div className="border-t border-border" />

            <section>
              <div className="mb-4 flex items-center gap-3">
                <h2 className="text-sm font-semibold text-foreground">
                  Add Expense
                </h2>
              </div>
              <AddExpense
                people={people}
                onAdd={(expense: Expense) => {
                  setExpenses((prev) => [expense, ...prev]);
                }}
              />
            </section>
          </div>
        </div>

        <div className="relative flex-1 overflow-y-auto bg-muted">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(68,102,255,0.08)_0%,_transparent_50%)]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'radial-gradient(circle, currentColor 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative space-y-5 p-5">
            <section className="rounded-xl border border-border bg-card p-5 shadow-xl shadow-black/20">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">
                  Balances
                </h2>
              </div>
              <Balances expenses={expenses} people={people} />
              {expenses.length === 0 && (
                <p className="py-6 text-center text-sm text-text-muted">
                  Add expenses to see balances
                </p>
              )}
            </section>

            <section className="rounded-xl border border-border bg-card p-5 shadow-xl shadow-black/20">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">
                  Settle Up
                </h2>
              </div>
              <Settlements expenses={expenses} people={people} />
              {expenses.length === 0 && (
                <p className="py-6 text-center text-sm text-text-muted">
                  Add expenses to see settlements
                </p>
              )}
            </section>

            <section className="rounded-xl border border-border bg-card p-5 shadow-xl shadow-black/20">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-sm font-semibold text-foreground">
                    Expenses
                  </h2>
                  {expenses.length > 0 && (
                    <span className="text-xs text-text-muted">
                      ({expenses.length})
                    </span>
                  )}
                </div>
                {(people.length > 0 || expenses.length > 0) && (
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to clear all people and expenses? This cannot be undone.'
                        )
                      ) {
                        setPeople([]);
                        setExpenses([]);
                      }
                    }}
                    className="rounded text-xs text-text-muted transition-colors hover:text-destructive focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card focus-visible:outline-none"
                    aria-label="Clear all people and expenses"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <ExpenseList
                expenses={expenses}
                people={people}
                onRemove={(id: string) => {
                  setExpenses((prev) => prev.filter((e) => e.id !== id));
                }}
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function serializeExpenses(expenses: Expense[]): StoredExpense[] {
  return expenses.map((expense) => ({
    id: expense.id,
    description: expense.description,
    amount: snapshot(expense.amount),
    paidBy: expense.paidBy,
    splitType: expense.splitType,
    shares: expense.shares,
    createdAt: expense.createdAt.toISOString(),
  }));
}

function deserializeExpenses(stored: StoredExpense[]): Expense[] {
  return stored.map((expense) => ({
    id: expense.id,
    description: expense.description,
    amount: fromAmount(expense.amount),
    paidBy: expense.paidBy,
    splitType: expense.splitType,
    shares: expense.shares,
    createdAt: new Date(expense.createdAt),
  }));
}
