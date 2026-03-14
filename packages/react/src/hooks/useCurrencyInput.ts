import { dinero } from 'dinero.js';

import { createUseCurrencyInput } from './createUseCurrencyInput';

/**
 * Headless currency input hook for use with the number-based Dinero calculator.
 *
 * For bigint support, use `createUseCurrencyInput` with a bigint `dinero` factory.
 */
export const useCurrencyInput = createUseCurrencyInput(dinero);
