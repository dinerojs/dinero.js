#!/usr/bin/env node
/* eslint-disable functional/no-try-statement, functional/no-throw-statement, functional/no-loop-statement, require-await */

/**
 * Custom release script for OIDC-based npm publishing.
 *
 * Ship.js's `trigger` command has a bug where it escapes ${NPM_AUTH_TOKEN}
 * incorrectly, breaking npm authentication. This script replaces that step.
 *
 * It detects Ship.js release commits and publishes packages using npm's
 * native OIDC support (via --provenance flag).
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

function exec(command, options = {}) {
  console.log(`$ ${command}`);
  try {
    return execSync(command, {
      cwd: rootDir,
      stdio: 'inherit',
      encoding: 'utf-8',
      ...options,
    });
  } catch (error) {
    if (options.ignoreError) {
      return null;
    }
    throw error;
  }
}

function execOutput(command) {
  return execSync(command, {
    cwd: rootDir,
    encoding: 'utf-8',
  }).trim();
}

function getLastCommitMessage() {
  return execOutput('git log -1 --pretty=%B');
}

function isReleaseCommit(message) {
  // Ship.js release commits start with "chore: release vX.X.X"
  // or "[Release] vX.X.X" depending on configuration
  return (
    message.startsWith('chore: release v') || message.startsWith('[Release]')
  );
}

function getPackagesToPublish() {
  // Packages to publish based on ship.config.js packagesToPublish
  return [
    'packages/core',
    'packages/currencies',
    'packages/calculator-number',
    'packages/calculator-bigint',
    'packages/dinero.js',
  ];
}

function getPackageInfo(packageDir) {
  const packageJsonPath = join(rootDir, packageDir, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  return {
    name: packageJson.name,
    version: packageJson.version,
    private: packageJson.private || false,
  };
}

function isPackagePublished(name, version) {
  try {
    execSync(`npm view ${name}@${version} version`, {
      cwd: rootDir,
      stdio: 'pipe',
      encoding: 'utf-8',
    });
    return true;
  } catch {
    return false;
  }
}

function publishPackage(packageDir, tag) {
  const packagePath = join(rootDir, packageDir);
  const { name, version, private: isPrivate } = getPackageInfo(packageDir);

  if (isPrivate) {
    console.log(`Skipping ${name} (private package)`);
    return;
  }

  // Check if already published
  if (isPackagePublished(name, version)) {
    console.log(`Skipping ${name}@${version} (already published)`);
    return;
  }

  console.log(`\nPublishing ${name}@${version} with tag "${tag}"...`);

  // Use --provenance for OIDC attestation
  exec(`npm publish --access public --tag ${tag} --provenance`, {
    cwd: packagePath,
  });

  console.log(`Successfully published ${name}@${version}`);
}

function determineTag(version) {
  if (version.includes('alpha')) {
    return 'alpha';
  }
  if (version.includes('beta')) {
    return 'beta';
  }
  if (version.includes('rc')) {
    return 'rc';
  }
  return 'latest';
}

function createGitTag(version) {
  const tag = `v${version}`;

  // Check if tag already exists
  try {
    execSync(`git rev-parse ${tag}`, { cwd: rootDir, stdio: 'pipe' });
    console.log(`Git tag ${tag} already exists`);
    return;
  } catch {
    // Tag doesn't exist, create it
  }

  console.log(`Creating git tag ${tag}...`);
  exec(`git tag ${tag}`);
  exec(`git push origin ${tag}`);
}

async function main() {
  const forceRelease = process.env.FORCE_RELEASE === 'true';

  console.log('Checking if this is a release commit...\n');

  const commitMessage = getLastCommitMessage();
  console.log(`Last commit: ${commitMessage.split('\n')[0]}`);

  if (!isReleaseCommit(commitMessage) && !forceRelease) {
    console.log('\nNot a release commit. Skipping publish.');
    console.log('Set FORCE_RELEASE=true to publish anyway.');
    process.exit(0);
  }

  if (forceRelease) {
    console.log('\nFORCE_RELEASE is set. Proceeding with publish...\n');
  } else {
    console.log('\nThis is a release commit. Starting publish process...\n');
  }

  // Get version from root package.json
  const rootPackageJson = JSON.parse(
    readFileSync(join(rootDir, 'package.json'), 'utf-8')
  );
  const version = rootPackageJson.version;
  const tag = determineTag(version);

  console.log(`Version: ${version}`);
  console.log(`NPM tag: ${tag}`);

  // Publish all packages
  const packages = getPackagesToPublish();

  for (const pkg of packages) {
    try {
      publishPackage(pkg, tag);
    } catch (error) {
      console.error(`Failed to publish ${pkg}:`, error.message);
      process.exit(1);
    }
  }

  // Create git tag
  try {
    createGitTag(version);
  } catch (error) {
    console.error('Failed to create git tag:', error.message);
    // Don't fail the release for tag issues
  }

  console.log('\nRelease complete!');
}

main().catch((error) => {
  console.error('Release failed:', error);
  process.exit(1);
});
