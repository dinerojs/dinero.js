# CLAUDE.md

Dinero.js: a JavaScript/TypeScript money library. npm workspaces + Turborepo monorepo.

## Commands

```bash
npm run test:types         # Type-check with TypeScript (noEmit)
npm run test:size          # Check bundle sizes against limits
```

## Key Conventions

- All functions are pure and immutable, never mutate Dinero objects
- `__DEV__` and `__TEST__` globals are replaced at build time for tree-shaking

## Path Aliases

- `dinero.js` → `packages/dinero.js/src/`
- `dinero.js/currencies` → `packages/dinero.js/src/currencies/`
- `dinero.js/bigint` → `packages/dinero.js/src/bigint/`
- `test-utils` → `test/utils/`

## References

- [Project structure & architecture](.claude/docs/architecture.md)
- [Git workflow & PRs](.claude/docs/git-workflow.md)
- [Linear integration](.claude/docs/linear.md)
