# Auto-Generate Package Exports

Automatically generate package.json exports field from build output.

## Overview

tsdown can automatically infer and generate the `exports`, `main`, `module`, and `types` fields in your `package.json` based on your build outputs.

**Status:** Experimental - review before publishing.

## Basic Usage

### CLI

```bash
tsdown --exports
```

### Config File

```ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  exports: true,
})
```

## What Gets Generated

### Single Entry

**Config:**
```ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  exports: true,
})
```

**Generated in package.json:**
```json
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  }
}
```

### Multiple Entries

**Config:**
```ts
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    utils: 'src/utils.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  exports: true,
})
```

**Generated in package.json:**
```json
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    },
    "./utils": {
      "types": "./dist/utils.d.ts",
      "import": "./dist/utils.mjs",
      "require": "./dist/utils.cjs"
    }
  }
}
```

## Export All Files

Include all output files, not just entry points:

```ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  exports: {
    all: true,
  },
})
```

**Result:** All `.mjs`, `.cjs`, and `.d.ts` files will be added to exports.

## Dev-Time Source Linking

### Dev Exports

Link to source files during development:

```ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  exports: {
    devExports: true,
  },
})
```

**Generated:**
```json
{
  "exports": {
    ".": "./src/index.ts"  // Points to source
  },
  "publishConfig": {
    "exports": {
      ".": {
        "import": "./dist/index.mjs",
        "require": "./dist/index.cjs"
      }
    }
  }
}
```

**Note:** Supported by pnpm/yarn, not npm.

### Conditional Dev Exports

Use specific condition for dev exports:

```ts
export default defineConfig({
  exports: {
    devExports: 'development',
  },
})
```

**Generated:**
```json
{
  "exports": {
    ".": {
      "development": "./src/index.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  }
}
```

**Use with TypeScript customConditions:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "customConditions": ["development"]
  }
}
```

## Custom Exports

Add custom export mappings:

```ts
export default defineConfig({
  entry: ['src/index.ts'],
  exports: {
    customExports(pkg, context) {
      // Add custom export
      pkg['./foo'] = './dist/foo.js'

      // Add package.json export
      pkg['./package.json'] = './package.json'

      return pkg
    },
  },
})
```

## Common Patterns

### Complete Library Setup

```ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  exports: true,
  clean: true,
})
```

### Multiple Exports with Dev Mode

```ts
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    client: 'src/client.ts',
    server: 'src/server.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  exports: {
    all: false,  // Only entries
    devExports: 'development',
  },
})
```

### Monorepo Package

```ts
export default defineConfig({
  workspace: 'packages/*',
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  exports: true,  // Generate for each package
})
```

## Validation

### Enable Publint

Validate generated exports:

```bash
tsdown --exports --publint
```

Or in config:

```ts
export default defineConfig({
  exports: true,
  publint: true,  // Validate exports
})
```

## Tips

1. **Review before publishing** - Check generated fields
2. **Use with publint** - Validate exports field
3. **Enable for libraries** - Especially with multiple exports
4. **Use devExports** - Better DX during development
5. **Test exports** - Verify imports work correctly

## Troubleshooting

### Exports Not Generated

- Ensure `exports: true` is set
- Check build completed successfully
- Verify output files exist

### Wrong Export Paths

- Check `outDir` configuration
- Verify entry names match expectations
- Review `format` settings

### Dev Exports Not Working

- Only supported by pnpm/yarn
- Check package manager
- Use `publishConfig` for publishing

### Types Not Exported

- Enable `dts: true`
- Ensure TypeScript is installed
- Check `.d.ts` files are generated

## CLI Examples

```bash
# Generate exports
tsdown --exports

# With publint validation
tsdown --exports --publint

# Export all files
tsdown --exports

# With dev exports
tsdown --exports
```

## Related Options

- [Entry](option-entry.md) - Configure entry points
- [Output Format](option-output-format.md) - Module formats
- [DTS](option-dts.md) - Type declarations
