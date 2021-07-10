import { createRollupConfigs } from '../../scripts/rollup/config';

import pkg from './package.json';

export default createRollupConfigs({ pkg, inputs: ['index', 'latest', '168'] });
