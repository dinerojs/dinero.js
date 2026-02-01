import { createRollupConfigs } from '../../scripts/rollup/config.js';

import pkg from './package.json' with { type: 'json' };

export default createRollupConfigs({
  pkg,
  inputs: ['index', 'bigint/index'],
});
