import { dinero, toSnapshot } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

import type { Person, Expense } from './types';

import {
  AddExpense,
  AddPerson,
  Balances,
  ExpenseList,
  PersonList,
  Settlements,
} from './components';
import { useLocalStorage } from './hooks';

interface StoredExpense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitType: 'equal' | 'percentage';
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

export default function App() {
  const [people, setPeople] = useLocalStorage<Person[]>(
    'expense-splitter-people',
    []
  );
  const [storedExpenses, setStoredExpenses] = useLocalStorage<StoredExpense[]>(
    'expense-splitter-expenses',
    []
  );

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
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-base border-b border-divider animate-fade-in">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-white"
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
          <h1 className="text-lg font-semibold text-text-1">
            Expense Splitter
          </h1>
          <p className="text-text-3 text-sm hidden sm:block">
            Split bills fairly with{' '}
            <a
              href="https://v2.dinerojs.com/"
              className="text-brand hover:text-brand-light transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dinero.js
            </a>
          </p>
          <a
            href="https://github.com/dinerojs/dinero.js/tree/main/examples/expense-splitter"
            className="ml-auto flex items-center gap-2 text-sm text-text-3 hover:text-text-1 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="hidden sm:inline">See code on GitHub</span>
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-8">
            <section className="card animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-bg-alt border border-divider flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-text-2"
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
                <h2 className="text-xl font-semibold text-text-1">People</h2>
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

            <section
              className="card animate-slide-up"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-bg-alt border border-divider flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-text-2"
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
                  <h2 className="text-xl font-semibold text-text-1">
                    Add Expense
                  </h2>
                </div>
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
                  <div className="w-8 h-8 rounded-lg bg-bg-alt border border-divider flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-text-2"
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
                  <h2 className="text-xl font-semibold text-text-1">
                    Balances
                  </h2>
                </div>
              </div>
              <Balances expenses={expenses} people={people} currency={USD} />
              {expenses.length === 0 && (
                <p className="text-text-3 text-center py-6">
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
                  <div className="w-8 h-8 rounded-lg bg-bg-alt border border-divider flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-text-2"
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
                  <h2 className="text-xl font-semibold text-text-1">
                    Settle Up
                  </h2>
                </div>
              </div>
              <Settlements expenses={expenses} people={people} currency={USD} />
              {expenses.length === 0 && (
                <p className="text-text-3 text-center py-6">
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
                  <div className="w-8 h-8 rounded-lg bg-bg-alt border border-divider flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-text-2"
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
                  <h2 className="text-xl font-semibold text-text-1">
                    Expenses
                  </h2>
                  {expenses.length > 0 && (
                    <span className="text-sm text-text-3">
                      ({expenses.length})
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
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
                      className="text-sm text-text-3 hover:text-negative transition-colors"
                      aria-label="Clear all people and expenses"
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
          <p className="text-text-3 text-sm">
            Built with{' '}
            <a
              href="https://v2.dinerojs.com/"
              className="text-brand hover:text-brand-light transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dinero.js
            </a>
            . Precise monetary calculations without floating point errors.
          </p>
        </footer>
      </main>
    </div>
  );
}
