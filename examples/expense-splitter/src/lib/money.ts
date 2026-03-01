import type { Dinero } from 'dinero.js';
import {
  dinero,
  add,
  subtract,
  multiply,
  allocate,
  toDecimal,
  toSnapshot,
  isZero,
  isPositive,
  isNegative,
  greaterThan,
  compare,
} from 'dinero.js';
import { USD } from 'dinero.js/currencies';

import type { Expense, Person, Settlement } from '@/types';

export const currency = USD;

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function zero(): Dinero<number> {
  return dinero({ amount: 0, currency: USD });
}

export function fromAmount(amount: number): Dinero<number> {
  return dinero({ amount, currency: USD });
}

/**
 * Convert a decimal string (e.g. "19.99") to an integer amount in minor units.
 */
export function toMinorUnits(value: string): number {
  return Math.round(parseFloat(value) * 100);
}

export function snapshot(amount: Dinero<number>): number {
  return toSnapshot(amount).amount;
}

export function formatMoney(amount: Dinero<number>): string {
  return toDecimal(amount, ({ value }) => {
    return formatter.format(Number(value));
  });
}

export { isZero, isPositive, isNegative };

export function negate(amount: Dinero<number>): Dinero<number> {
  return multiply(amount, -1);
}

/**
 * Calculate individual shares for an expense based on split type.
 */
export function calculateShares(
  expense: Expense,
  people: Person[]
): Map<string, Dinero<number>> {
  const shares = new Map<string, Dinero<number>>();

  switch (expense.splitType) {
    case 'equal': {
      const participantIds =
        expense.shares.length > 0
          ? expense.shares.map(({ personId }) => personId)
          : people.map(({ id }) => id);
      const ratios = participantIds.map(() => 1);
      const allocated = allocate(expense.amount, ratios);

      participantIds.forEach((personId, index) => {
        shares.set(personId, allocated[index]);
      });

      break;
    }

    case 'percentage': {
      const ratios = expense.shares.map(({ value }) => value);
      const allocated = allocate(expense.amount, ratios);

      expense.shares.forEach((share, index) => {
        shares.set(share.personId, allocated[index]);
      });

      break;
    }
  }

  for (const person of people) {
    if (!shares.has(person.id)) {
      shares.set(person.id, zero());
    }
  }

  return shares;
}

/**
 * Calculate what each person owes or is owed based on expenses.
 * Returns a map of net balance per `personId`.
 */
export function calculateNetBalances(
  expenses: Expense[],
  people: Person[]
): Map<string, Dinero<number>> {
  const balances = new Map<string, Dinero<number>>();

  for (const person of people) {
    balances.set(person.id, zero());
  }

  for (const expense of expenses) {
    const shares = calculateShares(expense, people);

    balances.set(
      expense.paidBy,
      add(balances.get(expense.paidBy)!, expense.amount)
    );

    for (const [personId, share] of shares) {
      balances.set(personId, subtract(balances.get(personId)!, share));
    }
  }

  return balances;
}

/**
 * Calculate optimal settlements to minimize transactions.
 * Uses a greedy algorithm: match the largest creditor with the largest debtor.
 */
export function calculateSettlements(
  expenses: Expense[],
  people: Person[]
): Settlement[] {
  const netBalances = calculateNetBalances(expenses, people);
  const settlements: Settlement[] = [];

  const creditors: { id: string; amount: Dinero<number> }[] = [];
  const debtors: { id: string; amount: Dinero<number> }[] = [];

  for (const [personId, balance] of netBalances) {
    if (isPositive(balance)) {
      creditors.push({ id: personId, amount: balance });
    } else if (isNegative(balance)) {
      debtors.push({ id: personId, amount: negate(balance) });
    }
  }

  creditors.sort((a, b) => compare(b.amount, a.amount));
  debtors.sort((a, b) => compare(b.amount, a.amount));

  let i = 0;
  let j = 0;

  while (i < creditors.length && j < debtors.length) {
    const creditor = creditors[i];
    const debtor = debtors[j];

    if (isZero(creditor.amount)) {
      i++;

      continue;
    }

    if (isZero(debtor.amount)) {
      j++;

      continue;
    }

    let settlementAmount: Dinero<number>;

    if (greaterThan(creditor.amount, debtor.amount)) {
      settlementAmount = debtor.amount;
      creditor.amount = subtract(creditor.amount, debtor.amount);
      debtor.amount = zero();

      j++;
    } else if (greaterThan(debtor.amount, creditor.amount)) {
      settlementAmount = creditor.amount;
      debtor.amount = subtract(debtor.amount, creditor.amount);
      creditor.amount = zero();

      i++;
    } else {
      settlementAmount = creditor.amount;
      creditor.amount = zero();
      debtor.amount = zero();

      i++;
      j++;
    }

    settlements.push({
      from: debtor.id,
      to: creditor.id,
      amount: settlementAmount,
    });
  }

  return settlements;
}
