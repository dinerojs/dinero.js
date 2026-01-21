import { zero } from './api';
export declare const calculator: {
    add: import("@dinero.js/core").BinaryOperation<number, number>;
    compare: import("@dinero.js/core").BinaryOperation<number, import("@dinero.js/core").ComparisonOperator>;
    decrement: import("@dinero.js/core").UnaryOperation<number, number>;
    increment: import("@dinero.js/core").UnaryOperation<number, number>;
    integerDivide: import("@dinero.js/core").BinaryOperation<number, number>;
    modulo: import("@dinero.js/core").BinaryOperation<number, number>;
    multiply: import("@dinero.js/core").BinaryOperation<number, number>;
    power: import("@dinero.js/core").BinaryOperation<number, number>;
    subtract: import("@dinero.js/core").BinaryOperation<number, number>;
    zero: typeof zero;
};
