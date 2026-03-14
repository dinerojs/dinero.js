/**
 * @vitest-environment jsdom
 */
// oxlint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from '@tanstack/react-form';
import { toSnapshot } from 'dinero.js';
import type { Dinero } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

import { CurrencyInput } from '../components';
import { useCurrencyInput } from '../hooks';

describe('TanStack Form integration', () => {
  it('works with `form.Field`', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    function TestForm() {
      const form = useForm({
        defaultValues: { price: null as Dinero<number> | null },
        onSubmit: ({ value }) => onSubmit(value),
      });

      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="price">
            {(field) => (
              <CurrencyInput
                currency={USD}
                format={{ locale: 'en-US' }}
                aria-label="Price"
                onValueChange={(dinero) => field.handleChange(dinero)}
              />
            )}
          </form.Field>
          <button type="submit">Submit</button>
        </form>
      );
    }

    render(<TestForm />);

    const input = screen.getByRole('textbox', { name: 'Price' });
    await user.click(input);
    await user.keyboard('1050');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(input).toHaveValue('10.50');
    expect(onSubmit).toHaveBeenCalledOnce();

    const formData = onSubmit.mock.calls[0][0];
    expect(toSnapshot(formData.price)).toEqual({
      amount: 1050,
      currency: USD,
      scale: 2,
    });
  });

  it('resets the input when the form is reset', async () => {
    const user = userEvent.setup();

    function TestForm() {
      const form = useForm({
        defaultValues: { price: 1050 },
      });

      return (
        <form>
          <form.Field name="price">
            {(field) => (
              <CurrencyInput
                currency={USD}
                format={{ locale: 'en-US' }}
                aria-label="Price"
                name="price"
                value={field.state.value}
                onValueChange={(dinero) =>
                  field.handleChange(toSnapshot(dinero).amount)
                }
              />
            )}
          </form.Field>
          <button type="button" onClick={() => form.reset()}>
            Reset
          </button>
        </form>
      );
    }

    render(<TestForm />);

    const input = screen.getByRole('textbox', { name: 'Price' });
    const hidden = document.querySelector(
      'input[name="price"]'
    ) as HTMLInputElement;
    expect(input).toHaveValue('10.50');
    expect(hidden.value).toBe('1050');

    await user.click(input);
    await user.keyboard('99');
    expect(input).toHaveValue('1,050.99');
    expect(hidden.value).toBe('105099');

    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(input).toHaveValue('10.50');
    expect(hidden.value).toBe('1050');
  });

  it('works with the `useCurrencyInput` hook directly', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    function TestForm() {
      const form = useForm({
        defaultValues: { price: null as Dinero<number> | null },
        onSubmit: ({ value }) => onSubmit(value),
      });

      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <TanStackHookInput
            onValueChange={(dinero) => form.setFieldValue('price', dinero)}
          />
          <button type="submit">Submit</button>
        </form>
      );
    }

    render(<TestForm />);

    const input = screen.getByRole('textbox', { name: 'Price' });
    await user.click(input);
    await user.keyboard('2499');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(input).toHaveValue('24.99');
    expect(onSubmit).toHaveBeenCalledOnce();

    const formData = onSubmit.mock.calls[0][0];
    expect(toSnapshot(formData.price)).toEqual({
      amount: 2499,
      currency: USD,
      scale: 2,
    });
  });
});

function TanStackHookInput({
  onValueChange,
}: {
  onValueChange: (dinero: Dinero<number>) => void;
}) {
  const { inputProps } = useCurrencyInput({
    currency: USD,
    format: { locale: 'en-US' },
    onValueChange,
  });

  return <input aria-label="Price" name="price" {...inputProps} />;
}
