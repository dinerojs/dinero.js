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
import { castToBigintCurrency } from 'test-utils';
import { dinero } from 'dinero.js/bigint';

import { CurrencyInput } from '@dinerojs/react/bigint';

const bigintUSD = castToBigintCurrency(USD);

describe('CurrencyInput (bigint)', () => {
  describe('rendering', () => {
    it('renders an input element', () => {
      render(
        <CurrencyInput
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
          format={{ locale: 'en-US' }}
        />
      );

      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('sets `inputMode` to decimal and type to text', () => {
      render(
        <CurrencyInput
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
          format={{ locale: 'en-US' }}
        />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('inputMode', 'decimal');
    });

    it('starts with a formatted zero value', () => {
      render(
        <CurrencyInput
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
          format={{ locale: 'en-US' }}
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('0.00');
    });
  });

  describe('ref', () => {
    it('forwards ref to the input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <CurrencyInput
          ref={ref}
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
          format={{ locale: 'en-US' }}
        />
      );

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toBe(screen.getByRole('textbox'));
    });
  });

  describe('HTML attributes', () => {
    it('passes through `className`', () => {
      render(
        <CurrencyInput
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
          format={{ locale: 'en-US' }}
          className="price-field"
        />
      );

      expect(screen.getByRole('textbox')).toHaveClass('price-field');
    });

    it('passes through aria attributes', () => {
      render(
        <CurrencyInput
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
          format={{ locale: 'en-US' }}
          aria-label="Price"
        />
      );

      expect(
        screen.getByRole('textbox', { name: 'Price' })
      ).toBeInTheDocument();
    });

    it('passes through placeholder', () => {
      render(
        <CurrencyInput
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
          format={{ locale: 'en-US' }}
          placeholder="Enter amount"
        />
      );

      expect(screen.getByRole('textbox')).toHaveAttribute(
        'placeholder',
        'Enter amount'
      );
    });

    it('passes through disabled', () => {
      render(
        <CurrencyInput
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
          format={{ locale: 'en-US' }}
          disabled
        />
      );

      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('form submission', () => {
    it('does not render hidden inputs when `name` is not provided', () => {
      render(
        <CurrencyInput
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
          format={{ locale: 'en-US' }}
        />
      );

      const hiddenInputs = document.querySelectorAll('input[type="hidden"]');
      expect(hiddenInputs).toHaveLength(0);
    });

    it('submits amount, currency, and scale as separate hidden inputs', () => {
      render(
        <CurrencyInput
          value={dinero({ amount: 105000n, currency: bigintUSD })}
          format={{ locale: 'en-US' }}
          name="price"
        />
      );

      const amount = document.querySelector(
        'input[name="price[amount]"]'
      ) as HTMLInputElement;
      const currency = document.querySelector(
        'input[name="price[currency]"]'
      ) as HTMLInputElement;
      const scale = document.querySelector(
        'input[name="price[scale]"]'
      ) as HTMLInputElement;

      expect(amount).not.toBeNull();
      expect(amount.type).toBe('hidden');
      expect(amount.value).toBe('105000');

      expect(currency).not.toBeNull();
      expect(currency.type).toBe('hidden');
      expect(currency.value).toBe('USD');

      expect(scale).not.toBeNull();
      expect(scale.type).toBe('hidden');
      expect(scale.value).toBe('2');
    });

    it('does not set name on the visible input', () => {
      render(
        <CurrencyInput
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
          format={{ locale: 'en-US' }}
          name="price"
        />
      );

      expect(screen.getByRole('textbox')).not.toHaveAttribute('name');
    });
  });

  describe('form reset', () => {
    it('resets to `defaultValue` when the form is reset', async () => {
      const user = userEvent.setup();

      render(
        <form>
          <CurrencyInput
            defaultValue={dinero({ amount: 1050n, currency: bigintUSD })}
            format={{ locale: 'en-US' }}
            aria-label="Price"
          />
          <button type="reset">Reset</button>
        </form>
      );

      const input = screen.getByRole('textbox', { name: 'Price' });
      expect(input).toHaveValue('10.50');

      await user.click(input);
      await user.keyboard('99');
      expect(input).toHaveValue('1,050.99');

      await user.click(screen.getByRole('button', { name: 'Reset' }));
      expect(input).toHaveValue('10.50');
    });
  });

  describe('controlled value', () => {
    it('uses the controlled value instead of internal state', () => {
      render(
        <CurrencyInput
          value={dinero({ amount: 1050n, currency: bigintUSD })}
          format={{ locale: 'en-US' }}
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('10.50');
    });

    it('updates the display when the controlled value changes', async () => {
      const user = userEvent.setup();

      function Controlled() {
        const [value, setValue] = useState(
          dinero({ amount: 1050n, currency: bigintUSD })
        );

        return (
          <>
            <CurrencyInput
              value={value}
              format={{ locale: 'en-US' }}
              onValueChange={(d) => setValue(d)}
              aria-label="Price"
            />
            <button
              onClick={() =>
                setValue(dinero({ amount: 2499n, currency: bigintUSD }))
              }
            >
              Set to 2499
            </button>
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
        const [value, setValue] = useState(
          dinero({ amount: 1050n, currency: bigintUSD })
        );

        return (
          <>
            <CurrencyInput
              value={value}
              format={{ locale: 'en-US' }}
              onValueChange={(d) => setValue(d)}
              aria-label="Price"
            />
            <button
              onClick={() =>
                setValue(dinero({ amount: 0n, currency: bigintUSD }))
              }
            >
              Reset
            </button>
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
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
          format={{ locale: 'en-US' }}
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
