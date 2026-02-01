import type { Dinero, DineroCurrency } from 'dinero.js';
import {
  dinero,
  add,
  subtract,
  allocate,
  isZero,
  isPositive,
  greaterThan,
  isNegative,
  compare,
} from 'dinero.js';

import type { Expense, Person, Settlement } from '../types';

/**
 * Calculate what each person owes or is owed based on expenses.
 * Returns a map of net balance per `personId`
 */
export function calculateNetBalances(
  expenses: Expense[],
  people: Person[],
  currency: DineroCurrency<number>
): Map<string, Dinero<number>> {
  const balances = new Map<string, Dinero<number>>();

  for (const person of people) {
    balances.set(person.id, dinero({ amount: 0, currency }));
  }

  for (const expense of expenses) {
    const shares = calculateShares(expense, people, currency);

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
 * Calculate individual shares for an expense based on split type.
 */
export function calculateShares(
  expense: Expense,
  people: Person[],
  currency: DineroCurrency<number>
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

    case 'exact': {
      for (const share of expense.shares) {
        shares.set(share.personId, dinero({ amount: share.value, currency }));
      }

      break;
    }
  }

  for (const person of people) {
    if (!shares.has(person.id)) {
      shares.set(person.id, dinero({ amount: 0, currency }));
    }
  }

  return shares;
}

/**
 * Calculate optimal settlements to minimize transactions.
 * Uses a greedy algorithm: match the largest creditor with the largest debtor.
 */
export function calculateSettlements(
  expenses: Expense[],
  people: Person[],
  currency: DineroCurrency<number>
): Settlement[] {
  const netBalances = calculateNetBalances(expenses, people, currency);
  const settlements: Settlement[] = [];

  const creditors: { id: string; amount: Dinero<number> }[] = [];
  const debtors: { id: string; amount: Dinero<number> }[] = [];

  for (const [personId, balance] of netBalances) {
    if (isPositive(balance)) {
      creditors.push({ id: personId, amount: balance });
    } else if (isNegative(balance)) {
      debtors.push({
        id: personId,
        amount: subtract(dinero({ amount: 0, currency }), balance),
      });
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
      debtor.amount = dinero({ amount: 0, currency });

      j++;
    } else if (greaterThan(debtor.amount, creditor.amount)) {
      settlementAmount = creditor.amount;
      debtor.amount = subtract(debtor.amount, creditor.amount);
      creditor.amount = dinero({ amount: 0, currency });

      i++;
    } else {
      settlementAmount = creditor.amount;
      creditor.amount = dinero({ amount: 0, currency });
      debtor.amount = dinero({ amount: 0, currency });

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

/**
 * Get the total amount spent across all expenses.
 */
export function getTotalExpenses(
  expenses: Expense[],
  currency: DineroCurrency<number>
): Dinero<number> {
  return expenses.reduce(
    (total, expense) => add(total, expense.amount),
    dinero({ amount: 0, currency })
  );
}
