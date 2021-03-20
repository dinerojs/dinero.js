import { assert } from '../assert';

const errorMessage = 'Some error message.';

describe('assert', () => {
  it("doesn't throw when the condition is met", () => {
    expect(() => assert(true, Error, errorMessage)).not.toThrow();
  });
  it("throws when the condition isn't met", () => {
    expect(() => assert(false, Error, errorMessage)).toThrow();
  });
});
