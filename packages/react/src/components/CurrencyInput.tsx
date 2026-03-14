import { dinero } from 'dinero.js';

import { createCurrencyInput } from './createCurrencyInput';

/**
 * Headless currency input component for use with the number-based Dinero calculator.
 *
 * For bigint support, use `CurrencyInput` from `@dinerojs/react/bigint`.
 * For third-party calculators, use `createCurrencyInput` with a custom `dinero` factory.
 */
export const CurrencyInput = createCurrencyInput(dinero);
