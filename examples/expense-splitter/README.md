# Expense Splitter

A React app that splits expenses between friends and calculates optimal settlements, powered by [Dinero.js](https://dinerojs.com).

## What you'll learn

This example demonstrates how to use Dinero.js to solve real-world money problems:

- **Splitting bills fairly** with `allocate()`, handling remainders so no cent is lost
- **Tracking balances** with `add()` and `subtract()` to know who owes whom
- **Simplifying debts** with `compare()`, `greaterThan()`, and `isZero()` to minimize the number of payments
- **Formatting currency** with `toDecimal()` and `Intl.NumberFormat`
- **Persisting money objects** with `toSnapshot()` and `dinero()` for LocalStorage serialization

## Getting started

1. Install dependencies from the **repository root**:

   ```sh
   npm install
   ```

2. Navigate to the example:

   ```sh
   cd examples/expense-splitter
   ```

3. Start the dev server:

   ```sh
   npm run dev
   ```

## Learn more

Check out the [Dinero.js documentation](https://dinerojs.com) to explore the full API.
