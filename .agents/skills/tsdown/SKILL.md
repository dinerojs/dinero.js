---
name: tsdown
description: Bundle TypeScript and JavaScript libraries with blazing-fast speed powered by Rolldown. Use when building libraries, generating type declarations, bundling for multiple formats, or migrating from tsup.
---

# tsdown - The Elegant Library Bundler

Blazing-fast bundler for TypeScript/JavaScript libraries powered by Rolldown and Oxc.

## When to Use

- Building TypeScript/JavaScript libraries for npm
- Generating TypeScript declaration files (.d.ts)
- Bundling for multiple formats (ESM, CJS, IIFE, UMD)
- Optimizing bundles with tree shaking and minification
- Migrating from tsup with minimal changes
- Building React, Vue, Solid, or Svelte component libraries

## Quick Start

```bash
# Install
pnpm add -D tsdown

# Basic usage
npx tsdown

# With config file
npx tsdown --config tsdown.config.ts

# Watch mode
npx tsdown --watch

# Migrate from tsup
npx tsdown-migrate
```

## Basic Configuration

```ts
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
})
```

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Getting Started | Installation, first bundle, CLI basics | [guide-getting-started](references/guide-getting-started.md) |
| Configuration File | Config file formats, multiple configs, workspace | [option-config-file](references/option-config-file.md) |
| CLI Reference | All CLI commands and options | [reference-cli](references/reference-cli.md) |
| Migrate from tsup | Migration guide and compatibility notes | [guide-migrate-from-tsup](references/guide-migrate-from-tsup.md) |
| Plugins | Rolldown, Rollup, Unplugin support | [advanced-plugins](references/advanced-plugins.md) |
| Hooks | Lifecycle hooks for custom logic | [advanced-hooks](references/advanced-hooks.md) |
| Programmatic API | Build from Node.js scripts | [advanced-programmatic](references/advanced-programmatic.md) |
| Rolldown Options | Pass options directly to Rolldown | [advanced-rolldown-options](references/advanced-rolldown-options.md) |
| CI Environment | CI detection, `'ci-only'` / `'local-only'` values | [advanced-ci](references/advanced-ci.md) |

## Build Options

| Option | Usage | Reference |
|--------|-------|-----------|
| Entry points | `entry: ['src/*.ts', '!**/*.test.ts']` | [option-entry](references/option-entry.md) |
| Output formats | `format: ['esm', 'cjs', 'iife', 'umd']` | [option-output-format](references/option-output-format.md) |
| Output directory | `outDir: 'dist'`, `outExtensions` | [option-output-directory](references/option-output-directory.md) |
| Type declarations | `dts: true`, `dts: { sourcemap, compilerOptions, vue }` | [option-dts](references/option-dts.md) |
| Target environment | `target: 'es2020'`, `target: 'esnext'` | [option-target](references/option-target.md) |
| Platform | `platform: 'node'`, `platform: 'browser'` | [option-platform](references/option-platform.md) |
| Tree shaking | `treeshake: true`, custom options | [option-tree-shaking](references/option-tree-shaking.md) |
| Minification | `minify: true`, `minify: 'dce-only'` | [option-minification](references/option-minification.md) |
| Source maps | `sourcemap: true`, `'inline'`, `'hidden'` | [option-sourcemap](references/option-sourcemap.md) |
| Watch mode | `watch: true`, watch options | [option-watch-mode](references/option-watch-mode.md) |
| Cleaning | `clean: true`, clean patterns | [option-cleaning](references/option-cleaning.md) |
| Log level | `logLevel: 'silent'`, `failOnWarn: 'ci-only'` | [option-log-level](references/option-log-level.md) |

## Dependency Handling

| Feature | Usage | Reference |
|---------|-------|-----------|
| External deps | `external: ['react', /^@myorg\//]` | [option-dependencies](references/option-dependencies.md) |
| Inline deps | `noExternal: ['dep-to-bundle']` | [option-dependencies](references/option-dependencies.md) |
| Auto external | Automatic peer/dependency externalization | [option-dependencies](references/option-dependencies.md) |

## Output Enhancement

| Feature | Usage | Reference |
|---------|-------|-----------|
| Shims | `shims: true` - Add ESM/CJS compatibility | [option-shims](references/option-shims.md) |
| CJS default | `cjsDefault: true` (default) / `false` | [option-cjs-default](references/option-cjs-default.md) |
| Package exports | `exports: true` - Auto-generate exports field | [option-package-exports](references/option-package-exports.md) |
| CSS handling | **[experimental]** Still in development | [option-css](references/option-css.md) |
| Unbundle mode | `unbundle: true` - Preserve directory structure | [option-unbundle](references/option-unbundle.md) |
| Package validation | `publint: true`, `attw: true` - Validate package | [option-lint](references/option-lint.md) |

## Framework & Runtime Support

| Framework | Guide | Reference |
|-----------|-------|-----------|
| React | JSX transform, Fast Refresh | [recipe-react](references/recipe-react.md) |
| Vue | SFC support, JSX | [recipe-vue](references/recipe-vue.md) |
| WASM | WebAssembly modules via `rolldown-plugin-wasm` | [recipe-wasm](references/recipe-wasm.md) |

## Common Patterns

### Basic Library Bundle

```ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
})
```

### Multiple Entry Points

```ts
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    utils: 'src/utils.ts',
    cli: 'src/cli.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
})
```

### Browser Library (IIFE/UMD)

```ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['iife'],
  globalName: 'MyLib',
  platform: 'browser',
  minify: true,
})
```

### React Component Library

```ts
export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  external: ['react', 'react-dom'],
  plugins: [
    // React Fast Refresh support
  ],
})
```

### Preserve Directory Structure

```ts
export default defineConfig({
  entry: ['src/**/*.ts', '!**/*.test.ts'],
  unbundle: true, // Preserve file structure
  format: ['esm'],
  dts: true,
})
```

### CI-Aware Configuration

```ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  failOnWarn: 'ci-only',
  publint: 'ci-only',
  attw: 'ci-only',
})
```

### WASM Support

```ts
import { wasm } from 'rolldown-plugin-wasm'
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  plugins: [wasm()],
})
```

### Advanced with Hooks

```ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  hooks: {
    'build:before': async (context) => {
      console.log('Building...')
    },
    'build:done': async (context) => {
      console.log('Build complete!')
    },
  },
})
```

## Configuration Features

### Multiple Configs

Export an array for multiple build configurations:

```ts
export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
  },
  {
    entry: ['src/cli.ts'],
    format: ['esm'],
    platform: 'node',
  },
])
```

### Conditional Config

Use functions for dynamic configuration:

```ts
export default defineConfig((options) => {
  const isDev = options.watch
  return {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    minify: !isDev,
    sourcemap: isDev,
  }
})
```

### Workspace/Monorepo

Use glob patterns to build multiple packages:

```ts
export default defineConfig({
  workspace: 'packages/*',
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
})
```

## CLI Quick Reference

```bash
# Basic commands
tsdown                          # Build once
tsdown --watch                  # Watch mode
tsdown --config custom.ts       # Custom config
npx tsdown-migrate              # Migrate from tsup

# Output options
tsdown --format esm,cjs        # Multiple formats
tsdown --outDir lib            # Custom output directory
tsdown --minify                # Enable minification
tsdown --dts                   # Generate declarations

# Entry options
tsdown src/index.ts            # Single entry
tsdown src/*.ts                # Glob patterns
tsdown src/a.ts src/b.ts       # Multiple entries

# Development
tsdown --watch                 # Watch mode
tsdown --sourcemap             # Generate source maps
tsdown --clean                 # Clean output directory
```

## Best Practices

1. **Always generate type declarations** for TypeScript libraries:
   ```ts
   { dts: true }
   ```

2. **Externalize dependencies** to avoid bundling unnecessary code:
   ```ts
   { external: [/^react/, /^@myorg\//] }
   ```

3. **Use tree shaking** for optimal bundle size:
   ```ts
   { treeshake: true }
   ```

4. **Enable minification** for production builds:
   ```ts
   { minify: true }
   ```

5. **Add shims** for better ESM/CJS compatibility:
   ```ts
   { shims: true }  // Adds __dirname, __filename, etc.
   ```

6. **Auto-generate package.json exports**:
   ```ts
   { exports: true }  // Creates proper exports field
   ```

7. **Use watch mode** during development:
   ```bash
   tsdown --watch
   ```

8. **Preserve structure** for utilities with many files:
   ```ts
   { unbundle: true }  // Keep directory structure
   ```

9. **Validate packages** in CI before publishing:
   ```ts
   { publint: 'ci-only', attw: 'ci-only' }
   ```

## Resources

- Documentation: https://tsdown.dev
- GitHub: https://github.com/rolldown/tsdown
- Rolldown: https://rolldown.rs
- Migration Guide: https://tsdown.dev/guide/migrate-from-tsup
