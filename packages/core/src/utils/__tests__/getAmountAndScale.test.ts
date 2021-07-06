import { getAmountAndScale } from '../getAmountAndScale';

describe('getAmountAndScale', () => {
  it('returns the amount and scale with scaled amounts', () => {
    expect(getAmountAndScale({ amount: 100, scale: 2 }, 0)).toEqual({
      amount: 100,
      scale: 2,
    });
  });
  it('returns a zero scale when unspecified', () => {
    expect(getAmountAndScale({ amount: 100 }, 0)).toEqual({
      amount: 100,
      scale: 0,
    });
  });
  it('returns the amount and a zero scale with amounts', () => {
    expect(getAmountAndScale(100, 0)).toEqual({
      amount: 100,
      scale: 0,
    });
  });
});
