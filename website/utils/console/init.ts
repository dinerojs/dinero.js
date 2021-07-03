import semverCoerce from 'semver/functions/coerce';
import semverValid from 'semver/functions/valid';
import semverSatisfies from 'semver/functions/satisfies';

type CreateInitParams<TInterface> = {
  defaultVersion: string,
  getLibrary(params: { version: string }): Promise<TInterface>,
  onInit(params: { library: TInterface }): void,
};

export function createInit<TInterface>({
  defaultVersion,
  getLibrary,
  onInit,
}: CreateInitParams<TInterface>) {
  return async function init(dirtyVersion: string = defaultVersion) {
    const version = semverValid(semverCoerce(dirtyVersion));
    const isValid = version && semverSatisfies(version, '1.x');

    if (version !== null && isValid) {
      const library = await getLibrary({ version });

      onInit({ library });
    }
  };
}
