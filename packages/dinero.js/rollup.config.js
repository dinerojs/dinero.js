import { createRollupConfigs } from '../../scripts/rollup/config.js';

import pkg from './package.json' with { type: 'json' };

export default createRollupConfigs({
  pkg,
  inputs: [
    // Main bundles
    'index',
    'bigint/index',
    'currencies/index',
    // Granular function bundles (root level per RFC)
    'dinero',
    'add',
    'allocate',
    'compare',
    'convert',
    'equal',
    'greaterThan',
    'greaterThanOrEqual',
    'hasSubUnits',
    'haveSameAmount',
    'haveSameCurrency',
    'isNegative',
    'isPositive',
    'isZero',
    'lessThan',
    'lessThanOrEqual',
    'maximum',
    'minimum',
    'multiply',
    'normalizeScale',
    'subtract',
    'toDecimal',
    'toSnapshot',
    'toUnits',
    'transformScale',
    'trimScale',
  ],
});
