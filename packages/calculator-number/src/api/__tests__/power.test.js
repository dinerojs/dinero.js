import { power, powerInt, powerFloat, fromValue } from '../power.js';

describe('power (with fromValue conversion)', () => {
  it('raises a positive number to the power of an exponent', () => {
    expect(power(fromValue(2), fromValue(3))).toEqual({NAME: 'Int', VAL: 8});
  });
  it('raises a negative number to the power of an exponent', () => {
    expect(power(fromValue(-2), fromValue(3))).toEqual({NAME: 'Int', VAL: -8});
  });
  it('raises a float to the power of an exponent', () => {
    expect(power(fromValue(1.5), fromValue(3.0))).toEqual({NAME: 'Float', VAL: 3.375});
  });
  it('raises a number in scientific notation to the power of an exponent', () => {
    expect(power(fromValue(1e5), fromValue(3))).toEqual({NAME: 'Int', VAL: 1000000000000000});
  });
});

describe('powerInt', () => {
  it('raises a positive integer to the power of an integer exponent', () => {
    expect(powerInt(2, 3)).toBe(8);
  });
  it('raises a negative integer to the power of an integer exponent', () => {
    expect(powerInt(-2, 3)).toBe(-8);
  });
  it('raises an integer to a zero exponent', () => {
    expect(powerInt(5, 0)).toBe(1);
  });
});

describe('powerFloat', () => {
  it('raises a positive float to the power of a float exponent', () => {
    expect(powerFloat(2.0, 3.0)).toBe(8);
  });
  it('raises a negative float to the power of a float exponent', () => {
    expect(powerFloat(-2.0, 3.0)).toBe(-8);
  });
  it('raises a float to the power of an exponent', () => {
    expect(powerFloat(1.5, 3.0)).toBe(3.375);
  });
  it('raises a number in scientific notation to the power of an exponent', () => {
    expect(powerFloat(1e5, 3.0)).toBe(1000000000000000);
  });
});

describe('power (BigInt operations)', () => {
  it('raises a large number (BigInt) to an integer exponent', () => {
    // 1e15 should be converted to BigInt, 2^3 = 8 * 1e15
    const result = power(fromValue(1e15), fromValue(3));
    expect(result.NAME).toBe('BigInt');
    expect(result.VAL.toString()).toBe('1000000000000000000000000000000000000000000000');
  });
  
  it('raises a large negative number (BigInt) to an odd exponent', () => {
    const result = power(fromValue(-1e15), fromValue(3));
    expect(result.NAME).toBe('BigInt');
    expect(result.VAL.toString()).toBe('-1000000000000000000000000000000000000000000000');
  });
  
  it('raises a large negative number (BigInt) to an even exponent', () => {
    const result = power(fromValue(-1e15), fromValue(2));
    expect(result.NAME).toBe('BigInt');
    expect(result.VAL.toString()).toBe('1000000000000000000000000000000');
  });

  it('raises a BigInt to zero exponent returns 1', () => {
    const result = power(fromValue(1e15), fromValue(0));
    expect(result.NAME).toBe('BigInt');
    expect(result.VAL.toString()).toBe('1');
  });

  it('raises a BigInt to exponent 1 returns the same BigInt', () => {
    const result = power(fromValue(1e15), fromValue(1));
    expect(result.NAME).toBe('BigInt');
    expect(result.VAL.toString()).toBe('1000000000000000');
  });

  it('raises a BigInt base to a float exponent returns Float', () => {
    const result = power(fromValue(1e15), fromValue(2.5));
    expect(result.NAME).toBe('Float');
    expect(typeof result.VAL).toBe('number');
    expect(result.VAL).toBeGreaterThan(0);
  });

  it('raises a small BigInt base to a large exponent', () => {
    const result = power(fromValue(2e15), fromValue(4));
    expect(result.NAME).toBe('BigInt');
    expect(result.VAL.toString()).toBe('16000000000000000000000000000000000000000000000000000000000000');
  });

  it('throws error for BigInt base with negative exponent', () => {
    expect(() => {
      power(fromValue(1e15), fromValue(-2));
    }).toThrow('Negative exponents not supported for BigInt');
  });
});