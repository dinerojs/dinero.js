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
        currency={USD}
        format={{ locale: 'en-US' }}
        defaultValue={1050}
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('10.50');
  });
});
