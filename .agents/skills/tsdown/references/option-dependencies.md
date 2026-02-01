# Dependencies

Control how dependencies are bundled or externalized.

## Overview

tsdown intelligently handles dependencies to keep your library lightweight while ensuring all necessary code is included.

## Default Behavior

### Auto-Externalized

These are **NOT bundled** by default:

- **`dependencies`** - Installed automatically with your package
- **`peerDependencies`** - User must install manually

### Conditionally Bundled

These are **bundled ONLY if imported**:

- **`devDependencies`** - Only if actually used in source code
- **Phantom dependencies** - In node_modules but not in package.json

## Configuration Options

### `external`

Mark dependencies as external (not bundled):

```ts
export default defineConfig({
  entry: ['src/index.ts'],
  external: [
    'react',              // Single package
    'react-dom',
    /^@myorg\//,         // Regex pattern (all @myorg/* packages)
    /^lodash/,           // All lodash packages
  ],
})
```

### `noExternal`

Force dependencies to be bundled:

```ts
export default defineConfig({
  entry: ['src/index.ts'],
  noExternal: [
    'some-package',      // Bundle this even if in dependencies
    'vendor-lib',
  ],
})
```

### `skipNodeModulesBundle`

Skip resolving and bundling ALL node_modules:

```ts
export default defineConfig({
  entry: ['src/index.ts'],
  skipNodeModulesBundle: true,
})
```

**Result:** No dependencies from node_modules are parsed or bundled.

## Common Patterns

### React Component Library

```ts
export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm', 'cjs'],
  external: [
    'react',
    'react-dom',
    /^react\//,          // react/jsx-runtime, etc.
  ],
  dts: true,
})
```

### Utility Library with Shared Deps

```ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  // Bundle lodash utilities
  noExternal: ['lodash-es'],
  dts: true,
})
```

### Monorepo Package

```ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  external: [
    /^@mycompany\//,     // Don't bundle other workspace packages
  ],
  dts: true,
})
```

### CLI Tool (Bundle Everything)

```ts
export default defineConfig({
  entry: ['src/cli.ts'],
  format: ['esm'],
  platform: 'node',
  // Bundle all dependencies for standalone CLI
  noExternal: [/.*/],
  shims: true,
})
```

### Library with Specific Externals

```ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  external: [
    'vue',
    '@vue/runtime-core',
    '@vue/reactivity',
  ],
  dts: true,
})
```

## Declaration Files

Dependency handling for `.d.ts` files follows the same rules as JavaScript.

### Complex Type Resolution

Use TypeScript resolver for complex third-party types:

```ts
export default defineConfig({
  entry: ['src/index.ts'],
  dts: {
    resolver: 'tsc',     // Use TypeScript resolver instead of Oxc
  },
})
```

**When to use `tsc` resolver:**
- Types in `@types/*` packages with non-standard naming (e.g., `@types/babel__generator`)
- Complex type dependencies
- Issues with default Oxc resolver

**Trade-off:** `tsc` is slower but more compatible.

## CLI Usage

### External

```bash
tsdown --external react --external react-dom
tsdown --external '/^@myorg\/.*/'
```

### No External

```bash
tsdown --no-external some-package
```

## Examples by Use Case

### Framework Component

```ts
// Don't bundle framework
export default defineConfig({
  external: ['vue', 'react', 'solid-js', 'svelte'],
})
```

### Standalone App

```ts
// Bundle everything
export default defineConfig({
  noExternal: [/.*/],
  skipNodeModulesBundle: false,
})
```

### Shared Library

```ts
// Bundle only specific utils
export default defineConfig({
  external: [/.*/],        // External by default
  noExternal: ['tiny-utils'], // Except this one
})
```

### Monorepo Package

```ts
// External workspace packages, bundle utilities
export default defineConfig({
  external: [
    /^@workspace\//,     // Other workspace packages
    'react',
    'react-dom',
  ],
  noExternal: [
    'lodash-es',         // Bundle utility libraries
  ],
})
```

## Troubleshooting

### Dependency Bundled Unexpectedly

Check if it's in `devDependencies` and imported. Move to `dependencies`:

```json
{
  "dependencies": {
    "should-be-external": "^1.0.0"
  }
}
```

Or explicitly externalize:

```ts
export default defineConfig({
  external: ['should-be-external'],
})
```

### Missing Dependency at Runtime

Ensure it's in `dependencies` or `peerDependencies`:

```json
{
  "dependencies": {
    "needed-package": "^1.0.0"
  }
}
```

Or bundle it:

```ts
export default defineConfig({
  noExternal: ['needed-package'],
})
```

### Type Resolution Errors

Use TypeScript resolver for complex types:

```ts
export default defineConfig({
  dts: {
    resolver: 'tsc',
  },
})
```

## Summary

**Default behavior:**
- `dependencies` & `peerDependencies` → External
- `devDependencies` & phantom deps → Bundled if imported

**Override:**
- `external` → Force external
- `noExternal` → Force bundled
- `skipNodeModulesBundle` → Skip all node_modules

**Declaration files:**
- Same bundling logic as JavaScript
- Use `resolver: 'tsc'` for complex types

## Tips

1. **Keep dependencies external** for libraries
2. **Bundle everything** for standalone CLIs
3. **Use regex patterns** for namespaced packages
4. **Check bundle size** to verify external/bundled split
5. **Test with fresh install** to catch missing dependencies
6. **Use tsc resolver** only when needed (slower)

## Related Options

- [External](option-dependencies.md) - This page
- [Platform](option-platform.md) - Runtime environment
- [Output Format](option-output-format.md) - Module formats
- [DTS](option-dts.md) - Type declarations
