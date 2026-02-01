import { useState, useEffect } from 'react';
import { dinero, toSnapshot } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

import type { Person, Expense } from './types';

import {
  AddExpense,
  AddPerson,
  Balances,
  CodeTooltip,
  ExpenseList,
  PersonList,
  Settlements,
} from './components';
import { useLocalStorage } from './hooks';
import { calculateSettlements } from './utils/calculations';
import {
  generateAddExpenseSnippet,
  generateBalancesSnippet,
  generateSettlementsSnippet,
  generateExpenseListSnippet,
} from './utils/codeSnippets';

export default function App() {
  const [storedPeople, setStoredPeople] = useLocalStorage<Person[]>(
    'expense-splitter-people',
    []
  );
  const [storedExpenses, setStoredExpenses] = useLocalStorage<StoredExpense[]>(
    'expense-splitter-expenses',
    []
  );

  const [people, setPeople] = useState<Person[]>(storedPeople);
  const [expenses, setExpenses] = useState<Expense[]>(() =>
    deserializeExpenses(storedExpenses)
  );

  useEffect(() => {
    setStoredPeople(people);
  }, [people, setStoredPeople]);

  useEffect(() => {
    setStoredExpenses(serializeExpenses(expenses));
  }, [expenses, setStoredExpenses]);

  const settlements = calculateSettlements(expenses, people, USD);
  const snippets = {
    addExpense: generateAddExpenseSnippet(USD, people.length),
    balances: generateBalancesSnippet(people, USD),
    settlements: generateSettlementsSnippet(settlements, people, USD),
    expenseList: generateExpenseListSnippet(expenses, people, USD),
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-3">
            Expense Splitter
          </h1>
          <p className="text-slate-400 text-lg">
            Split bills fairly with friends using{' '}
            <a
              href="https://v2.dinerojs.com/"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dinero.js
            </a>
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-8">
            <section className="card animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white">People</h2>
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
                      prev.filter((expense) => {
                        if (expense.paidBy === id) {
                          return false;
                        }

                        const remainingShares = expense.shares.filter(
                          ({ personId }) => personId !== id
                        );

                        return remainingShares.length > 0;
                      })
                    );
                  }}
                />
              </div>
            </section>

            <section
              className="card animate-slide-up"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-white">
                    Add Expense
                  </h2>
                </div>
                <CodeTooltip {...snippets.addExpense} />
              </div>
              <AddExpense
                people={people}
                currency={USD}
                onAdd={(expense: Expense) => {
                  setExpenses((prev) => [expense, ...prev]);
                }}
              />
            </section>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <section
              className="card animate-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-white">Balances</h2>
                </div>
                <CodeTooltip {...snippets.balances} />
              </div>
              <Balances expenses={expenses} people={people} currency={USD} />
              {expenses.length === 0 && (
                <p className="text-slate-500 text-center py-6">
                  Add expenses to see balances
                </p>
              )}
            </section>

            <section
              className="card animate-slide-up"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-white">
                    Settle Up
                  </h2>
                </div>
                <CodeTooltip {...snippets.settlements} />
              </div>
              <Settlements expenses={expenses} people={people} currency={USD} />
              {expenses.length === 0 && (
                <p className="text-slate-500 text-center py-6">
                  Add expenses to see settlements
                </p>
              )}
            </section>

            <section
              className="card animate-slide-up"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-pink-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-white">Expenses</h2>
                  {expenses.length > 0 && (
                    <span className="text-sm text-slate-500">
                      ({expenses.length})
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <CodeTooltip {...snippets.expenseList} />
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
                      className="text-sm text-slate-500 hover:text-red-400 transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>
              <ExpenseList
                expenses={expenses}
                people={people}
                currency={USD}
                onRemove={(id: string) => {
                  setExpenses((prev) => prev.filter((e) => e.id !== id));
                }}
              />
            </section>
          </div>
        </div>

        <footer className="mt-16 text-center animate-fade-in">
          <p className="text-slate-500 text-sm">
            Built with{' '}
            <a
              href="https://v2.dinerojs.com/"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Dinero.js
            </a>{' '}
            — Precise monetary calculations without floating point errors
          </p>
        </footer>
      </div>
    </div>
  );
}

interface StoredExpense {
  id: string;
  description: string;
  amount: number;
  currencyCode: string;
  paidBy: string;
  splitType: 'equal' | 'percentage' | 'exact';
  shares: { personId: string; value: number }[];
  createdAt: string;
}

function serializeExpenses(expenses: Expense[]): StoredExpense[] {
  return expenses.map((expense) => {
    const snapshot = toSnapshot(expense.amount);

    return {
      id: expense.id,
      description: expense.description,
      amount: snapshot.amount,
      currencyCode: snapshot.currency.code,
      paidBy: expense.paidBy,
      splitType: expense.splitType,
      shares: expense.shares,
      createdAt: expense.createdAt.toISOString(),
    };
  });
}

function deserializeExpenses(stored: StoredExpense[]): Expense[] {
  return stored.map((expense) => ({
    id: expense.id,
    description: expense.description,
    amount: dinero({ amount: expense.amount, currency: USD }),
    paidBy: expense.paidBy,
    splitType: expense.splitType,
    shares: expense.shares,
    createdAt: new Date(expense.createdAt),
  }));
}
