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
import type { Dinero } from 'dinero.js';
import { castToBigintCurrency } from 'test-utils';
import { dinero } from 'dinero.js/bigint';

import { useCurrencyInput } from '@dinerojs/react/bigint';
import type { UseCurrencyInputOptions } from '@dinerojs/react';

const bigintUSD = castToBigintCurrency(USD);
const bigintJPY = castToBigintCurrency(JPY);
const bigintBHD = castToBigintCurrency(BHD);

describe('useCurrencyInput (bigint)', () => {
  describe('inputProps', () => {
    it('sets `inputMode` to decimal and type to text', () => {
      const { result } = renderHook(() =>
        useCurrencyInput({
          defaultValue: dinero({ amount: 0n, currency: bigintUSD }),
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
          defaultValue: dinero({ amount: 0n, currency: bigintUSD }),
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
          defaultValue: dinero({ amount: 0n, currency: bigintUSD }),
          format: { locale: 'en-US' },
        })
      );

      expect(toSnapshot(result.current.dineroValue)).toEqual({
        amount: 0n,
        currency: bigintUSD,
        scale: 2n,
      });
    });

    it('uses `defaultValue` as the initial amount', () => {
      const { result } = renderHook(() =>
        useCurrencyInput({
          defaultValue: dinero({ amount: 2599n, currency: bigintUSD }),
          format: { locale: 'en-US' },
        })
      );

      expect(toSnapshot(result.current.dineroValue)).toEqual({
        amount: 2599n,
        currency: bigintUSD,
        scale: 2n,
      });
    });

    it('updates on each keystroke', async () => {
      const user = userEvent.setup();
      const snapshots: Array<{ amount: bigint; scale: bigint }> = [];

      render(
        <TestHarness
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
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

      const nonZeroSnapshots = snapshots.filter(({ amount }) => amount !== 0n);
      expect(nonZeroSnapshots).toEqual([
        { amount: 3n, scale: 2n },
        { amount: 34n, scale: 2n },
        { amount: 342n, scale: 2n },
      ]);
    });
  });

  describe('typing digits', () => {
    it('starts with a formatted zero value', () => {
      render(
        <TestHarness
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
          format={{ locale: 'en-US' }}
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('0.00');
    });

    it('shifts digits left as they are typed', async () => {
      const user = userEvent.setup();
      render(
        <TestHarness
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
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
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
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
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
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
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
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
          defaultValue={dinero({ amount: 1050n, currency: bigintUSD })}
          format={{ locale: 'en-US' }}
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('10.50');
    });

    it('appends typed digits after the default value', async () => {
      const user = userEvent.setup();
      render(
        <TestHarness
          defaultValue={dinero({ amount: 1050n, currency: bigintUSD })}
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
          defaultValue: dinero({
            amount: 10545n,
            currency: bigintUSD,
            scale: 3n,
          }),
          format: { locale: 'en-US' },
        })
      );

      expect(result.current.inputProps.value).toBe('10.545');
      expect(toSnapshot(result.current.dineroValue)).toEqual({
        amount: 10545n,
        currency: bigintUSD,
        scale: 3n,
      });
    });

    it('shifts digits according to a custom scale', async () => {
      const user = userEvent.setup();
      let lastDinero!: Dinero<bigint>;

      render(
        <TestHarness
          defaultValue={dinero({
            amount: 0n,
            currency: bigintUSD,
            scale: 3n,
          })}
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
        amount: 12345n,
        currency: bigintUSD,
        scale: 3n,
      });
    });
  });

  describe('Backspace', () => {
    it('removes digits from right to left', async () => {
      const user = userEvent.setup();
      render(
        <TestHarness
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
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
      let lastDinero!: Dinero<bigint>;

      render(
        <TestHarness
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
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
        amount: 0n,
        currency: bigintUSD,
        scale: 2n,
      });
    });
  });

  describe('paste', () => {
    it('strips non-digit characters and appends the digits', async () => {
      const user = userEvent.setup();
      let lastDinero!: Dinero<bigint>;

      render(
        <TestHarness
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
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
        amount: 1050n,
        currency: bigintUSD,
        scale: 2n,
      });
    });

    it('appends pasted digits to the existing value', async () => {
      const user = userEvent.setup();
      let lastDinero!: Dinero<bigint>;

      render(
        <TestHarness
          defaultValue={dinero({ amount: 0n, currency: bigintUSD })}
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
        amount: 1234n,
        currency: bigintUSD,
        scale: 2n,
      });
    });
  });

  describe('onValueChange', () => {
    it('calls onValueChange with the current Dinero value on user input', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      function TestWithOnValueChange() {
        const { inputProps } = useCurrencyInput({
          defaultValue: dinero({ amount: 0n, currency: bigintUSD }),
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
        amount: 5n,
        currency: bigintUSD,
        scale: 2n,
      });
    });

    it('calls onValueChange exactly once on Backspace', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      function TestWithOnValueChange() {
        const { inputProps } = useCurrencyInput({
          defaultValue: dinero({ amount: 1050n, currency: bigintUSD }),
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
        amount: 105n,
        currency: bigintUSD,
        scale: 2n,
      });
    });

    it('does not call `onValueChange` on Backspace when already at zero', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      function TestWithOnValueChange() {
        const { inputProps } = useCurrencyInput({
          defaultValue: dinero({ amount: 0n, currency: bigintUSD }),
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
          defaultValue: dinero({ amount: 0n, currency: bigintUSD }),
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
        amount: 1050n,
        currency: bigintUSD,
        scale: 2n,
      });
    });
  });

  describe('currency exponent', () => {
    it('formats and creates Dinero objects for zero-decimal currencies', async () => {
      const user = userEvent.setup();
      let lastDinero!: Dinero<bigint>;

      render(
        <TestHarness
          defaultValue={dinero({ amount: 0n, currency: bigintJPY })}
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
        amount: 1500n,
        currency: bigintJPY,
        scale: 0n,
      });
    });

    it('formats and creates Dinero objects for three-decimal currencies', async () => {
      const user = userEvent.setup();
      let lastDinero!: Dinero<bigint>;

      render(
        <TestHarness
          defaultValue={dinero({ amount: 0n, currency: bigintBHD })}
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
        amount: 12345n,
        currency: bigintBHD,
        scale: 3n,
      });
    });
  });

  describe('controlled value', () => {
    it('uses the controlled value instead of internal state', () => {
      render(
        <TestHarness
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
        const { inputProps } = useCurrencyInput({
          value,
          format: { locale: 'en-US' },
        });

        return (
          <>
            <input {...inputProps} />
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
      expect(screen.getByRole('textbox')).toHaveValue('10.50');

      await user.click(screen.getByRole('button', { name: 'Set to 2499' }));
      expect(screen.getByRole('textbox')).toHaveValue('24.99');
    });

    it('resets the display when the controlled value is set to zero', async () => {
      const user = userEvent.setup();

      function Controlled() {
        const [value, setValue] = useState(
          dinero({ amount: 1050n, currency: bigintUSD })
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
      let lastDinero!: Dinero<bigint>;

      function Controlled() {
        const [value, setValue] = useState(
          dinero({ amount: 1050n, currency: bigintUSD })
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
      expect(toSnapshot(lastDinero)).toEqual({
        amount: 1050n,
        currency: bigintUSD,
        scale: 2n,
      });

      await user.click(screen.getByRole('button', { name: 'Set to 2499' }));
      expect(toSnapshot(lastDinero)).toEqual({
        amount: 2499n,
        currency: bigintUSD,
        scale: 2n,
      });
    });

    it('still allows typing when controlled', async () => {
      const user = userEvent.setup();

      function Controlled() {
        const [value, setValue] = useState(
          dinero({ amount: 0n, currency: bigintUSD })
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
          value={dinero({ amount: 1050n, currency: bigintUSD })}
          defaultValue={dinero({ amount: 2499n, currency: bigintUSD })}
          format={{ locale: 'en-US' }}
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('10.50');
    });

    it('warns in dev mode when both value and defaultValue are provided', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <TestHarness
          value={dinero({ amount: 1050n, currency: bigintUSD })}
          defaultValue={dinero({ amount: 2499n, currency: bigintUSD })}
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
          defaultValue: dinero({ amount: 123456n, currency: bigintUSD }),
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

  describe('reset', () => {
    it('resets to `defaultValue`', async () => {
      const user = userEvent.setup();

      function ResetHarness() {
        const { inputProps, reset } = useCurrencyInput({
          defaultValue: dinero({ amount: 1050n, currency: bigintUSD }),
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
          dinero({ amount: 1050n, currency: bigintUSD })
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
});

type TestHarnessProps = UseCurrencyInputOptions<bigint> & {
  onDineroChange?(value: Dinero<bigint>): void;
};

function TestHarness({ onDineroChange, ...options }: TestHarnessProps) {
  const { inputProps, dineroValue } = useCurrencyInput(options);

  onDineroChange?.(dineroValue);

  return <input {...inputProps} />;
}
