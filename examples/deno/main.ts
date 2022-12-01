/* eslint-disable functional/no-expression-statement, no-console, import/no-unresolved */
import { USD } from 'npm:@dinero.js/currencies';
import { dinero, toFormat, toSnapshot } from 'npm:dinero.js';

const transformer = (props) => `${props.currency.code} ${props.amount}`;

const d = dinero({ amount: 999, currency: USD });

console.log('Snapshot:', toSnapshot(d));
console.log('Formatted:', toFormat(d, transformer));
