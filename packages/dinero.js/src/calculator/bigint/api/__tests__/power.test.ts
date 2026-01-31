import { power } from '../power';

describe('power', () => {
  it('raises a positive number to the power of an exponent', () => {
    expect(power(2n, 3n)).toBe(8n);
  });
  it('raises a negative number to the power of an exponent', () => {
    expect(power(-2n, 3n)).toBe(-8n);
  });
});
