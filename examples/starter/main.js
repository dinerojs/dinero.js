/* eslint-disable functional/no-expression-statement, no-console */
import { USD } from '@dinero.js/currencies';
import { dinero, toFormat, toSnapshot } from 'dinero.js';

const transformer = (props) => `${props.currency.code} ${props.decimal}`;

const d = dinero({ amount: 999, currency: USD });

console.log('Snapshot:', toSnapshot(d));
console.log('Formatted:', toFormat(d, transformer));
