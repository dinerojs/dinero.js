# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dinero.js is a JavaScript/TypeScript library for creating, calculating, and formatting money safely. It's a monorepo (v2.0.0-alpha) with core logic implemented in ReScript.

## Common Commands

All commands run from the repository root:

```bash
# Build
npm run res:build       # Build ReScript files to JavaScript
npm run build           # Build all packages (ESM, CJS, UMD, types)

# Testing  
npm test                # Run test suite across all packages
npm run test:size       # Check bundle sizes against limits

# Linting & Formatting
npm run res:format      # Format ReScript files
npm run format          # Format with Prettier

# Documentation site
npm run website:dev     # Run docs site locally (Next.js)
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
4. **ReScript Implementation**: Core logic implemented in ReScript, compiled to JavaScript

### API Categories in `@dinero.js/core`

- **Mutations**: add, subtract, multiply, allocate
- **Comparisons**: equal, greaterThan, lessThan, compare
- **Checks**: isPositive, isNegative, isZero, hasSubUnits, haveSameCurrency
- **Transformations**: normalizeScale, trimScale, transformScale
- **Utilities**: toSnapshot, toUnits, toDecimal, convert

## Path Aliases

Test utilities use this path alias:
- `test-utils` → `test/utils/`

## Build System

- **ReScript**: Compiles `.res` files to JavaScript
- **Rollup**: Generates ESM, CJS, and UMD bundles  
- **ReScript @genType**: Generates `.d.ts` files from ReScript annotated source code

Each package outputs:
- `lib/` - Compiled JavaScript from ReScript

## Testing

- Vitest test runner
- Test files: `src/**/*.test.js` 
- ReScript source files: `src/**/*.res`

## Code Conventions

- **Functional programming**: All functions are pure and immutable
- **ReScript**: Idiomatic ReScript patterns preferred over `%raw` JavaScript interop
- **Conventional Commits**: `type(scope): subject` (types: feat, fix, docs, refactor, test, etc.)
- Packages are always versioned together
