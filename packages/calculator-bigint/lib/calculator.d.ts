import { zero } from './api';
export declare const calculator: {
    add: import("@dinero.js/core").BinaryOperation<bigint, bigint>;
    compare: import("@dinero.js/core").BinaryOperation<bigint, import("@dinero.js/core").ComparisonOperator>;
    decrement: import("@dinero.js/core").UnaryOperation<bigint, bigint>;
    increment: import("@dinero.js/core").UnaryOperation<bigint, bigint>;
    integerDivide: import("@dinero.js/core").BinaryOperation<bigint, bigint>;
    modulo: import("@dinero.js/core").BinaryOperation<bigint, bigint>;
    multiply: import("@dinero.js/core").BinaryOperation<bigint, bigint>;
    power: import("@dinero.js/core").BinaryOperation<bigint, bigint>;
    subtract: import("@dinero.js/core").BinaryOperation<bigint, bigint>;
    zero: typeof zero;
};
