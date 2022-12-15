import { createRollupConfigs } from '../../scripts/rollup/config';

import pkg from './package.json';

export default createRollupConfigs({ pkg, config: { external: 'bn.js' } });
