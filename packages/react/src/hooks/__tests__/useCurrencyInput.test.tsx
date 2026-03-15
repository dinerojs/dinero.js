/**
 * @vitest-environment jsdom
 */
// oxlint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom/vitest';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { dinero, toSnapshot } from 'dinero.js';
import { USD, JPY, BHD } from 'dinero.js/currencies';
import type { Dinero, DineroCurrency } from 'dinero.js';

import { useCurrencyInput } from '..';
import type { UseCurrencyInputOptions } from '..';

describe('useCurrencyInput', () => {
  describe('inputProps', () => {
    it('sets `inputMode` to decimal and type to text', () => {
      const { result } = renderHook(() =>
        useCurrencyInput({
          defaultValue: dinero({ amount: 0, currency: USD }),
          format: { locale: 'en-US' },
        })
      );

      expect(result.current.inputProps).toMatchObject({
        inputMode: 'decimal',
        type: 'text',
      });
    });

    it('exposes the formatted value as `value`', () => {
      const { result } = renderHook(() =>
        useCurrencyInput({
          defaultValue: dinero({ amount: 0, currency: USD }),
          format: { locale: 'en-US' },
        })
      );

      expect(result.current.inputProps.value).toBe('0.00');
    });
  });

  describe('dineroValue', () => {
    it('exposes the default Dinero object on mount', () => {
      const { result } = renderHook(() =>
        useCurrencyInput({
          defaultValue: dinero({ amount: 0, currency: USD }),
          format: { locale: 'en-US' },
        })
      );

      expect(toSnapshot(result.current.dineroValue)).toEqual({
        amount: 0,
        currency: USD,
        scale: 2,
      });
    });

    it('uses `defaultValue` as the initial amount', () => {
      const { result } = renderHook(() =>
        useCurrencyInput({
          defaultValue: dinero({ amount: 2599, currency: USD }),
          format: { locale: 'en-US' },
        })
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
          defaultValue={dinero({ amount: 0, currency: USD })}
          format={{ locale: 'en-US' }}
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
      render(
        <TestHarness
          defaultValue={dinero({ amount: 0, currency: USD })}
          format={{ locale: 'en-US' }}
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('0.00');
    });

    it('shifts digits left as they are typed', async () => {
      const user = userEvent.setup();
      render(
        <TestHarness
          defaultValue={dinero({ amount: 0, currency: USD })}
          format={{ locale: 'en-US' }}
        />
      );

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
      render(
        <TestHarness
          defaultValue={dinero({ amount: 0, currency: USD })}
          format={{ locale: 'en-US' }}
        />
      );

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('123456789');

      expect(input).toHaveValue('1,234,567.89');
    });

    it('ignores non-digit characters', async () => {
      const user = userEvent.setup();
      render(
        <TestHarness
          defaultValue={dinero({ amount: 0, currency: USD })}
          format={{ locale: 'en-US' }}
        />
      );

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('1a2b3');

      expect(input).toHaveValue('1.23');
    });

    it('ignores decimal points', async () => {
      const user = userEvent.setup();
      render(
        <TestHarness
          defaultValue={dinero({ amount: 0, currency: USD })}
          format={{ locale: 'en-US' }}
        />
      );

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('12.3');

      expect(input).toHaveValue('1.23');
    });
  });

  describe('defaultValue', () => {
    it('formats the default amount on mount', () => {
      render(
        <TestHarness
          defaultValue={dinero({ amount: 1050, currency: USD })}
          format={{ locale: 'en-US' }}
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('10.50');
    });

    it('appends typed digits after the default value', async () => {
      const user = userEvent.setup();
      render(
        <TestHarness
          defaultValue={dinero({ amount: 1050, currency: USD })}
          format={{ locale: 'en-US' }}
        />
      );

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('0');

      expect(input).toHaveValue('105.00');
    });

    it('uses a custom scale from the Dinero object', () => {
      const { result } = renderHook(() =>
        useCurrencyInput({
          defaultValue: dinero({ amount: 10545, currency: USD, scale: 3 }),
          format: { locale: 'en-US' },
        })
      );

      expect(result.current.inputProps.value).toBe('10.545');
      expect(toSnapshot(result.current.dineroValue)).toEqual({
        amount: 10545,
        currency: USD,
        scale: 3,
      });
    });

    it('shifts digits according to a custom scale', async () => {
      const user = userEvent.setup();
      let lastDinero!: Dinero<number>;

      render(
        <TestHarness
          defaultValue={dinero({ amount: 0, currency: USD, scale: 3 })}
          format={{ locale: 'en-US' }}
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
      render(
        <TestHarness
          defaultValue={dinero({ amount: 0, currency: USD })}
          format={{ locale: 'en-US' }}
        />
      );

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
          defaultValue={dinero({ amount: 0, currency: USD })}
          format={{ locale: 'en-US' }}
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
          defaultValue={dinero({ amount: 0, currency: USD })}
          format={{ locale: 'en-US' }}
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
          defaultValue={dinero({ amount: 0, currency: USD })}
          format={{ locale: 'en-US' }}
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
          defaultValue: dinero({ amount: 0, currency: USD }),
          format: { locale: 'en-US' },
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
          defaultValue: dinero({ amount: 1050, currency: USD }),
          format: { locale: 'en-US' },
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

    it('does not call `onValueChange` on Backspace when already at zero', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      function TestWithOnValueChange() {
        const { inputProps } = useCurrencyInput({
          defaultValue: dinero({ amount: 0, currency: USD }),
          format: { locale: 'en-US' },
          onValueChange,
        });

        return <input {...inputProps} />;
      }

      render(<TestWithOnValueChange />);
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('{Backspace}');

      expect(input).toHaveValue('0.00');
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it('calls onValueChange exactly once on paste', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      function TestWithOnValueChange() {
        const { inputProps } = useCurrencyInput({
          defaultValue: dinero({ amount: 0, currency: USD }),
          format: { locale: 'en-US' },
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
          defaultValue={dinero({ amount: 0, currency: JPY })}
          format={{ locale: 'ja-JP' }}
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
          defaultValue={dinero({ amount: 0, currency: BHD })}
          format={{ locale: 'en-BH' }}
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

  describe('controlled value', () => {
    it('uses the controlled value instead of internal state', () => {
      render(
        <TestHarness
          value={dinero({ amount: 1050, currency: USD })}
          format={{ locale: 'en-US' }}
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('10.50');
    });

    it('updates the display when the controlled value changes', async () => {
      const user = userEvent.setup();

      function Controlled() {
        const [value, setValue] = useState(
          dinero({ amount: 1050, currency: USD })
        );
        const { inputProps } = useCurrencyInput({
          value,
          format: { locale: 'en-US' },
        });

        return (
          <>
            <input {...inputProps} />
            <button
              onClick={() => setValue(dinero({ amount: 2499, currency: USD }))}
            >
              Set to 2499
            </button>
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
        const [value, setValue] = useState(
          dinero({ amount: 1050, currency: USD })
        );
        const { inputProps } = useCurrencyInput({
          value,
          format: { locale: 'en-US' },
          onValueChange: (d) => setValue(d),
        });

        return (
          <>
            <input {...inputProps} />
            <button
              onClick={() => setValue(dinero({ amount: 0, currency: USD }))}
            >
              Reset
            </button>
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
        const [value, setValue] = useState(
          dinero({ amount: 1050, currency: USD })
        );
        const { inputProps, dineroValue } = useCurrencyInput({
          value,
          format: { locale: 'en-US' },
        });

        lastDinero = dineroValue;

        return (
          <>
            <input {...inputProps} />
            <button
              onClick={() => setValue(dinero({ amount: 2499, currency: USD }))}
            >
              Set to 2499
            </button>
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
        const [value, setValue] = useState(
          dinero({ amount: 0, currency: USD })
        );
        const { inputProps } = useCurrencyInput({
          value,
          format: { locale: 'en-US' },
          onValueChange: (d) => setValue(d),
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
          value={dinero({ amount: 1050, currency: USD })}
          defaultValue={dinero({ amount: 2499, currency: USD })}
          format={{ locale: 'en-US' }}
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('10.50');
    });

    it('warns in dev mode when both value and defaultValue are provided', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <TestHarness
          value={dinero({ amount: 1050, currency: USD })}
          defaultValue={dinero({ amount: 2499, currency: USD })}
          format={{ locale: 'en-US' }}
        />
      );

      expect(consoleSpy).toHaveBeenCalledOnce();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('defaultValue')
      );

      consoleSpy.mockRestore();
    });
  });

  describe('format change', () => {
    it('reformats the display with the new format', async () => {
      const user = userEvent.setup();

      function FormatSwitch() {
        const [format, setFormat] = useState<{ locale: string }>({
          locale: 'en-US',
        });
        const { inputProps } = useCurrencyInput({
          defaultValue: dinero({ amount: 123456, currency: USD }),
          format,
        });

        return (
          <>
            <input {...inputProps} />
            <button onClick={() => setFormat({ locale: 'de-DE' })}>
              Switch format
            </button>
          </>
        );
      }

      render(<FormatSwitch />);
      expect(screen.getByRole('textbox')).toHaveValue('1,234.56');

      await user.click(screen.getByRole('button', { name: 'Switch format' }));
      expect(screen.getByRole('textbox')).toHaveValue('1.234,56');
    });
  });

  describe('object format', () => {
    it('formats using Intl.NumberFormat when given a locale object', () => {
      const { result } = renderHook(() =>
        useCurrencyInput({
          defaultValue: dinero({ amount: 1050, currency: USD }),
          format: { locale: 'en-US' },
        })
      );

      expect(result.current.inputProps.value).toBe('10.50');
    });

    it('passes through Intl.NumberFormat options', () => {
      const { result } = renderHook(() =>
        useCurrencyInput({
          defaultValue: dinero({ amount: 123456789, currency: USD }),
          format: { locale: 'en-US', useGrouping: false },
        })
      );

      expect(result.current.inputProps.value).toBe('1234567.89');
    });

    it('formats with a different locale', () => {
      const { result } = renderHook(() =>
        useCurrencyInput({
          defaultValue: dinero({ amount: 123456, currency: USD }),
          format: { locale: 'de-DE' },
        })
      );

      expect(result.current.inputProps.value).toBe('1.234,56');
    });

    it('formats zero-decimal currencies', () => {
      const { result } = renderHook(() =>
        useCurrencyInput({
          defaultValue: dinero({ amount: 0, currency: JPY }),
          format: { locale: 'ja-JP' },
        })
      );

      expect(result.current.inputProps.value).toBe('0');
    });

    it('formats with custom scale', () => {
      const { result } = renderHook(() =>
        useCurrencyInput({
          defaultValue: dinero({ amount: 10545, currency: USD, scale: 3 }),
          format: { locale: 'en-US' },
        })
      );

      expect(result.current.inputProps.value).toBe('10.545');
    });
  });

  describe('reset', () => {
    it('resets to `defaultValue`', async () => {
      const user = userEvent.setup();

      function ResetHarness() {
        const { inputProps, reset } = useCurrencyInput({
          defaultValue: dinero({ amount: 1050, currency: USD }),
          format: { locale: 'en-US' },
        });

        return (
          <>
            <input {...inputProps} />
            <button onClick={reset}>Reset</button>
          </>
        );
      }

      render(<ResetHarness />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('99');
      expect(input).toHaveValue('1,050.99');

      await user.click(screen.getByRole('button', { name: 'Reset' }));
      expect(input).toHaveValue('10.50');
    });

    it('does nothing for controlled inputs', async () => {
      const user = userEvent.setup();

      function ResetHarness() {
        const [value, setValue] = useState(
          dinero({ amount: 1050, currency: USD })
        );
        const { inputProps, reset } = useCurrencyInput({
          value,
          format: { locale: 'en-US' },
          onValueChange: (d) => setValue(d),
        });

        return (
          <>
            <input {...inputProps} />
            <button onClick={reset}>Reset</button>
          </>
        );
      }

      render(<ResetHarness />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('99');
      expect(input).toHaveValue('1,050.99');

      await user.click(screen.getByRole('button', { name: 'Reset' }));
      expect(input).toHaveValue('1,050.99');
    });
  });

  describe('custom format', () => {
    it('uses a custom format for display', () => {
      const { result } = renderHook(() =>
        useCurrencyInput({
          defaultValue: dinero({ amount: 1050, currency: USD }),
          format: ({ value }) => `$${value}`,
        })
      );

      expect(result.current.inputProps.value).toBe('$10.50');
    });

    it('receives value, currency, and scale', () => {
      const format = vi.fn(({ value }) => value);

      renderHook(() =>
        useCurrencyInput({
          defaultValue: dinero({ amount: 1050, currency: USD }),
          format,
        })
      );

      expect(format).toHaveBeenCalledWith({
        value: '10.50',
        currency: USD,
        scale: 2,
      });
    });

    it('receives the custom scale when provided', () => {
      const format = vi.fn(({ value }) => value);

      renderHook(() =>
        useCurrencyInput({
          defaultValue: dinero({ amount: 10545, currency: USD, scale: 3 }),
          format,
        })
      );

      expect(format).toHaveBeenCalledWith({
        value: '10.545',
        currency: USD,
        scale: 3,
      });
    });

    it('formats without grouping separators', async () => {
      const user = userEvent.setup();

      const noGroupingFormatter = ({
        value,
        scale,
      }: {
        value: string;
        currency: DineroCurrency<number>;
        scale: number;
      }) =>
        new Intl.NumberFormat('en-US', {
          minimumFractionDigits: scale,
          maximumFractionDigits: scale,
          useGrouping: false,
        }).format(value as string & number);

      render(
        <TestHarness
          defaultValue={dinero({ amount: 0, currency: USD })}
          format={noGroupingFormatter}
        />
      );

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('123456789');

      expect(input).toHaveValue('1234567.89');
    });

    it('formats with currency symbol', () => {
      const currencyFormatter = ({
        value,
        currency,
      }: {
        value: string;
        currency: DineroCurrency<number>;
        scale: number;
      }) =>
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency.code,
        }).format(value as string & number);

      const { result } = renderHook(() =>
        useCurrencyInput({
          defaultValue: dinero({ amount: 1050, currency: USD }),
          format: currencyFormatter,
        })
      );

      expect(result.current.inputProps.value).toBe('$10.50');
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
