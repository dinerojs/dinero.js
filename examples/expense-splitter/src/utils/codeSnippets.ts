import type { DineroCurrency } from 'dinero.js';
import type { Person, Expense, Settlement } from '../types';

function formatAmount(
  amount: number,
  currency: DineroCurrency<number>
): string {
  const dollars = amount / Math.pow(10, currency.exponent);

  return dollars.toLocaleString('en-US', {
    style: 'currency',
    currency: currency.code,
  });
}

export function generateAddExpenseSnippet(
  currency: DineroCurrency<number>,
  peopleCount: number
): { title: string; code: string } {
  const ratios = Array(Math.min(peopleCount || 3, 4)).fill(1);

  return {
    title: 'Creating & splitting expenses',
    code: `import { dinero, allocate } from 'dinero.js';
import { ${currency.code} } from 'dinero.js/currencies';

// Create a Dinero object (in minor units)
const expense = dinero({
  amount: 4500,  // ${formatAmount(4500, currency)}
  currency: ${currency.code}
});

// Split equally among ${ratios.length} people
const shares = allocate(expense, [${ratios.join(', ')}]);`,
  };
}

export function generateBalancesSnippet(
  people: Person[],
  currency: DineroCurrency<number>
): { title: string; code: string } {
  const name1 = people[0]?.name || 'Alice';
  const name2 = people[1]?.name || 'Bob';

  return {
    title: 'Calculating who owes what',
    code: `import { subtract, isPositive, isZero } from 'dinero.js';

// ${name1} paid $50, owes $25 share
const paid = dinero({ amount: 5000, currency: ${currency.code} });
const owed = dinero({ amount: 2500, currency: ${currency.code} });
const balance = subtract(paid, owed);

if (isZero(balance)) {
  // ${name1} is settled up
} else if (isPositive(balance)) {
  // ${name1} gets money back
} else {
  // ${name1} owes ${name2}
}`,
  };
}

export function generateSettlementsSnippet(): { title: string; code: string } {
  return {
    title: 'Optimizing payments',
    code: `import { greaterThan, subtract } from 'dinero.js';

// Match largest debtor with largest creditor
function settle(due, owed) {
  if (greaterThan(due, owed)) {
    // Debtor pays creditor's full amount
    return {
      payment: owed,
      remainingDue: subtract(due, owed)
    };
  }
  // Debtor pays their full debt
  return { payment: due, remainingOwed: ... };
}`,
  };
}

export function generateExpenseListSnippet(
  expenses: Expense[],
  people: Person[],
  currency: DineroCurrency<number>
): { title: string; code: string } {
  if (expenses.length === 0 || people.length === 0) {
    return {
      title: 'Fair allocation with allocate()',
      code: `import { dinero, allocate } from 'dinero.js';

// Split $47 among 3 people
const bill = dinero({ amount: 4700, currency: ${currency.code} });
const shares = allocate(bill, [1, 1, 1]);

// shares[0] = $15.67 (extra cent here)
// shares[1] = $15.67
// shares[2] = $15.66
// Total: $47.00 ✓ No cents lost!`,
    };
  }

  const expense = expenses[0];
  const amount = (expense.amount as any).toJSON().amount;
  const payer = people.find((p) => p.id === expense.paidBy)?.name || 'Someone';
  const shareCount = expense.shares.length;
  const ratios = expense.shares.map(() => 1);

  return {
    title: `Splitting each expense`,
    code: `import { dinero, allocate } from 'dinero.js';

// ${payer} paid ${formatAmount(amount, currency)}
const expense = dinero({
  amount: ${amount},
  currency: ${currency.code}
});

// Split among ${shareCount} people
const shares = allocate(expense, [${ratios.join(', ')}]);
// Remainder distributed fairly - no cents lost!`,
  };
}
