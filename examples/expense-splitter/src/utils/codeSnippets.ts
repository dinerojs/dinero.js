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

export function generateSummarySnippet(
  expenses: Expense[],
  currency: DineroCurrency<number>
): { title: string; code: string } {
  if (expenses.length === 0) {
    return {
      title: 'Summing expenses with add()',
      code: `import { dinero, add } from 'dinero.js';

// Add expenses together safely
const total = expenses.reduce(
  (sum, expense) => add(sum, expense.amount),
  dinero({ amount: 0, currency: ${currency.code} })
);`,
    };
  }

  const amounts = expenses.slice(0, 3).map((e) => {
    const snap = { amount: (e.amount as any).toJSON().amount };
    return snap.amount;
  });

  return {
    title: 'Summing expenses with add()',
    code: `import { dinero, add } from 'dinero.js';
import { ${currency.code} } from 'dinero.js/currencies';

const expense1 = dinero({ amount: ${amounts[0]}, currency: ${currency.code} });
${amounts[1] ? `const expense2 = dinero({ amount: ${amounts[1]}, currency: ${currency.code} });` : ''}

// Add them safely - no floating point errors!
const total = add(expense1${amounts[1] ? ', expense2' : ''});
// Result: ${formatAmount(
      amounts.reduce((a, b) => a + b, 0),
      currency
    )}`,
  };
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

// Create a Dinero object (amount in minor units)
const expense = dinero({
  amount: 4500,  // ${formatAmount(4500, currency)}
  currency: ${currency.code}
});

// Split equally among ${ratios.length} people
const shares = allocate(expense, [${ratios.join(', ')}]);
// Each person's share is calculated precisely`,
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

export function generateSettlementsSnippet(
  settlements: Settlement[],
  people: Person[],
  currency: DineroCurrency<number>
): { title: string; code: string } {
  const getName = (id: string) =>
    people.find((p) => p.id === id)?.name || 'Someone';

  if (settlements.length === 0) {
    return {
      title: 'Optimizing payments',
      code: `import { greaterThan, subtract } from 'dinero.js';

// Match largest debtor with largest creditor
function settle(debtorOwes, creditorGets) {
  if (greaterThan(debtorOwes, creditorGets)) {
    // Debtor pays creditor's full amount
    return {
      payment: creditorGets,
      debtorRemaining: subtract(debtorOwes, creditorGets)
    };
  }
  // Debtor pays their full debt
  return { payment: debtorOwes, creditorRemaining: ... };
}`,
    };
  }

  const s = settlements[0];
  const fromName = getName(s.from);
  const toName = getName(s.to);
  const amount = (s.amount as any).toJSON().amount;

  return {
    title: 'Settlement calculation',
    code: `import { greaterThan, subtract } from 'dinero.js';

// Current settlement: ${fromName} → ${toName}
const payment = dinero({
  amount: ${amount},  // ${formatAmount(amount, currency)}
  currency: ${currency.code}
});

// Greedy algorithm minimizes transactions
// by matching largest creditor with debtor
if (greaterThan(${fromName.toLowerCase()}Owes, ${toName.toLowerCase()}Gets)) {
  // ${fromName} pays ${toName}'s full balance
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
    title: `Splitting "${expense.description}"`,
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

export function generateFormattingSnippet(currency: DineroCurrency<number>): {
  title: string;
  code: string;
} {
  return {
    title: 'Formatting for display',
    code: `import { toDecimal } from 'dinero.js';

const price = dinero({ amount: 1999, currency: ${currency.code} });

// Format with Intl.NumberFormat
const formatted = toDecimal(price, ({ value, currency }) =>
  Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: currency.code,
  })
);
// Returns: "${formatAmount(1999, currency)}"`,
  };
}
