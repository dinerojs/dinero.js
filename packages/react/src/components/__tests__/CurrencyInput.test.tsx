/**
 * @vitest-environment jsdom
 */
// oxlint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { toSnapshot } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

import { CurrencyInput } from '..';

describe('CurrencyInput', () => {
  describe('rendering', () => {
    it('renders an input element', () => {
      render(<CurrencyInput currency={USD} locale="en-US" />);

      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('sets `inputMode` to decimal and type to text', () => {
      render(<CurrencyInput currency={USD} locale="en-US" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('inputMode', 'decimal');
    });

    it('starts with a formatted zero value', () => {
      render(<CurrencyInput currency={USD} locale="en-US" />);

      expect(screen.getByRole('textbox')).toHaveValue('0.00');
    });
  });

  describe('ref', () => {
    it('forwards ref to the input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<CurrencyInput ref={ref} currency={USD} locale="en-US" />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toBe(screen.getByRole('textbox'));
    });
  });

  describe('HTML attributes', () => {
    it('passes through `className`', () => {
      render(
        <CurrencyInput currency={USD} locale="en-US" className="price-field" />
      );

      expect(screen.getByRole('textbox')).toHaveClass('price-field');
    });

    it('passes through aria attributes', () => {
      render(
        <CurrencyInput currency={USD} locale="en-US" aria-label="Price" />
      );

      expect(
        screen.getByRole('textbox', { name: 'Price' })
      ).toBeInTheDocument();
    });

    it('passes through placeholder', () => {
      render(
        <CurrencyInput
          currency={USD}
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
      render(<CurrencyInput currency={USD} locale="en-US" disabled />);

      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('form submission', () => {
    it('submits the raw minor-unit amount, not the formatted display value', () => {
      render(
        <CurrencyInput
          currency={USD}
          locale="en-US"
          name="price"
          value={105000}
        />
      );

      const hidden = document.querySelector(
        'input[name="price"]'
      ) as HTMLInputElement;
      expect(hidden).not.toBeNull();
      expect(hidden.type).toBe('hidden');
      expect(hidden.value).toBe('105000');
    });

    it('does not set name on the visible input', () => {
      render(<CurrencyInput currency={USD} locale="en-US" name="price" />);

      expect(screen.getByRole('textbox')).not.toHaveAttribute('name');
    });

    it('keeps the visible input formatted for display', () => {
      render(
        <CurrencyInput
          currency={USD}
          locale="en-US"
          name="price"
          value={105000}
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('1,050.00');
    });

    it('updates the hidden input value as the user types', async () => {
      const user = userEvent.setup();

      render(<CurrencyInput currency={USD} locale="en-US" name="price" />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('1050');

      const hidden = document.querySelector(
        'input[name="price"]'
      ) as HTMLInputElement;
      expect(hidden.value).toBe('1050');
    });

    it('submits the correct value with custom scale', () => {
      render(
        <CurrencyInput
          currency={USD}
          locale="en-US"
          name="price"
          value={10545}
          scale={3}
        />
      );

      const hidden = document.querySelector(
        'input[name="price"]'
      ) as HTMLInputElement;
      expect(hidden.value).toBe('10545');
    });
  });

  describe('controlled value', () => {
    it('uses the controlled value instead of internal state', () => {
      render(<CurrencyInput currency={USD} locale="en-US" value={1050} />);

      expect(screen.getByRole('textbox')).toHaveValue('10.50');
    });

    it('updates the display when the controlled value changes', async () => {
      const user = userEvent.setup();

      function Controlled() {
        const [value, setValue] = useState(1050);

        return (
          <>
            <CurrencyInput
              currency={USD}
              locale="en-US"
              value={value}
              aria-label="Price"
            />
            <button onClick={() => setValue(2499)}>Set to 2499</button>
          </>
        );
      }

      render(<Controlled />);
      expect(screen.getByRole('textbox', { name: 'Price' })).toHaveValue(
        '10.50'
      );

      await user.click(screen.getByRole('button', { name: 'Set to 2499' }));
      expect(screen.getByRole('textbox', { name: 'Price' })).toHaveValue(
        '24.99'
      );
    });

    it('resets the display when the controlled value is set to zero', async () => {
      const user = userEvent.setup();

      function Controlled() {
        const [value, setValue] = useState(1050);

        return (
          <>
            <CurrencyInput
              currency={USD}
              locale="en-US"
              value={value}
              onValueChange={(dinero) => setValue(toSnapshot(dinero).amount)}
              aria-label="Price"
            />
            <button onClick={() => setValue(0)}>Reset</button>
          </>
        );
      }

      render(<Controlled />);

      const input = screen.getByRole('textbox', { name: 'Price' });
      expect(input).toHaveValue('10.50');

      await user.click(input);
      await user.keyboard('99');
      expect(input).toHaveValue('1,050.99');

      await user.click(screen.getByRole('button', { name: 'Reset' }));
      expect(input).toHaveValue('0.00');
    });
  });

  describe('hook integration', () => {
    it('wires `useCurrencyInput` to the rendered input', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <CurrencyInput
          currency={USD}
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
        amount: 342,
        currency: USD,
        scale: 2,
      });
    });
  });
});
