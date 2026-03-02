# [2.0.0](https://github.com/dinerojs/dinero.js/compare/v1.9.1...v2.0.0) (2026-03-02)

Dinero.js v2 is a complete rewrite of the library, designed from the ground up for modern JavaScript and TypeScript. It replaces the object-oriented, chainable API with a functional architecture of pure, standalone functions that are fully tree-shakeable.

For a step-by-step migration guide, see the [upgrade guide](https://dinerojs.com/getting-started/upgrade-guide).

## Breaking Changes

### Functional API

All chainable methods are now standalone functions. This enables bundlers to tree-shake unused operations.

```diff
- import Dinero from 'dinero.js';
- const price = Dinero({ amount: 500, currency: 'USD' });
- price.add(Dinero({ amount: 100, currency: 'USD' }));
+ import { dinero, add } from 'dinero.js';
+ import { USD } from 'dinero.js/currencies';
+ const price = dinero({ amount: 500, currency: USD });
+ add(price, dinero({ amount: 100, currency: USD }));
```

### Structured currencies

Currencies are now objects with `code`, `base`, and `exponent` properties instead of ISO 4217 strings. All 166 ISO 4217 currencies ship with the library.

```diff
- Dinero({ amount: 500, currency: 'USD' })
+ import { USD } from 'dinero.js/currencies';
+ dinero({ amount: 500, currency: USD })
```

### Scale replaces precision

The `precision` parameter is renamed to `scale`. Scale tracks the decimal point position independently of the currency exponent, allowing Dinero to preserve full precision through multi-step calculations.

```diff
- Dinero({ amount: 500, currency: 'USD', precision: 3 })
+ dinero({ amount: 500, currency: USD, scale: 3 })
```

### Scaled amounts replace floats

Operations like `multiply`, `allocate`, and `convert` no longer accept floating-point numbers. All fractional values must be passed as scaled amounts to prevent IEEE 754 rounding errors.

```diff
- price.multiply(0.055)
+ multiply(price, { amount: 55, scale: 3 })
```

### Removed APIs

- **`divide`** — use `allocate` for lossless distribution
- **`percentage`** — use `allocate` or `multiply`
- **`toFormat`**, **`toUnit`**, **`toRoundedUnit`** — use `toDecimal` or `toUnits` with a transformer
- **`getAmount`**, **`getCurrency`**, **`getPrecision`** — use `toSnapshot`
- **`getLocale`**, **`setLocale`** — locale support removed; use `toDecimal` with `Intl.NumberFormat`
- **Global defaults** (`Dinero.defaultCurrency`, `Dinero.globalLocale`, etc.) — no global state

### Type renames

All public types use a `Dinero` prefix to avoid naming conflicts:

- `Calculator` → `DineroCalculator`
- `Currency` → `DineroCurrency`
- `Snapshot` → `DineroSnapshot`
- `Options` → `DineroOptions`

### Platform requirements

- **Node.js 20+** required (v1 had no formal engine requirement)
- **Internet Explorer** is no longer supported

## New Features

### BigInt support

The `dinero.js/bigint` entry point provides a `dinero` function backed by native `bigint` arithmetic, enabling representation of amounts beyond `Number.MAX_SAFE_INTEGER` — essential for cryptocurrencies, high-precision finance, and currencies with many decimal places.

```js
import { dinero, add } from 'dinero.js/bigint';
import { USD } from 'dinero.js/bigint/currencies';

const d = dinero({ amount: 999999999999999999n, currency: USD });
```

### Pluggable calculator

The `createDinero` factory accepts any object implementing `DineroCalculator<T>`, allowing third-party arbitrary-precision libraries (big.js, JSBI, etc.) as the numeric backend.

### Non-decimal currencies

The `currency.base` field supports arrays for currencies with multiple subdivisions (e.g., pre-decimal British pounds: `[20, 12]` for 20 shillings/pound and 12 pence/shilling). The `toUnits` function decomposes amounts across all subdivisions.

### Compile-time currency safety

Currency objects are typed with literal codes (`DineroCurrency<number, 'USD'>`), enabling TypeScript to catch currency mismatches at compile time — for example, preventing addition of USD and EUR values.

### Automatic scale tracking

Scale propagates automatically during calculations. The `trimScale` function reduces it back to the smallest safe representation when needed, eliminating manual precision management.

### New functions

- **`compare`** — three-way comparison returning `-1 | 0 | 1`
- **`toDecimal`** — string decimal representation with optional transformer
- **`toUnits`** — array of amounts per currency subdivision
- **`trimScale`** — reduce scale to smallest safe representation
- **`normalizeScale`** — align multiple Dinero objects to a common scale
- **`transformScale`** — convert to a specific scale

### Rounding modes

Eight rounding functions for precise control: `up`, `down`, `halfUp`, `halfDown`, `halfEven`, `halfOdd`, `halfTowardsZero`, `halfAwayFromZero`.

### Full tree-shaking

The package is marked `sideEffects: false`. Only the functions you import are included in your bundle.

## Bug Fixes

* **allocate:** distribute remainder to largest ratio first ([#776](https://github.com/dinerojs/dinero.js/issues/776))
* **allocate:** prevent infinite loop with large amounts ([#771](https://github.com/dinerojs/dinero.js/issues/771))
* **convert:** throw when converting between currencies with different bases ([#477](https://github.com/dinerojs/dinero.js/issues/477))
* **isPositive:** return `false` for zero values ([#728](https://github.com/dinerojs/dinero.js/issues/728))
* **toDecimal:** handle negative units correctly ([#690](https://github.com/dinerojs/dinero.js/issues/690))
* **toDecimal:** preserve negative sign for leading zeros ([#692](https://github.com/dinerojs/dinero.js/issues/692))
* **toDecimal:** do not append decimal string when scale is zero ([#751](https://github.com/dinerojs/dinero.js/issues/751))
* **rounding:** fix `up`, `down`, `halfUp` handling of numbers close to 0 ([#710](https://github.com/dinerojs/dinero.js/issues/710), [#713](https://github.com/dinerojs/dinero.js/issues/713))
* **currencies:** use proper base and exponents for MRU and MGA
* **currencies:** update to ISO 4217 amendments 169-179

## Package Changes

The library is distributed as a single `dinero.js` package with subpath exports:

| Import path | Description |
|---|---|
| `dinero.js` | Core API (number amounts) |
| `dinero.js/currencies` | ISO 4217 currency objects |
| `dinero.js/bigint` | Core API (bigint amounts) |
| `dinero.js/bigint/currencies` | ISO 4217 currency objects for bigint |

ESM and UMD bundles are available. TypeScript declarations are included.

## Infrastructure

- **Build system:** [tsdown](https://tsdown.dev/) (powered by Rolldown) for bundling and type generation
- **Linting:** [Oxlint](https://oxc.rs/) (Rust-based)
- **Testing:** [Vitest](https://vitest.dev/) with native TypeScript support
- **Documentation:** new [VitePress](https://vitepress.dev/) site at [dinerojs.com](https://dinerojs.com), with Algolia DocSearch and AskAI
- **Node.js:** 20+ required

## Documentation

The documentation has been completely rewritten and is available at [dinerojs.com](https://dinerojs.com). It includes:

- Core concepts guide (amount, currency, scale, mutations, comparisons, formatting)
- Practical guides (serialization, database storage, payment services, cryptocurrencies, and more)
- Full API reference with examples
- Interactive examples: shopping cart (React + Vue), invoice builder, expense splitter, portfolio tracker, and pricing page



# [2.0.0-alpha.17](https://github.com/dinerojs/dinero.js/compare/v2.0.0-alpha.16...v2.0.0-alpha.17) (2026-02-28)


### Bug Fixes

* **api:** throw when converting between currencies with different bases ([#832](https://github.com/dinerojs/dinero.js/issues/832)) ([47d6145](https://github.com/dinerojs/dinero.js/commit/47d6145ddcdb07fcc1dcea9c163cde94e070bf24)), closes [#477](https://github.com/dinerojs/dinero.js/issues/477)
* **docs:** add .html extension to documentation links in README ([2536a1f](https://github.com/dinerojs/dinero.js/commit/2536a1fb8cfbb5ff9694886168ebe74b57281505))
* **docs:** add Vercel redirects for old URLs ([4002439](https://github.com/dinerojs/dinero.js/commit/40024399ad16e7a84991f55a06023eafddbc1ca8))
* **docs:** remove unnecessary npm install from Vercel build command ([72f0a91](https://github.com/dinerojs/dinero.js/commit/72f0a91249bc1912e9098872c3b7fb195fb73b52))


### Features

* add compile-time currency safety with `TCurrency` type parameter ([#833](https://github.com/dinerojs/dinero.js/issues/833)) ([ab5d4a3](https://github.com/dinerojs/dinero.js/commit/ab5d4a3245fc496b6d29e0fdfe2e628d8be1e3c7))
* **docs:** add DocSearch AskAI integration ([a343fb2](https://github.com/dinerojs/dinero.js/commit/a343fb2687a4f500fd889b1a785b628d71b4f291))



# [2.0.0-alpha.16](https://github.com/dinerojs/dinero.js/compare/v2.0.0-alpha.15...v2.0.0-alpha.16) (2026-02-03)

## ⚠️ Breaking Changes

### Package Consolidation (RFC #722)

**All `@dinero.js/*` packages have been removed.** The library is now distributed as a single `dinero.js` package with subpath exports.

#### Before (alpha.15 and earlier):
```js
import { dinero, add } from '@dinero.js/core';
import { USD } from '@dinero.js/currencies';
import { calculator } from '@dinero.js/calculator-bigint';
```

#### After (alpha.16+):
```js
import { dinero, add } from 'dinero.js';
import { USD } from 'dinero.js/currencies';
import { dinero as dineroBigint } from 'dinero.js/bigint';
```

#### Migration steps:
1. Uninstall all `@dinero.js/*` packages
2. Install `dinero.js`
3. Update imports as shown above

### Type Renaming

All public types now use a `Dinero` prefix to avoid naming conflicts:
- `Calculator` → `DineroCalculator`
- `Currency` → `DineroCurrency`
- `Snapshot` → `DineroSnapshot`
- `Options` → `DineroOptions`
- etc.

---

### Features

* **dinero.js:** consolidate packages with subpath exports ([16b0ad8](https://github.com/dinerojs/dinero.js/commit/16b0ad80315902e0893db8c3306bfcdd91835651))
* **dinero.js:** add granular UMD bundles per RFC #722 ([aea9dc2](https://github.com/dinerojs/dinero.js/commit/aea9dc2b086f5d68b55d591d464c04d52a972fd3))
* **bigint:** include bigint currencies in UMD bundle ([1054497](https://github.com/dinerojs/dinero.js/commit/10544971fd4eb1adb4b6e902d212e8a72021ba99))
* **currencies:** add bigint currency definitions ([0e4aef8](https://github.com/dinerojs/dinero.js/commit/0e4aef8524ac3ec0d294a0b90fbbef329801cbe1)), closes [#582](https://github.com/dinerojs/dinero.js/issues/582)
* **currencies:** add SLE, VED, XAD, XCG, ZWG (amendments 172-179)
* **currencies:** remove HRK, SLL, CUC, ANG, ZWL (amendments 172-179)

### Bug Fixes

* **currencies:** correct UYW to amendment 169 and fix generation ([0ea9d7e](https://github.com/dinerojs/dinero.js/commit/0ea9d7ef1e2096c763f72348af3bfe6ec0ba25d9))
* **docs:** correct OG image path and hero animation target ([f9a8585](https://github.com/dinerojs/dinero.js/commit/f9a8585691b230ad3f0572ce64068319370cf15b))



# [2.0.0-alpha.15](https://github.com/dinerojs/dinero.js/compare/v2.0.0-alpha.14...v2.0.0-alpha.15) (2026-01-31)


### Bug Fixes

* **allocate:** distribute remainder to largest ratio first ([6049038](https://github.com/dinerojs/dinero.js/commit/604903871ff14a67861534906ec5a28d6f10ff24)), closes [#776](https://github.com/dinerojs/dinero.js/issues/776)
* **allocate:** prevent infinite loop with large amounts ([d787b98](https://github.com/dinerojs/dinero.js/commit/d787b9883f08f3e1ecf286979959b1628b0da2c0)), closes [#771](https://github.com/dinerojs/dinero.js/issues/771)
* **release:** rename ship.config.js to .cjs for ESM compatibility ([5f5ed24](https://github.com/dinerojs/dinero.js/commit/5f5ed249cb274331f81ad6b2112cf42f835c150d))
* **release:** upgrade Ship.js to 0.27.0 for Node 22 compatibility ([0121dc5](https://github.com/dinerojs/dinero.js/commit/0121dc5f588a011938b6d504877b922744852495))
* **release:** use npm ci for install command in Ship.js ([d098801](https://github.com/dinerojs/dinero.js/commit/d0988012b8e0027d406dc58cb0143d3aab136c1b))
* **toDecimal:** do not append decimal string when scale is zero. ([#759](https://github.com/dinerojs/dinero.js/issues/759)) ([80a1dd7](https://github.com/dinerojs/dinero.js/commit/80a1dd7c8c93ca48e6a93998da18df5ad533c38c)), closes [#751](https://github.com/dinerojs/dinero.js/issues/751)



# [2.0.0-alpha.14](https://github.com/dinerojs/dinero.js/compare/v2.0.0-alpha.13...v2.0.0-alpha.14) (2023-02-27)


### Bug Fixes

* **isPositive:** return `false` with zero ([#728](https://github.com/dinerojs/dinero.js/issues/728)) ([140fe68](https://github.com/dinerojs/dinero.js/commit/140fe68ba516ce47a12a01a06a6425c7df5bd455))
* **up, down, halfUp:** fix handling of numbers close to 0 and rounding of integer results ([#711](https://github.com/dinerojs/dinero.js/issues/711)) ([6b30aa0](https://github.com/dinerojs/dinero.js/commit/6b30aa09aa5d887cd00170d2659d0bf044081d93)), closes [#710](https://github.com/dinerojs/dinero.js/issues/710) [#713](https://github.com/dinerojs/dinero.js/issues/713)



# [2.0.0-alpha.13](https://github.com/dinerojs/dinero.js/compare/v2.0.0-alpha.12...v2.0.0-alpha.13) (2022-12-19)


### Bug Fixes

* **toDecimal:** preserve negative sign for leading zeros ([#693](https://github.com/dinerojs/dinero.js/issues/693)) ([e6f290d](https://github.com/dinerojs/dinero.js/commit/e6f290dfd754826f20eeafff6c3a505ee19bf05f)), closes [#692](https://github.com/dinerojs/dinero.js/issues/692)



# [2.0.0-alpha.12](https://github.com/dinerojs/dinero.js/compare/v2.0.0-alpha.11...v2.0.0-alpha.12) (2022-12-09)


### Bug Fixes

* **toDecimal:** teach `toDecimal` how to handle negative units ([#690](https://github.com/dinerojs/dinero.js/issues/690)) ([81c5566](https://github.com/dinerojs/dinero.js/commit/81c5566f1219707b2bfb3416e94d832170dd2cf0))



# [2.0.0-alpha.11](https://github.com/dinerojs/dinero.js/compare/v2.0.0-alpha.10...v2.0.0-alpha.11) (2022-12-04)


### Features

* provide better support for non-decimal currencies ([#309](https://github.com/dinerojs/dinero.js/issues/309)) ([e7e9a19](https://github.com/dinerojs/dinero.js/commit/e7e9a19e6eb8e4ff8903867a60c1457a8d241d0c)), closes [#294](https://github.com/dinerojs/dinero.js/issues/294)


### BREAKING CHANGES

* ** the `toUnit` and the `toFormat` functions were
removed.



# [2.0.0-alpha.10](https://github.com/dinerojs/dinero.js/compare/v2.0.0-alpha.9...v2.0.0-alpha.10) (2022-11-19)

### Bug Fixes

* **dinero.js:** don't accept extra fields inside the currency options on create ([#673](https://github.com/dinerojs/dinero.js/issues/673)) ([9e72f9e](https://github.com/dinerojs/dinero.js/commit/9e72f9efdc75349d9fd01e4efe57f38b4b59102c))

# [2.0.0-alpha.9](https://github.com/dinerojs/dinero.js/compare/v2.0.0-alpha.8...v2.0.0-alpha.9) (2022-11-04)

### Bug Fixes

* **currencies:** add missing ANG export ([#447](https://github.com/dinerojs/dinero.js/issues/447)) ([8a0f67b](https://github.com/dinerojs/dinero.js/commit/8a0f67bda699ca8082d7a68def21a9d11fa5f1a8))
* **trimScale:** check for zero value in countTrailingZeros ([#448](https://github.com/dinerojs/dinero.js/issues/448)) ([6eefe8b](https://github.com/dinerojs/dinero.js/commit/6eefe8b17c2a3497f836301e6001b05901ac9dec))

### Reverts

* revert snapshot process ([78db2dd](https://github.com/dinerojs/dinero.js/commit/78db2ddf2914a81d1e2c10ea0d1c72d3bdeee3b1))

# [2.0.0-alpha.8](https://github.com/dinerojs/dinero.js/compare/v2.0.0-alpha.7...v2.0.0-alpha.8) (2021-08-08)

### Bug Fixes

* **core:** use equal function to compare currency base and exponent ([ac4724f](https://github.com/dinerojs/dinero.js/commit/ac4724f12d6625e4838dd49a517d0cd214f57f6e))
* **calculator-bigint:** avoid transpiling exponentiation operator ([53bf974](https://github.com/dinerojs/dinero.js/commit/53bf974de377455c2e1156c1c9a321276dfb11a3))

### Features

* expose calculator types ([b17bfc1](https://github.com/dinerojs/dinero.js/commit/b17bfc111c2462c9226b1a7fa7d6786b055a54ca))

# [2.0.0-alpha.7](https://github.com/dinerojs/dinero.js/compare/v2.0.0-alpha.6...v2.0.0-alpha.7) (2021-07-26)

### Bug Fixes

* **dinero.js:** properly re-export types and rounding functions ([d40a7e2](https://github.com/dinerojs/dinero.js/commit/d40a7e29aff102c4e16b8416a2600cc9e0d6add6))

### Features

* **dinero.js:** re-export createDinero ([d8d149f](https://github.com/dinerojs/dinero.js/commit/d8d149f77e8efce20a60a22aba1df6b21f0f4f25))

# [2.0.0-alpha.6](https://github.com/dinerojs/dinero.js/compare/v2.0.0-alpha.5...v2.0.0-alpha.6) (2021-07-21)

### Bug Fixes

* **currencies:** use proper base and exponents for MRU and MGA ([ac2bb8d](https://github.com/dinerojs/dinero.js/commit/ac2bb8da8f53e8f461423745c2aaf4c5730e0421))

# [2.0.0-alpha.5](https://github.com/dinerojs/dinero.js/compare/v2.0.0-alpha.4...v2.0.0-alpha.5) (2021-07-19)

### Features

* introduce compare function ([#266](https://github.com/dinerojs/dinero.js/issues/266)) ([53f84c2](https://github.com/dinerojs/dinero.js/commit/53f84c28c78ba8bf04249615267f01f60603c674))

# [2.0.0-alpha.4](https://github.com/dinerojs/dinero.js/compare/v2.0.0-alpha.3...v2.0.0-alpha.4) (2021-07-16)

# [2.0.0-alpha.3](https://github.com/dinerojs/dinero.js/compare/v2.0.0-alpha.2...v2.0.0-alpha.3) (2021-07-13)

# [2.0.0-alpha.2](https://github.com/dinerojs/dinero.js/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2021-07-12)

# 2.0.0-alpha.1 (2021-07-09)

This alpha release brings the new major version of Dinero.js. To learn more, head over to the [documentation](https://dinerojs.com).

---

See [previous releases](https://github.com/dinerojs/dinero.js/releases?after=v2.0.0-alpha.1).
