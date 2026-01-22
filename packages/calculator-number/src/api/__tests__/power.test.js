import { power, powerInt, powerFloat, fromValue } from '../power.js';

describe('power', () => {
  it('raises a positive number to the power of an exponent', () => {
    expect(power(2.0, 3.0)).toBe(8);
  });
  it('raises a negative number to the power of an exponent', () => {
    expect(power(-2.0, 3.0)).toBe(-8);
  });
  it('raises a float to the power of an exponent', () => {
    expect(power(1.5, 3.0)).toBe(3.375);
  });
  it('raises a number in scientific notation to the power of an exponent', () => {
    expect(power(1e5, 3.0)).toBe(1000000000000000);
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

describe('fromValue runtime checks', () => {
  it('throws error when passed a BigInt value', () => {
    expect(() => {
      fromValue(123n);
    }).toThrow('BigInt values not supported in calculator-number. Use calculator-bigint package instead.');
  });
});