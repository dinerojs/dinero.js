# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dinero.js is a JavaScript/TypeScript library for creating, calculating, and formatting money safely. It uses npm workspaces and Turborepo for build orchestration.

## Common Commands

All commands run from the repository root:

```bash
# Build
npm run build              # Build all packages (ESM, UMD, types)
npm run build:clean        # Clean dist/lib directories before building

# Testing
npm test                   # Run Vitest test suite
npm run test:types         # Type check with TypeScript (noEmit)
npm run test:size          # Check bundle sizes against limits

# Linting & Formatting
npm run lint               # Run Oxlint (fast Rust-based linter)
npm run format             # Format with Prettier

# Documentation site
npm run docs:dev           # Run VitePress docs locally
```

## Project Structure

```
packages/
└── dinero.js/            # Main package (single consolidated package)
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
scripts/                  # Build and development scripts
```

## Package Exports

The `dinero.js` package has three entry points:

```js
// Main API
import { dinero, add, subtract, allocate } from 'dinero.js';

// ISO 4217 currencies
import { USD, EUR } from 'dinero.js/currencies';

// BigInt variant (for large amounts or high precision)
import { dinero } from 'dinero.js/bigint';
```

## Architecture

### Core Concepts

1. **Dinero Object**: Immutable representation of money with `amount` (in minor units), `currency`, and `scale`
2. **Calculator Pattern**: Pluggable arithmetic backends (number by default, bigint for precision)
3. **Pure Functions**: All operations are side-effect free and return new Dinero objects

### API Categories

- **Mutations**: add, subtract, multiply, allocate
- **Comparisons**: equal, greaterThan, lessThan, compare
- **Checks**: isPositive, isNegative, isZero, hasSubUnits, haveSameCurrency
- **Transformations**: normalizeScale, trimScale, transformScale
- **Utilities**: toSnapshot, toUnits, toDecimal, convert

## Path Aliases

TypeScript and Vitest use these path aliases:
- `dinero.js` → `packages/dinero.js/src/`
- `dinero.js/currencies` → `packages/dinero.js/src/currencies/`
- `dinero.js/bigint` → `packages/dinero.js/src/bigint/`
- `test-utils` → `test/utils/`

## Build System

- **Babel**: Transpilation with TypeScript preset
- **Rollup**: Generates ESM and UMD bundles
- **API Extractor**: Generates rolled-up `.d.ts` files
- **Globals**: `__DEV__` and `__TEST__` flags replaced at build time for tree-shaking

Package outputs:
- `dist/esm/` - ES modules (main entry)
- `dist/umd/` - UMD bundles (for script tags)
- `lib/` - Intermediate TypeScript declarations

## Testing

- Vitest with native TypeScript support
- Test files: `packages/dinero.js/src/**/__tests__/*.test.ts`
- Shared utilities in `/test/utils/` (import as `test-utils`)
- Global test APIs available (`describe`, `it`, `expect`, `vi`)

## Code Conventions

- **Functional programming**: All functions are pure and immutable
- **Conventional Commits**: `type(scope): subject` (types: feat, fix, docs, refactor, test, etc.)
- **Oxlint**: Fast Rust-based linter for code quality
- **Prettier**: Single quotes, trailing commas (ES5)

## Linear Integration

This project uses Linear for project management (project: **Dinero.js v2.0.0 Stable Release**).

Use the `/commit` skill to create commits with automatic Linear issue linking. The skill will:
1. Analyze staged changes
2. Search for related Linear issues
3. Help you link commits to issues with `Fixes SAR-XXX` or `Part of SAR-XXX`
