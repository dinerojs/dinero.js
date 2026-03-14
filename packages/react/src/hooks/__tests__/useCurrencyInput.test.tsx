/**
 * @vitest-environment jsdom
 */
// oxlint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom/vitest';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { toSnapshot } from 'dinero.js';
import { USD, JPY, BHD } from 'dinero.js/currencies';
import type { Dinero, DineroCurrency } from 'dinero.js';

import { useCurrencyInput } from '..';
import type { UseCurrencyInputOptions } from '..';

describe('useCurrencyInput', () => {
  describe('inputProps', () => {
    it('sets `inputMode` to decimal and type to text', () => {
      const { result } = renderHook(() =>
        useCurrencyInput({ currency: USD, locale: 'en-US' })
      );

      expect(result.current.inputProps).toMatchObject({
        inputMode: 'decimal',
        type: 'text',
      });
    });

    it('exposes the formatted value as `value`', () => {
      const { result } = renderHook(() =>
        useCurrencyInput({ currency: USD, locale: 'en-US' })
      );

      expect(result.current.inputProps.value).toBe('0.00');
    });
  });

  describe('dineroValue', () => {
    it('exposes a zero Dinero object on mount', () => {
      const { result } = renderHook(() =>
        useCurrencyInput({ currency: USD, locale: 'en-US' })
      );

      expect(toSnapshot(result.current.dineroValue)).toEqual({
        amount: 0,
        currency: USD,
        scale: 2,
      });
    });

    it('uses `defaultValue` as the initial amount', () => {
      const { result } = renderHook(() =>
        useCurrencyInput({ currency: USD, locale: 'en-US', defaultValue: 2599 })
      );

      expect(toSnapshot(result.current.dineroValue)).toEqual({
        amount: 2599,
        currency: USD,
        scale: 2,
      });
    });

    it('updates on each keystroke', async () => {
      const user = userEvent.setup();
      const snapshots: Array<{ amount: number; scale: number }> = [];

      render(
        <TestHarness
          currency={USD}
          locale="en-US"
          onDineroChange={(d) => {
            const { amount, scale } = toSnapshot(d);
            snapshots.push({ amount, scale });
          }}
        />
      );

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('342');

      const nonZeroSnapshots = snapshots.filter(({ amount }) => amount !== 0);
      expect(nonZeroSnapshots).toEqual([
        { amount: 3, scale: 2 },
        { amount: 34, scale: 2 },
        { amount: 342, scale: 2 },
      ]);
    });
  });

  describe('typing digits', () => {
    it('starts with a formatted zero value', () => {
      render(<TestHarness currency={USD} locale="en-US" />);

      expect(screen.getByRole('textbox')).toHaveValue('0.00');
    });

    it('shifts digits left as they are typed', async () => {
      const user = userEvent.setup();
      render(<TestHarness currency={USD} locale="en-US" />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('1');

      expect(input).toHaveValue('0.01');

      await user.keyboard('2');
      expect(input).toHaveValue('0.12');

      await user.keyboard('3');
      expect(input).toHaveValue('1.23');
    });

    it('inserts grouping separators', async () => {
      const user = userEvent.setup();
      render(<TestHarness currency={USD} locale="en-US" />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('123456789');

      expect(input).toHaveValue('1,234,567.89');
    });

    it('ignores non-digit characters', async () => {
      const user = userEvent.setup();
      render(<TestHarness currency={USD} locale="en-US" />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('1a2b3');

      expect(input).toHaveValue('1.23');
    });

    it('ignores decimal points', async () => {
      const user = userEvent.setup();
      render(<TestHarness currency={USD} locale="en-US" />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('12.3');

      expect(input).toHaveValue('1.23');
    });
  });

  describe('defaultValue', () => {
    it('formats the default amount on mount', () => {
      render(<TestHarness currency={USD} locale="en-US" defaultValue={1050} />);

      expect(screen.getByRole('textbox')).toHaveValue('10.50');
    });

    it('appends typed digits after the default value', async () => {
      const user = userEvent.setup();
      render(<TestHarness currency={USD} locale="en-US" defaultValue={1050} />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('0');

      expect(input).toHaveValue('105.00');
    });
  });

  describe('scale', () => {
    it('uses the custom scale instead of the currency exponent', () => {
      const { result } = renderHook(() =>
        useCurrencyInput({
          currency: USD,
          locale: 'en-US',
          defaultValue: 10545,
          scale: 3,
        })
      );

      expect(result.current.inputProps.value).toBe('10.545');
      expect(toSnapshot(result.current.dineroValue)).toEqual({
        amount: 10545,
        currency: USD,
        scale: 3,
      });
    });

    it('shifts digits according to the custom scale', async () => {
      const user = userEvent.setup();
      let lastDinero!: Dinero<number>;

      render(
        <TestHarness
          currency={USD}
          locale="en-US"
          scale={3}
          onDineroChange={(d) => {
            lastDinero = d;
          }}
        />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('0.000');

      await user.click(input);
      await user.keyboard('12345');

      expect(input).toHaveValue('12.345');
      expect(toSnapshot(lastDinero)).toEqual({
        amount: 12345,
        currency: USD,
        scale: 3,
      });
    });
  });

  describe('Backspace', () => {
    it('removes digits from right to left', async () => {
      const user = userEvent.setup();
      render(<TestHarness currency={USD} locale="en-US" />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('1050');
      expect(input).toHaveValue('10.50');

      await user.keyboard('{Backspace}');
      expect(input).toHaveValue('1.05');

      await user.keyboard('{Backspace}');
      expect(input).toHaveValue('0.10');

      await user.keyboard('{Backspace}');
      expect(input).toHaveValue('0.01');

      await user.keyboard('{Backspace}');
      expect(input).toHaveValue('0.00');
    });

    it('clamps to zero when all digits are removed', async () => {
      const user = userEvent.setup();
      let lastDinero!: Dinero<number>;

      render(
        <TestHarness
          currency={USD}
          locale="en-US"
          onDineroChange={(d) => {
            lastDinero = d;
          }}
        />
      );

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('5');
      expect(input).toHaveValue('0.05');

      await user.keyboard('{Backspace}{Backspace}{Backspace}');
      expect(input).toHaveValue('0.00');
      expect(toSnapshot(lastDinero)).toEqual({
        amount: 0,
        currency: USD,
        scale: 2,
      });
    });
  });

  describe('paste', () => {
    it('strips non-digit characters and appends the digits', async () => {
      const user = userEvent.setup();
      let lastDinero!: Dinero<number>;

      render(
        <TestHarness
          currency={USD}
          locale="en-US"
          onDineroChange={(d) => {
            lastDinero = d;
          }}
        />
      );

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.paste('$10.50');

      expect(input).toHaveValue('10.50');
      expect(toSnapshot(lastDinero)).toEqual({
        amount: 1050,
        currency: USD,
        scale: 2,
      });
    });

    it('appends pasted digits to the existing value', async () => {
      const user = userEvent.setup();
      let lastDinero!: Dinero<number>;

      render(
        <TestHarness
          currency={USD}
          locale="en-US"
          onDineroChange={(d) => {
            lastDinero = d;
          }}
        />
      );

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('12');
      await user.paste('34');

      expect(input).toHaveValue('12.34');
      expect(toSnapshot(lastDinero)).toEqual({
        amount: 1234,
        currency: USD,
        scale: 2,
      });
    });
  });

  describe('onValueChange', () => {
    it('calls onValueChange with the current Dinero value on user input', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      function TestWithOnValueChange() {
        const { inputProps } = useCurrencyInput({
          currency: USD,
          locale: 'en-US',
          onValueChange,
        });

        return <input {...inputProps} />;
      }

      render(<TestWithOnValueChange />);
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('5');

      expect(onValueChange).toHaveBeenCalledOnce();
      expect(toSnapshot(onValueChange.mock.lastCall![0])).toEqual({
        amount: 5,
        currency: USD,
        scale: 2,
      });
    });

    it('calls onValueChange exactly once on Backspace', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      function TestWithOnValueChange() {
        const { inputProps } = useCurrencyInput({
          currency: USD,
          locale: 'en-US',
          defaultValue: 1050,
          onValueChange,
        });

        return <input {...inputProps} />;
      }

      render(<TestWithOnValueChange />);
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('{Backspace}');

      expect(onValueChange).toHaveBeenCalledOnce();
      expect(toSnapshot(onValueChange.mock.lastCall![0])).toEqual({
        amount: 105,
        currency: USD,
        scale: 2,
      });
    });

    it('calls onValueChange exactly once on paste', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      function TestWithOnValueChange() {
        const { inputProps } = useCurrencyInput({
          currency: USD,
          locale: 'en-US',
          onValueChange,
        });

        return <input {...inputProps} />;
      }

      render(<TestWithOnValueChange />);
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.paste('1050');

      expect(onValueChange).toHaveBeenCalledOnce();
      expect(toSnapshot(onValueChange.mock.lastCall![0])).toEqual({
        amount: 1050,
        currency: USD,
        scale: 2,
      });
    });
  });

  describe('currency exponent', () => {
    it('formats and creates Dinero objects for zero-decimal currencies', async () => {
      const user = userEvent.setup();
      let lastDinero!: Dinero<number>;

      render(
        <TestHarness
          currency={JPY}
          locale="ja-JP"
          onDineroChange={(d) => {
            lastDinero = d;
          }}
        />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('0');

      await user.click(input);
      await user.keyboard('1500');

      expect(input).toHaveValue('1,500');
      expect(toSnapshot(lastDinero)).toEqual({
        amount: 1500,
        currency: JPY,
        scale: 0,
      });
    });

    it('formats and creates Dinero objects for three-decimal currencies', async () => {
      const user = userEvent.setup();
      let lastDinero!: Dinero<number>;

      render(
        <TestHarness
          currency={BHD}
          locale="en-BH"
          onDineroChange={(d) => {
            lastDinero = d;
          }}
        />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('0.000');

      await user.click(input);
      await user.keyboard('12345');

      expect(input).toHaveValue('12.345');
      expect(toSnapshot(lastDinero)).toEqual({
        amount: 12345,
        currency: BHD,
        scale: 3,
      });
    });
  });

  describe('currency change', () => {
    it('reinterprets digits with a lower exponent currency', async () => {
      const user = userEvent.setup();
      let lastDinero!: Dinero<number>;

      function CurrencySwitch() {
        const [currency, setCurrency] = useState<DineroCurrency<number>>(USD);
        const [locale, setLocale] = useState('en-US');
        const { inputProps, dineroValue } = useCurrencyInput({
          currency,
          locale,
          defaultValue: 1050,
        });

        lastDinero = dineroValue;

        return (
          <>
            <input {...inputProps} />
            <button
              onClick={() => {
                setCurrency(JPY);
                setLocale('ja-JP');
              }}
            >
              Switch to JPY
            </button>
          </>
        );
      }

      render(<CurrencySwitch />);
      expect(screen.getByRole('textbox')).toHaveValue('10.50');

      // 1050 digits + JPY (exponent 0) = 1,050
      await user.click(screen.getByRole('button', { name: 'Switch to JPY' }));
      expect(screen.getByRole('textbox')).toHaveValue('1,050');
      expect(toSnapshot(lastDinero)).toEqual({
        amount: 1050,
        currency: JPY,
        scale: 0,
      });
    });

    it('reinterprets digits with a higher exponent currency', async () => {
      const user = userEvent.setup();
      let lastDinero!: Dinero<number>;

      function CurrencySwitch() {
        const [currency, setCurrency] = useState<DineroCurrency<number>>(USD);
        const [locale, setLocale] = useState('en-US');
        const { inputProps, dineroValue } = useCurrencyInput({
          currency,
          locale,
          defaultValue: 1050,
        });

        lastDinero = dineroValue;

        return (
          <>
            <input {...inputProps} />
            <button
              onClick={() => {
                setCurrency(BHD);
                setLocale('en-BH');
              }}
            >
              Switch to BHD
            </button>
          </>
        );
      }

      render(<CurrencySwitch />);
      expect(screen.getByRole('textbox')).toHaveValue('10.50');

      // 1050 digits + BHD (exponent 3) = 1.050
      await user.click(screen.getByRole('button', { name: 'Switch to BHD' }));
      expect(screen.getByRole('textbox')).toHaveValue('1.050');
      expect(toSnapshot(lastDinero)).toEqual({
        amount: 1050,
        currency: BHD,
        scale: 3,
      });
    });
  });

  describe('scale change', () => {
    it('reinterprets digits with the new scale', async () => {
      const user = userEvent.setup();
      let lastDinero!: Dinero<number>;

      function ScaleSwitch() {
        const [scale, setScale] = useState<number | undefined>(undefined);
        const { inputProps, dineroValue } = useCurrencyInput({
          currency: USD,
          locale: 'en-US',
          defaultValue: 1050,
          scale,
        });

        lastDinero = dineroValue;

        return (
          <>
            <input {...inputProps} />
            <button onClick={() => setScale(3)}>Switch scale</button>
          </>
        );
      }

      render(<ScaleSwitch />);
      expect(screen.getByRole('textbox')).toHaveValue('10.50');

      // 1050 digits + scale 3 = 1.050
      await user.click(screen.getByRole('button', { name: 'Switch scale' }));
      expect(screen.getByRole('textbox')).toHaveValue('1.050');
      expect(toSnapshot(lastDinero)).toEqual({
        amount: 1050,
        currency: USD,
        scale: 3,
      });
    });
  });

  describe('controlled value', () => {
    it('uses the controlled value instead of internal state', () => {
      render(<TestHarness currency={USD} locale="en-US" value={1050} />);

      expect(screen.getByRole('textbox')).toHaveValue('10.50');
    });

    it('updates the display when the controlled value changes', async () => {
      const user = userEvent.setup();

      function Controlled() {
        const [value, setValue] = useState(1050);
        const { inputProps } = useCurrencyInput({
          currency: USD,
          locale: 'en-US',
          value,
        });

        return (
          <>
            <input {...inputProps} />
            <button onClick={() => setValue(2499)}>Set to 2499</button>
          </>
        );
      }

      render(<Controlled />);
      expect(screen.getByRole('textbox')).toHaveValue('10.50');

      await user.click(screen.getByRole('button', { name: 'Set to 2499' }));
      expect(screen.getByRole('textbox')).toHaveValue('24.99');
    });

    it('resets the display when the controlled value is set to zero', async () => {
      const user = userEvent.setup();

      function Controlled() {
        const [value, setValue] = useState(1050);
        const { inputProps } = useCurrencyInput({
          currency: USD,
          locale: 'en-US',
          value,
          onValueChange: (dinero) => {
            setValue(toSnapshot(dinero).amount);
          },
        });

        return (
          <>
            <input {...inputProps} />
            <button onClick={() => setValue(0)}>Reset</button>
          </>
        );
      }

      render(<Controlled />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('10.50');

      await user.click(input);
      await user.keyboard('99');
      expect(input).toHaveValue('1,050.99');

      await user.click(screen.getByRole('button', { name: 'Reset' }));
      expect(input).toHaveValue('0.00');
    });

    it('updates dineroValue when the controlled value changes', async () => {
      const user = userEvent.setup();
      let lastDinero!: Dinero<number>;

      function Controlled() {
        const [value, setValue] = useState(1050);
        const { inputProps, dineroValue } = useCurrencyInput({
          currency: USD,
          locale: 'en-US',
          value,
        });

        lastDinero = dineroValue;

        return (
          <>
            <input {...inputProps} />
            <button onClick={() => setValue(2499)}>Set to 2499</button>
          </>
        );
      }

      render(<Controlled />);
      expect(toSnapshot(lastDinero)).toEqual({
        amount: 1050,
        currency: USD,
        scale: 2,
      });

      await user.click(screen.getByRole('button', { name: 'Set to 2499' }));
      expect(toSnapshot(lastDinero)).toEqual({
        amount: 2499,
        currency: USD,
        scale: 2,
      });
    });

    it('still allows typing when controlled', async () => {
      const user = userEvent.setup();

      function Controlled() {
        const [value, setValue] = useState(0);
        const { inputProps } = useCurrencyInput({
          currency: USD,
          locale: 'en-US',
          value,
          onValueChange: (dinero) => {
            setValue(toSnapshot(dinero).amount);
          },
        });

        return <input {...inputProps} />;
      }

      render(<Controlled />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('342');

      expect(input).toHaveValue('3.42');
    });

    it('ignores defaultValue when value is provided', () => {
      render(
        <TestHarness
          currency={USD}
          locale="en-US"
          value={1050}
          defaultValue={2499}
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('10.50');
    });

    it('warns in dev mode when both value and defaultValue are provided', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <TestHarness
          currency={USD}
          locale="en-US"
          value={1050}
          defaultValue={2499}
        />
      );

      expect(consoleSpy).toHaveBeenCalledOnce();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('defaultValue')
      );

      consoleSpy.mockRestore();
    });

    it('warns in dev mode when switching from uncontrolled to controlled', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const user = userEvent.setup();

      function SwitchToControlled() {
        const [value, setValue] = useState<number | undefined>(undefined);
        const { inputProps } = useCurrencyInput({
          currency: USD,
          locale: 'en-US',
          value,
        });

        return (
          <>
            <input {...inputProps} />
            <button onClick={() => setValue(1050)}>Control</button>
          </>
        );
      }

      render(<SwitchToControlled />);
      expect(consoleSpy).not.toHaveBeenCalled();

      await user.click(screen.getByRole('button', { name: 'Control' }));

      expect(consoleSpy).toHaveBeenCalledOnce();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('uncontrolled')
      );

      consoleSpy.mockRestore();
    });

    it('warns in dev mode when switching from controlled to uncontrolled', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const user = userEvent.setup();

      function SwitchToUncontrolled() {
        const [value, setValue] = useState<number | undefined>(1050);
        const { inputProps } = useCurrencyInput({
          currency: USD,
          locale: 'en-US',
          value,
        });

        return (
          <>
            <input {...inputProps} />
            <button onClick={() => setValue(undefined)}>Uncontrol</button>
          </>
        );
      }

      render(<SwitchToUncontrolled />);
      expect(consoleSpy).not.toHaveBeenCalled();

      await user.click(screen.getByRole('button', { name: 'Uncontrol' }));

      expect(consoleSpy).toHaveBeenCalledOnce();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('controlled')
      );

      consoleSpy.mockRestore();
    });
  });

  describe('locale change', () => {
    it('reformats the display with the new locale', async () => {
      const user = userEvent.setup();

      function LocaleSwitch() {
        const [locale, setLocale] = useState('en-US');
        const { inputProps } = useCurrencyInput({
          currency: USD,
          locale,
          defaultValue: 123456,
        });

        return (
          <>
            <input {...inputProps} />
            <button onClick={() => setLocale('de-DE')}>Switch locale</button>
          </>
        );
      }

      render(<LocaleSwitch />);
      expect(screen.getByRole('textbox')).toHaveValue('1,234.56');

      await user.click(screen.getByRole('button', { name: 'Switch locale' }));
      expect(screen.getByRole('textbox')).toHaveValue('1.234,56');
    });
  });
});

type TestHarnessProps = UseCurrencyInputOptions<number> & {
  onDineroChange?(value: Dinero<number>): void;
};

function TestHarness({ onDineroChange, ...options }: TestHarnessProps) {
  const { inputProps, dineroValue } = useCurrencyInput(options);

  onDineroChange?.(dineroValue);

  return <input {...inputProps} />;
}
