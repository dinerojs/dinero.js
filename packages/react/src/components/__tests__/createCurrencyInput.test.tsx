/**
 * @vitest-environment jsdom
 */
// oxlint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { dinero } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

import { createCurrencyInput } from '..';

describe('createCurrencyInput', () => {
  it('returns a component that creates Dinero objects using the provided factory', () => {
    const CurrencyInput = createCurrencyInput(dinero);

    render(
      <CurrencyInput
        defaultValue={dinero({ amount: 1050, currency: USD })}
        format={{ locale: 'en-US' }}
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('10.50');
  });
});
