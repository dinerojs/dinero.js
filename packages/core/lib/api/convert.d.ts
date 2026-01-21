import type { Currency } from '@dinero.js/currencies';
import type { Calculator, Dinero, Rates } from '../types';
export declare type ConvertParams<TAmount> = readonly [
    dineroObject: Dinero<TAmount>,
    newCurrency: Currency<TAmount>,
    rates: Rates<TAmount>
];
export declare function convert<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, newCurrency: Currency<TAmount>, rates: Rates<TAmount>) => Dinero<TAmount>;
