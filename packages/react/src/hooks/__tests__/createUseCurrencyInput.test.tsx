/**
 * @vitest-environment jsdom
 */
// oxlint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom/vitest';
import { renderHook } from '@testing-library/react';
import { dinero, toSnapshot } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

import { createUseCurrencyInput } from '..';

describe('createUseCurrencyInput', () => {
  it('returns a hook that creates Dinero objects using the provided factory', () => {
    const useCurrencyInput = createUseCurrencyInput(dinero);

    const { result } = renderHook(() =>
      useCurrencyInput({ currency: USD, locale: 'en-US', defaultValue: 1050 })
    );

    expect(result.current.inputProps.value).toBe('10.50');
    expect(toSnapshot(result.current.dineroValue)).toEqual({
      amount: 1050,
      currency: USD,
      scale: 2,
    });
  });
});
