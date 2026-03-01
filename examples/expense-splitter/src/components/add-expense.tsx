import { useEffect, useState } from 'react';
import { Plus, Equal, Percent } from 'lucide-react';

import { fromAmount, toMinorUnits } from '@/lib/money';
import type { Person, Expense, SplitType, ExpenseShare } from '@/types';

interface AddExpenseProps {
  people: Person[];
  onAdd(expense: Expense): void;
}

export function AddExpense({ people, onAdd }: AddExpenseProps) {
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

  const inputClasses =
    'w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-text-muted transition-[border-color,box-shadow] duration-150 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none';

  if (people.length < 2) {
    return (
      <div className="py-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
          <Plus className="h-8 w-8 text-text-muted" />
        </div>
        <p className="text-sm text-text-muted">
          Add at least 2 people to start splitting expenses
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const amountInCents = toMinorUnits(amount);

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
          amount: fromAmount(amountInCents),
          paidBy,
          splitType,
          shares,
          createdAt: new Date(),
        };

        onAdd(expense);
        setDescription('');
        setAmount('');
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="description"
            className="mb-1.5 block text-xs font-medium text-text-secondary"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="e.g., Dinner, Uber…"
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="amount"
            className="mb-1.5 block text-xs font-medium text-text-secondary"
          >
            Amount
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-sm text-text-muted">$</span>
            </div>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`${inputClasses} pl-7`}
            />
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="paidBy"
          className="mb-1.5 block text-xs font-medium text-text-secondary"
        >
          Paid by
        </label>
        <select
          id="paidBy"
          value={paidBy}
          onChange={(event) => setPaidBy(event.target.value)}
          className={inputClasses}
        >
          {people.map((person) => (
            <option key={person.id} value={person.id} className="bg-background">
              {person.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium text-text-secondary">
          Split type
        </label>
        <div className="flex gap-3">
          <label
            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border p-2.5 text-sm transition-[border-color,background-color,color] ${
              splitType === 'equal'
                ? 'border-primary/30 bg-primary/10 text-primary'
                : 'border-border bg-muted text-text-secondary hover:bg-card'
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
            <Equal className="h-4 w-4" />
            <span className="font-medium">Equal</span>
          </label>
          <label
            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border p-2.5 text-sm transition-[border-color,background-color,color] ${
              splitType === 'percentage'
                ? 'border-primary/30 bg-primary/10 text-primary'
                : 'border-border bg-muted text-text-secondary hover:bg-card'
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
            <Percent className="h-4 w-4" />
            <span className="font-medium">Percentage</span>
          </label>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium text-text-secondary">
          Split among
        </label>
        <div className="space-y-1.5">
          {people.map((person) => (
            <div
              key={person.id}
              className={`flex items-center gap-3 rounded-lg p-2.5 transition-[border-color,background-color,color] ${
                selectedPeople.has(person.id)
                  ? 'bg-muted border border-border'
                  : 'border border-transparent'
              }`}
            >
              <label className="inline-flex flex-1 cursor-pointer items-center">
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
                <span className="ml-3 text-sm text-foreground">
                  {person.name}
                </span>
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
                    className="w-20 rounded-md border border-border bg-input px-3 py-1.5 text-center text-sm text-foreground placeholder:text-text-muted transition-[border-color,box-shadow] duration-150 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
                  />
                  <span className="text-sm text-text-muted">%</span>
                </div>
              )}
            </div>
          ))}
        </div>
        {splitType === 'percentage' && (
          <p
            className={`mt-2 text-xs font-medium ${
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
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" />
          Add Expense
        </span>
      </button>
    </form>
  );
}
