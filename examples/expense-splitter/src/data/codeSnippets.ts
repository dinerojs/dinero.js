export const codeSnippets = {
  summary: {
    title: 'Summing expenses',
    code: `const total = expenses.reduce(
  (sum, expense) => add(sum, expense.amount),
  dinero({ amount: 0, currency })
);`,
  },

  addExpense: {
    title: 'Creating a Dinero object',
    code: `// Convert dollars to cents
const amount = dinero({
  amount: dollars * 100,
  currency: USD
});`,
  },

  balances: {
    title: 'Calculating balances',
    code: `const balance = subtract(paid, owed);

if (isZero(balance)) {
  // Settled up
} else if (isPositive(balance)) {
  // Gets money back
}`,
  },

  settlements: {
    title: 'Settlement algorithm',
    code: `// Match largest creditor with debtor
if (greaterThan(credit, debt)) {
  payment = debt;
  remaining = subtract(credit, debt);
}`,
  },

  expenseList: {
    title: 'Splitting an expense',
    code: `// Equal split among 3 people
const shares = allocate(amount, [1, 1, 1]);
// $47 -> [$15.67, $15.67, $15.66]`,
  },

  formatting: {
    title: 'Formatting for display',
    code: `toDecimal(amount, ({ value, currency }) =>
  Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: currency.code,
  })
);`,
  },
};
