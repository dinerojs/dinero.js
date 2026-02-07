import type { Dinero } from 'dinero.js';

export type SplitType = 'equal' | 'percentage';

export interface Person {
  id: string;
  name: string;
}

export interface ExpenseShare {
  personId: string;
  value: number; // For percentage: 0-100
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

export interface Settlement {
  from: string;
  to: string;
  amount: Dinero<number>;
}
