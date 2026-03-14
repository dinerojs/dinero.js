import { dinero } from 'dinero.js/bigint';

import { createUseCurrencyInput } from '../../hooks/createUseCurrencyInput';

/**
 * Headless currency input hook for use with the bigint-based Dinero calculator.
 *
 * For number support, use `useCurrencyInput` from `@dinerojs/react`.
 * For third-party calculators, use `createUseCurrencyInput` with a custom `dinero` factory.
 */
export const useCurrencyInput = createUseCurrencyInput(dinero);
