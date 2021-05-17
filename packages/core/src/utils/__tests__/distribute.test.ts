import {
  add,
  compare,
  decrement,
  increment,
  integerDivide,
  modulo,
  multiply,
  subtract,
  zero,
} from '@dinero.js/calculator-number';

import { distribute } from '../distribute';

const distributeFn = distribute({
  add,
  compare,
  integerDivide,
  increment,
  decrement,
  multiply,
  subtract,
  zero,
  modulo,
});

describe('distribute', () => {
  it('distributes to percentages', () => {
    expect(distributeFn(1003, [50, 50])).toEqual([502, 501]);
  });
  it('distributes to ratios', () => {
    expect(distributeFn(100, [1, 3])).toEqual([25, 75]);
  });
  it('distributes negative amounts', () => {
    expect(distributeFn(-1003, [50, 50])).toEqual([-502, -501]);
  });
  it('distributes while ignoring zero ratios', () => {
    expect(distributeFn(1003, [0, 50, 50])).toEqual([0, 502, 501]);
  });
  it('distributes to zero ratios', () => {
    expect(distributeFn(1003, [0, 0])).toEqual([0, 0]);
  });
  it('distributes to negative ratios', () => {
    expect(distributeFn(1003, [-50, -50])).toEqual([502, 501]);
  });
  it('distributes negative amounts to negative ratios', () => {
    expect(distributeFn(-1003, [-50, -50])).toEqual([-502, -501]);
  });
  it('distributes to empty ratios', () => {
    expect(distributeFn(1003, [])).toEqual([]);
  });
});
