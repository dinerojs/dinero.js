import type { DineroCalculator } from '../types';

export function getDivisors<TAmount>(calculator: DineroCalculator<TAmount>) {
  const { multiply } = calculator;

  return (bases: readonly TAmount[]) => {
    return bases.reduce<readonly TAmount[]>((divisors, _, i) => {
      const divisor = bases.slice(i).reduce((acc, curr) => multiply(acc, curr));

      return [...divisors, divisor];
    }, []);
  };
}
