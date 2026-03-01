import { useState, useMemo, useCallback } from 'react';
import type { Dinero } from 'dinero.js';

import type { CurrencyCode, Category, Holding } from '@/lib/types';
import {
  holdingValue,
  convertToBase,
  sumDineros,
  formatMoney,
  zero,
} from '@/lib/money';

const DEFAULT_HOLDINGS: Holding[] = [
  {
    id: '1',
    name: 'Apple Inc.',
    category: 'Stocks',
    quantity: 15,
    unitPriceCents: 19850,
    currency: 'USD',
  },
  {
    id: '2',
    name: 'Bitcoin',
    category: 'Crypto',
    quantity: 0.5,
    unitPriceCents: 7843200,
    currency: 'EUR',
  },
  {
    id: '3',
    name: 'Euro Savings',
    category: 'Cash',
    quantity: 10000,
    unitPriceCents: 100,
    currency: 'EUR',
  },
  {
    id: '4',
    name: 'UK Govt Bonds',
    category: 'Bonds',
    quantity: 50,
    unitPriceCents: 10275,
    currency: 'GBP',
  },
];

const MOCK_CHANGES: Record<string, number> = {
  '1': 1.2,
  '2': -2.4,
  '3': 0.01,
  '4': 0.35,
};

let nextId = 5;

export interface HoldingWithValue extends Holding {
  originalValue: Dinero<number, CurrencyCode>;
  baseValue: Dinero<number, CurrencyCode>;
  baseValueFormatted: string;
  changePercent: number;
  baseValueNumber: number;
}

export function usePortfolio() {
  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>('USD');
  const [holdings, setHoldings] = useState<Holding[]>(DEFAULT_HOLDINGS);

  const addHolding = useCallback(() => {
    const newHolding: Holding = {
      id: String(nextId++),
      name: '',
      category: 'Stocks',
      quantity: 0,
      unitPriceCents: 0,
      currency: baseCurrency,
    };
    setHoldings((prev) => [...prev, newHolding]);
  }, [baseCurrency]);

  const removeHolding = useCallback((id: string) => {
    setHoldings((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const updateHolding = useCallback(
    (id: string, updates: Partial<Omit<Holding, 'id'>>) => {
      setHoldings((prev) =>
        prev.map((h) => (h.id === id ? { ...h, ...updates } : h))
      );
    },
    []
  );

  const holdingsWithValues: HoldingWithValue[] = useMemo(() => {
    return holdings.map((h) => {
      const originalValue = holdingValue(
        h.unitPriceCents,
        h.quantity,
        h.currency
      );
      const baseValue = convertToBase(originalValue, h.currency, baseCurrency);
      const baseValueFormatted = formatMoney(baseValue, baseCurrency);

      const baseValueNumber = parseFloat(
        baseValueFormatted.replace(/[^0-9.-]/g, '')
      );

      const changePercent =
        MOCK_CHANGES[h.id] ?? Math.round((Math.random() * 4 - 2) * 100) / 100;
      if (!MOCK_CHANGES[h.id]) {
        MOCK_CHANGES[h.id] = changePercent;
      }

      return {
        ...h,
        originalValue,
        baseValue,
        baseValueFormatted,
        changePercent,
        baseValueNumber,
      };
    });
  }, [holdings, baseCurrency]);

  const totalValueDinero = useMemo(() => {
    if (holdingsWithValues.length === 0) {
      return zero(baseCurrency);
    }

    return sumDineros(
      holdingsWithValues.map((h) => h.baseValue),
      baseCurrency
    );
  }, [holdingsWithValues, baseCurrency]);

  const totalValueFormatted = useMemo(
    () => formatMoney(totalValueDinero, baseCurrency),
    [totalValueDinero, baseCurrency]
  );

  const totalValueNumber = useMemo(
    () => holdingsWithValues.reduce((sum, h) => sum + h.baseValueNumber, 0),
    [holdingsWithValues]
  );

  const totalChange = useMemo(() => {
    const changeAmount = holdingsWithValues.reduce(
      (sum, h) => sum + h.baseValueNumber * (h.changePercent / 100),
      0
    );

    const percent =
      totalValueNumber > 0 ? (changeAmount / totalValueNumber) * 100 : 0;

    return { amount: changeAmount, percent };
  }, [holdingsWithValues, totalValueNumber]);

  const bestPerformer = useMemo(() => {
    if (holdingsWithValues.length === 0) {
      return null;
    }

    return holdingsWithValues.reduce((best, h) =>
      h.changePercent > best.changePercent ? h : best
    );
  }, [holdingsWithValues]);

  const currencyExposure = new Set(holdings.map((h) => h.currency)).size;

  const currencyBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};

    holdingsWithValues.forEach((h) => {
      breakdown[h.currency] = (breakdown[h.currency] || 0) + h.baseValueNumber;
    });

    return Object.entries(breakdown)
      .map(([currency, value]) => ({
        currency: currency as CurrencyCode,
        value,
        percent: totalValueNumber > 0 ? (value / totalValueNumber) * 100 : 0,
      }))
      .toSorted((a, b) => b.value - a.value);
  }, [holdingsWithValues, totalValueNumber]);

  const categoryBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};

    holdingsWithValues.forEach((h) => {
      breakdown[h.category] = (breakdown[h.category] || 0) + h.baseValueNumber;
    });

    return Object.entries(breakdown)
      .map(([category, value]) => ({
        category: category as Category,
        value,
        percent: totalValueNumber > 0 ? (value / totalValueNumber) * 100 : 0,
      }))
      .toSorted((a, b) => b.value - a.value);
  }, [holdingsWithValues, totalValueNumber]);

  const sortedHoldings = useMemo(
    () =>
      holdingsWithValues.toSorted(
        (a, b) => b.baseValueNumber - a.baseValueNumber
      ),
    [holdingsWithValues]
  );

  return {
    baseCurrency,
    setBaseCurrency,
    holdings,
    addHolding,
    removeHolding,
    updateHolding,
    holdingsWithValues: sortedHoldings,
    totalValueFormatted,
    totalValueNumber,
    totalChange,
    bestPerformer,
    currencyExposure,
    currencyBreakdown,
    categoryBreakdown,
  };
}
