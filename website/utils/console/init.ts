import semverCoerce from 'semver/functions/coerce';
import semverSatisfies from 'semver/functions/satisfies';
import semverValid from 'semver/functions/valid';

import { instructions } from './messages';
import pkg from '../../../package.json';

export async function init(dirtyVersion: string = pkg.version) {
  const allowedRange = '2.x';
  const version = semverValid(dirtyVersion);
  const coercedVersion = semverCoerce(version);
  const isValid = Boolean(
    version && coercedVersion && semverSatisfies(coercedVersion, allowedRange)
  );

  if (version && isValid) {
    const dineroUrl = `https://cdn.jsdelivr.net/npm/dinero.js@${version}/dist/umd/index.production.js`;
    const dineroCurrenciesUrl = `https://cdn.jsdelivr.net/npm/@dinero.js/currencies@${version}/dist/umd/index.production.js`;

    try {
      await import(/* webpackIgnore: true */ dineroUrl);
      await import(/* webpackIgnore: true */ dineroCurrenciesUrl);
    } catch (err) {
      return;
    }

    window._ = { ...window.dinero.js, ...window['@dinero.js/currencies'] };
    delete window.dinero;
    delete window['@dinero.js/currencies'];

    console.log(...instructions);
  } else {
    console.error(
      `Please provide a version which satisfies range "${allowedRange}".`
    );
  }
}
