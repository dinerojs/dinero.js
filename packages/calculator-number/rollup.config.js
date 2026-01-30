import { createRollupConfigs } from '../../scripts/rollup/rescript-config.js';

import pkg from './package.json' with { type: 'json' };

export default createRollupConfigs({ pkg });
