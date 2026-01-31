# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dinero.js is a JavaScript/TypeScript library for creating, calculating, and formatting money safely. It's a monorepo (v2.0.0-alpha) using npm workspaces and Turborepo.

## Common Commands

All commands run from the repository root:

```bash
# Build
npm run build              # Build all packages (ESM, CJS, UMD, types)
npm run build:clean        # Clean dist/lib directories before building

# Testing
npm test                   # Run Vitest test suite across all packages
npm run test:types         # Type check with TypeScript (noEmit)
npm run test:size          # Check bundle sizes against limits

# Linting & Formatting
npm run lint               # Run ESLint
npm run lint -- --fix      # Auto-fix lint issues
npm run format             # Format with Prettier

# Documentation site
npm run website:dev        # Run docs site locally (Next.js)
```

## Monorepo Structure

```
packages/
├── core/                 # Base types, helpers, and core API functions
├── dinero.js/            # Main entry point (aggregates core functionality)
├── currencies/           # Currency data and utilities
├── calculator-number/    # JavaScript Number-based calculator (default)
└── calculator-bigint/    # BigInt-based calculator (for precision)

website/                  # Next.js documentation site
examples/                 # Sample projects (cart-react, cart-vue, etc.)
test/                     # Shared test utilities (imported as 'test-utils')
scripts/                  # Build and development scripts
```

## Architecture

### Core Concepts

1. **Dinero Object**: Immutable representation of money with `amount` (in minor units), `currency`, and `scale`
2. **Calculator Pattern**: Pluggable arithmetic backends (`calculator-number` for standard JS numbers, `calculator-bigint` for precision)
3. **Pure Functions**: All operations are side-effect free and return new Dinero objects

### API Categories in `@dinero.js/core`

- **Mutations**: add, subtract, multiply, allocate
- **Comparisons**: equal, greaterThan, lessThan, compare
- **Checks**: isPositive, isNegative, isZero, hasSubUnits, haveSameCurrency
- **Transformations**: normalizeScale, trimScale, transformScale
- **Utilities**: toSnapshot, toUnits, toDecimal, convert

## Path Aliases

TypeScript and Vitest use these path aliases:
- `@dinero.js/*` → `packages/*/src/`
- `dinero.js` → `packages/dinero.js/src/`
- `test-utils` → `test/utils/`

## Build System

- **Babel**: Transpilation with TypeScript preset
- **Rollup**: Generates ESM, CJS, and UMD bundles
- **API Extractor**: Generates rolled-up `.d.ts` files from TypeScript declarations
- **Globals**: `__DEV__` and `__TEST__` flags replaced at build time for tree-shaking

Each package outputs:
- `dist/esm/` - ES modules (main entry)
- `dist/cjs/` - CommonJS
- `dist/umd/` - UMD bundles
- `lib/` - Intermediate TypeScript declarations

## Testing

- Vitest with native TypeScript support
- Test files: `src/**/__tests__/*.test.ts`
- Shared utilities in `/test/utils/` (import as `test-utils`)
- Global test APIs available (`describe`, `it`, `expect`, `vi`)

## Code Conventions

- **Functional programming**: All functions are pure and immutable
- **Conventional Commits**: `type(scope): subject` (types: feat, fix, docs, refactor, test, etc.)
- **ESLint**: Extends 'algolia' config with functional and sonarjs plugins
- **Prettier**: Single quotes, trailing commas (ES5)
- Packages are always versioned together
