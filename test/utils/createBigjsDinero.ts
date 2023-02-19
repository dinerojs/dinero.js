import { Big } from 'big.js';

import { createDinero } from 'dinero.js';
import type { DineroOptions, ComparisonOperator } from 'dinero.js';

const dinero = createDinero({
  calculator: {
    add: (a, b) => a.plus(b),
    compare: (a, b) => a.cmp(b) as unknown as ComparisonOperator,
    decrement: (v) => v.minus(new Big(1)),
    increment: (v) => v.plus(new Big(1)),
    integerDivide: (a, b) => a.div(b).round(0, Big.roundDown),
    modulo: (a, b) => a.mod(b),
    multiply: (a, b) => a.times(b),
    power: (a, b) => a.pow(Number(b)),
    subtract: (a, b) => a.minus(b),
    zero: () => new Big(0),
  },
  formatter: {
    // @ts-expect-error
    toNumber: (v) => v.toNumber(),
    // @ts-expect-error
    toString: (v) => v.toFixed(),
  },
});

export function createBigjsDinero(options: DineroOptions<Big>) {
  return dinero(options);
}
