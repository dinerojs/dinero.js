import { assert } from '../assert';

const errorMessage = 'Some error message.';

describe('assert', () => {
  it("doesn't throw when the condition is met", () => {
    expect(() => assert(true, errorMessage)).not.toThrow(
      new Error('[Dinero.js] Some error message.')
    );
  });
  it("throws when the condition isn't met", () => {
    expect(() => assert(false, errorMessage)).toThrow(
      new Error('[Dinero.js] Some error message.')
    );
  });
});
