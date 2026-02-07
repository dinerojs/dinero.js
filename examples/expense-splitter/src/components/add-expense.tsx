import { useEffect, useState } from 'react';
import type { DineroCurrency } from 'dinero.js';
import { dinero } from 'dinero.js';

import type { Person, Expense, SplitType, ExpenseShare } from '../types';

interface AddExpenseProps {
  people: Person[];
  currency: DineroCurrency<number>;
  onAdd(expense: Expense): void;
}

export function AddExpense({ people, currency, onAdd }: AddExpenseProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState(people[0]?.id || '');
  const [splitType, setSplitType] = useState<SplitType>('equal');
  const [selectedPeople, setSelectedPeople] = useState<Set<string>>(
    new Set(people.map((p) => p.id))
  );
  const [percentages, setPercentages] = useState<Record<string, number>>({});

  useEffect(() => {
    const peopleIds = new Set(people.map((p) => p.id));

    if (!peopleIds.has(paidBy)) {
      setPaidBy(people[0]?.id || '');
    }

    setSelectedPeople((prev) => {
      const next = new Set([...prev].filter((id) => peopleIds.has(id)));

      for (const person of people) {
        if (!prev.has(person.id) && !next.has(person.id)) {
          next.add(person.id);
        }
      }

      return next;
    });
  }, [people]);

  const totalPercentage = Array.from(selectedPeople).reduce(
    (sum, id) => sum + (percentages[id] || 0),
    0
  );

  if (people.length < 2) {
    return (
      <div className="text-center py-8">
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <p className="text-text-3">
          Add at least 2 people to start splitting expenses
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const amountInCents = Math.round(parseFloat(amount) * 100);

        if (!description.trim() || isNaN(amountInCents) || amountInCents <= 0) {
          return;
        }

        let shares: ExpenseShare[] = [];

        if (splitType === 'equal') {
          shares = Array.from(selectedPeople).map((personId) => ({
            personId,
            value: 1,
          }));
        } else if (splitType === 'percentage') {
          shares = Array.from(selectedPeople).map((personId) => ({
            personId,
            value: percentages[personId] || 0,
          }));
        }

        const expense: Expense = {
          id: crypto.randomUUID(),
          description: description.trim(),
          amount: dinero({ amount: amountInCents, currency }),
          paidBy,
          splitType,
          shares,
          createdAt: new Date(),
        };

        onAdd(expense);
        setDescription('');
        setAmount('');
      }}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-text-2 mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Dinner, Uber, etc."
            className="input-modern"
          />
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-text-2 mb-2"
          >
            Amount
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <span className="text-text-3">$</span>
            </div>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="input-modern pl-8"
            />
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="paidBy"
          className="block text-sm font-medium text-text-2 mb-2"
        >
          Paid by
        </label>
        <select
          id="paidBy"
          value={paidBy}
          onChange={(event) => setPaidBy(event.target.value)}
          className="input-modern"
        >
          {people.map((person) => (
            <option key={person.id} value={person.id} className="bg-base">
              {person.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-2 mb-3">
          Split type
        </label>
        <div className="flex gap-3">
          <label
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg cursor-pointer transition-all ${
              splitType === 'equal'
                ? 'bg-brand/10 border border-brand/30 text-brand-light'
                : 'bg-bg-alt border border-divider text-text-2 hover:bg-bg-soft'
            }`}
          >
            <input
              type="radio"
              value="equal"
              checked={splitType === 'equal'}
              onChange={(event) =>
                setSplitType(event.target.value as SplitType)
              }
              className="sr-only"
            />
            <svg
              className="w-5 h-5"
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
            <span className="font-medium">Equal</span>
          </label>
          <label
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg cursor-pointer transition-all ${
              splitType === 'percentage'
                ? 'bg-brand/10 border border-brand/30 text-brand-light'
                : 'bg-bg-alt border border-divider text-text-2 hover:bg-bg-soft'
            }`}
          >
            <input
              type="radio"
              value="percentage"
              checked={splitType === 'percentage'}
              onChange={(event) =>
                setSplitType(event.target.value as SplitType)
              }
              className="sr-only"
            />
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
              />
            </svg>
            <span className="font-medium">Percentage</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-2 mb-3">
          Split among
        </label>
        <div className="space-y-2">
          {people.map((person) => (
            <div
              key={person.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                selectedPeople.has(person.id)
                  ? 'bg-bg-alt border border-divider'
                  : 'bg-transparent border border-transparent'
              }`}
            >
              <label className="inline-flex items-center flex-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedPeople.has(person.id)}
                  onChange={() => {
                    const newSelected = new Set(selectedPeople);

                    if (newSelected.has(person.id)) {
                      newSelected.delete(person.id);
                    } else {
                      newSelected.add(person.id);
                    }

                    setSelectedPeople(newSelected);
                  }}
                />
                <span className="ml-3 text-text-1">{person.name}</span>
              </label>
              {splitType === 'percentage' && selectedPeople.has(person.id) && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={percentages[person.id] || ''}
                    onChange={(event) => {
                      setPercentages((prev) => ({
                        ...prev,
                        [person.id]: parseFloat(event.target.value) || 0,
                      }));
                    }}
                    placeholder="0"
                    min="0"
                    max="100"
                    aria-label={`Percentage for ${person.name}`}
                    className="w-20 input-modern text-center py-2"
                  />
                  <span className="text-text-3">%</span>
                </div>
              )}
            </div>
          ))}
        </div>
        {splitType === 'percentage' && (
          <p
            className={`mt-3 text-sm font-medium ${
              totalPercentage === 100 ? 'text-positive' : 'text-warning'
            }`}
          >
            Total: {totalPercentage}%
            {totalPercentage !== 100 && ' (should be 100%)'}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={
          !description.trim() ||
          !amount ||
          parseFloat(amount) <= 0 ||
          selectedPeople.size === 0 ||
          (splitType === 'percentage' && totalPercentage !== 100)
        }
        className="btn-primary w-full"
      >
        <span className="flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5"
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
          Add Expense
        </span>
      </button>
    </form>
  );
}
