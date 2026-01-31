import { USD } from 'npm:dinero.js/currencies';
import { dinero, toDecimal, toSnapshot } from 'npm:dinero.js';

const transformer = ({ value, currency }) => `${currency.code} ${value}`;

const d = dinero({ amount: 999, currency: USD });

console.log('Snapshot:', toSnapshot(d));
console.log('Formatted:', toDecimal(d, transformer));
