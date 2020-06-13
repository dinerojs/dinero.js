import { USD } from '@dinero.js/currencies';
import dinero from '../../..';
import createVariadicOperation from '../createVariadicOperation';

describe('createVariadicOperation', () => {
  it('creates a variadic operation function from a variadic function', () => {
    const spy = jest.fn((operands: readonly number[]) =>
      operands.reduce((acc, curr) => acc + curr)
    );
    const add = createVariadicOperation(spy);

    const d1 = dinero({ amount: 500, currency: USD });

    add([d1, d1]);

    expect(spy).toHaveBeenCalled();
  });
});
