/**
 * @vitest-environment jsdom
 */
// oxlint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, Controller } from 'react-hook-form';
import { toSnapshot } from 'dinero.js';
import type { Dinero } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

import { CurrencyInput } from '../components';

describe('React Hook Form integration', () => {
  it('works with `Controller`', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    function TestForm() {
      const { handleSubmit, control } = useForm<{
        price: Dinero<number> | null;
      }>({
        defaultValues: { price: null },
      });

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                currency={USD}
                locale="en-US"
                aria-label="Price"
                onValueChange={(dinero) => field.onChange(dinero)}
                onBlur={field.onBlur}
              />
            )}
          />
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
      const { handleSubmit, control, reset } = useForm<{
        price: number;
      }>({
        defaultValues: { price: 1050 },
      });

      return (
        <form onSubmit={handleSubmit(() => {})}>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                currency={USD}
                locale="en-US"
                aria-label="Price"
                value={field.value}
                onValueChange={(dinero) =>
                  field.onChange(toSnapshot(dinero).amount)
                }
                onBlur={field.onBlur}
              />
            )}
          />
          <button type="button" onClick={() => reset()}>
            Reset
          </button>
        </form>
      );
    }

    render(<TestForm />);

    const input = screen.getByRole('textbox', { name: 'Price' });
    expect(input).toHaveValue('10.50');

    await user.click(input);
    await user.keyboard('99');
    expect(input).toHaveValue('1,050.99');

    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(input).toHaveValue('10.50');
  });

  it('updates the hidden input value after typing', async () => {
    const user = userEvent.setup();

    function TestForm() {
      const { control } = useForm<{ price: number }>({
        defaultValues: { price: 0 },
      });

      return (
        <form>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                currency={USD}
                locale="en-US"
                aria-label="Price"
                name="price"
                value={field.value}
                onValueChange={(dinero) =>
                  field.onChange(toSnapshot(dinero).amount)
                }
              />
            )}
          />
        </form>
      );
    }

    render(<TestForm />);

    const input = screen.getByRole('textbox', { name: 'Price' });
    await user.click(input);
    await user.keyboard('1050');

    const hidden = document.querySelector(
      'input[name="price"]'
    ) as HTMLInputElement;
    expect(hidden.type).toBe('hidden');
    expect(hidden.value).toBe('1050');
  });

  it('works with the `useCurrencyInput` hook directly', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    function TestForm() {
      const { handleSubmit, setValue } = useForm<{
        price: Dinero<number> | null;
      }>({
        defaultValues: { price: null },
      });

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <CurrencyInput
            currency={USD}
            locale="en-US"
            aria-label="Price"
            name="price"
            onValueChange={(dinero) => setValue('price', dinero)}
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
