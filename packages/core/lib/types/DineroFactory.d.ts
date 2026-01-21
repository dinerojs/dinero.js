import type { Dinero, DineroOptions } from '.';
export declare type DineroFactory<TAmount> = ({ amount, currency, scale, }: DineroOptions<TAmount>) => Dinero<TAmount>;
