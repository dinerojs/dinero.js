/**
 * @vitest-environment jsdom
 */
// oxlint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, Form, useField } from 'formik';
import { dinero, toSnapshot } from 'dinero.js';
import type { Dinero } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

import { CurrencyInput } from '../components';
import { useCurrencyInput } from '../hooks';

describe('Formik integration', () => {
  it('works with `onValueChange` and `setFieldValue`', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    function TestForm() {
      return (
        <Formik<{ price: Dinero<number> | null }>
          initialValues={{ price: null }}
          onSubmit={onSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <CurrencyInput
                defaultValue={dinero({ amount: 0, currency: USD })}
                format={{ locale: 'en-US' }}
                aria-label="Price"
                name="price"
                onValueChange={(d) => setFieldValue('price', d)}
              />
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      );
    }

    render(<TestForm />);

    const input = screen.getByRole('textbox', { name: 'Price' });
    await user.click(input);
    await user.keyboard('1050');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(input).toHaveValue('10.50');

    const amount = document.querySelector(
      'input[name="price[amount]"]'
    ) as HTMLInputElement;
    const currency = document.querySelector(
      'input[name="price[currency]"]'
    ) as HTMLInputElement;
    const scale = document.querySelector(
      'input[name="price[scale]"]'
    ) as HTMLInputElement;
    expect(amount.type).toBe('hidden');
    expect(amount.value).toBe('1050');
    expect(currency.value).toBe('USD');
    expect(scale.value).toBe('2');

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
      return (
        <Formik<{ price: Dinero<number> }>
          initialValues={{ price: dinero({ amount: 1050, currency: USD }) }}
          onSubmit={() => {}}
        >
          {({ resetForm }) => (
            <Form>
              <FormikCurrencyField name="price" />
              <button type="button" onClick={() => resetForm()}>
                Reset
              </button>
            </Form>
          )}
        </Formik>
      );
    }

    render(<TestForm />);

    const input = screen.getByRole('textbox', { name: 'Price' });
    const amount = document.querySelector(
      'input[name="price[amount]"]'
    ) as HTMLInputElement;
    expect(input).toHaveValue('10.50');
    expect(amount.value).toBe('1050');

    await user.click(input);
    await user.keyboard('99');
    expect(input).toHaveValue('1,050.99');
    expect(amount.value).toBe('105099');

    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(input).toHaveValue('10.50');
    expect(amount.value).toBe('1050');
  });

  it('works with the `useCurrencyInput` hook directly', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    function FormikHookInput({
      setFieldValue,
    }: {
      setFieldValue: (field: string, value: Dinero<number>) => void;
    }) {
      const { inputProps } = useCurrencyInput({
        defaultValue: dinero({ amount: 0, currency: USD }),
        format: { locale: 'en-US' },
        onValueChange: (d) => setFieldValue('price', d),
      });

      return <input aria-label="Price" name="price" {...inputProps} />;
    }

    function TestForm() {
      return (
        <Formik<{ price: Dinero<number> | null }>
          initialValues={{ price: null }}
          onSubmit={onSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <FormikHookInput setFieldValue={setFieldValue} />
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
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

function FormikCurrencyField({ name }: { name: string }) {
  const [field, , helpers] = useField<Dinero<number>>(name);

  return (
    <CurrencyInput
      format={{ locale: 'en-US' }}
      aria-label="Price"
      name={name}
      value={field.value}
      onValueChange={(d) => helpers.setValue(d)}
    />
  );
}
