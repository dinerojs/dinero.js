import type { Dinero } from 'dinero.js';

export type SplitType = 'equal' | 'percentage' | 'exact';

export interface Person {
  id: string;
  name: string;
}

export interface ExpenseShare {
  personId: string;
  value: number; // For percentage: 0-100, for exact: amount in cents
}

export interface Expense {
  id: string;
  description: string;
  amount: Dinero<number>;
  paidBy: string;
  splitType: SplitType;
  shares: ExpenseShare[];
  createdAt: Date;
}

export interface Balance {
  from: string;
  to: string;
  amount: Dinero<number>;
}

export interface Settlement {
  from: string;
  to: string;
  amount: Dinero<number>;
}
