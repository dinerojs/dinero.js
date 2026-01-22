import pkg from '../../../package.json';

export const intro = [
  `%cDinero.js console\n%cRun %cinit()%c or %cinit('${pkg.version}' /* version */)\n%cto load the library in the console.`,
  `line-height: 28px; font-size: 22px; font-family: 'Helvetica', sans-serif; color: #2856ef`,
  `line-height: 22px; font-size: 16px; font-family: 'Helvetica', sans-serif; color: #95a3cc`,
  `line-height: 22px; font-size: 12px; font-family: monospace`,
  `line-height: 22px; font-size: 16px; font-family: 'Helvetica', sans-serif; color: #95a3cc`,
  `line-height: 22px; font-size: 12px; font-family: monospace`,
  `line-height: 22px; font-size: 16px; font-family: 'Helvetica', sans-serif; color: #95a3cc`,
];

export const instructions = [
  `%cUse %c_ %cto access the API.\nLike: %c_.dinero({ amount: 100, currency: _.USD })`,
  `line-height: 22px; font-size: 16px; font-family: 'Helvetica', sans-serif; color: #95a3cc`,
  `line-height: 22px; font-size: 12px; font-family: monospace`,
  `line-height: 22px; font-size: 16px; font-family: 'Helvetica', sans-serif; color: #95a3cc`,
  `line-height: 22px; font-size: 12px; font-family: monospace`,
];
