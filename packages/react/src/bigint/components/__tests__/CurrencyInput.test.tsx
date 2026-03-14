/**
 * @vitest-environment jsdom
 */
// oxlint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { toSnapshot } from 'dinero.js';
import { USD } from 'dinero.js/currencies';
import { castToBigintCurrency } from 'test-utils';

import { CurrencyInput } from '@dinerojs/react/bigint';

const bigintUSD = castToBigintCurrency(USD);

describe('CurrencyInput (bigint)', () => {
  describe('rendering', () => {
    it('renders an input element', () => {
      render(<CurrencyInput currency={bigintUSD} locale="en-US" />);

      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('sets `inputMode` to decimal and type to text', () => {
      render(<CurrencyInput currency={bigintUSD} locale="en-US" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('inputMode', 'decimal');
    });

    it('starts with a formatted zero value', () => {
      render(<CurrencyInput currency={bigintUSD} locale="en-US" />);

      expect(screen.getByRole('textbox')).toHaveValue('0.00');
    });
  });

  describe('ref', () => {
    it('forwards ref to the input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<CurrencyInput ref={ref} currency={bigintUSD} locale="en-US" />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toBe(screen.getByRole('textbox'));
    });
  });

  describe('HTML attributes', () => {
    it('passes through `className`', () => {
      render(
        <CurrencyInput
          currency={bigintUSD}
          locale="en-US"
          className="price-field"
        />
      );

      expect(screen.getByRole('textbox')).toHaveClass('price-field');
    });

    it('passes through aria attributes', () => {
      render(
        <CurrencyInput currency={bigintUSD} locale="en-US" aria-label="Price" />
      );

      expect(
        screen.getByRole('textbox', { name: 'Price' })
      ).toBeInTheDocument();
    });

    it('passes through placeholder', () => {
      render(
        <CurrencyInput
          currency={bigintUSD}
          locale="en-US"
          placeholder="Enter amount"
        />
      );

      expect(screen.getByRole('textbox')).toHaveAttribute(
        'placeholder',
        'Enter amount'
      );
    });

    it('passes through disabled', () => {
      render(<CurrencyInput currency={bigintUSD} locale="en-US" disabled />);

      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('passes through name', () => {
      render(
        <CurrencyInput currency={bigintUSD} locale="en-US" name="price" />
      );

      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'price');
    });
  });

  describe('hook integration', () => {
    it('wires `useCurrencyInput` to the rendered input', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <CurrencyInput
          currency={bigintUSD}
          locale="en-US"
          onValueChange={onValueChange}
        />
      );

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('342');

      expect(input).toHaveValue('3.42');
      expect(onValueChange).toHaveBeenCalledTimes(3);
      expect(toSnapshot(onValueChange.mock.lastCall![0])).toEqual({
        amount: 342n,
        currency: bigintUSD,
        scale: 2n,
      });
    });
  });
});
