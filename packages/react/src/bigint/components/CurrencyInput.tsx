import { dinero } from 'dinero.js/bigint';

import { createCurrencyInput } from '../../components/createCurrencyInput';

/**
 * Headless currency input component for use with the bigint-based Dinero calculator.
 *
 * For number support, use `CurrencyInput` from `@dinerojs/react`.
 * For third-party calculators, use `createCurrencyInput` with a custom `dinero` factory.
 */
export const CurrencyInput = createCurrencyInput(dinero);
