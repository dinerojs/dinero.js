# Architecture

## Project Structure

```
packages/
└── dinero.js/            # Single consolidated package
    └── src/
        ├── api/          # All API functions (add, subtract, allocate, etc.)
        ├── bigint/       # BigInt entry point (dinero.js/bigint)
        ├── calculator/   # Number and BigInt calculator implementations
        ├── core/         # Types, helpers, utilities
        ├── currencies/   # ISO 4217 currency exports (dinero.js/currencies)
        └── dinero/       # Dinero factory function

docs/                     # VitePress documentation site
examples/                 # Sample projects (cart-react, cart-vue, etc.)
test/                     # Shared test utilities (imported as 'test-utils')
```

## Core Concepts

1. **Dinero Object**: Immutable representation of money with `amount` (in minor units), `currency`, and `scale`
2. **Calculator Pattern**: Pluggable arithmetic backends (number by default, bigint for precision)
3. **Pure Functions**: All operations are side-effect free and return new Dinero objects

## Build System

- **tsdown**: Single tool for bundling (powered by Rolldown) and type generation
- **Turborepo**: Build orchestration across workspaces
- **Globals**: `__DEV__` and `__TEST__` flags replaced at build time for tree-shaking

Package outputs:
- `dist/esm/` - ES modules with TypeScript declarations (main entry)
- `dist/umd/` - UMD bundles (for script tags)

## Testing

- Test files: `packages/dinero.js/src/**/__tests__/*.test.ts`
- Shared utilities in `/test/utils/` (import as `test-utils`)
