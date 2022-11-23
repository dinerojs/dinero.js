/* eslint-disable functional/no-expression-statement, no-console, import/no-unresolved */
import { USD } from 'npm:@dinero.js/currencies@2.0.0-alpha.10';
import { dinero, toFormat, toSnapshot } from 'npm:dinero.js@2.0.0-alpha.10';

const transformer = (props) => `${props.currency.code} ${props.amount}`;

const d = dinero({ amount: 999, currency: USD });

console.log('Snapshot:', toSnapshot(d));
console.log('Formatted:', toFormat(d, transformer));
