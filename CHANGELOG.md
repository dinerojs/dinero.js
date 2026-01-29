# [2.0.0-alpha.15](https://github.com/dinerojs/dinero.js/compare/v2.0.0-alpha.14...v2.0.0-alpha.15) (2026-01-29)


### Bug Fixes

* **allocate:** distribute remainder to largest ratio first ([6049038](https://github.com/dinerojs/dinero.js/commit/604903871ff14a67861534906ec5a28d6f10ff24)), closes [#776](https://github.com/dinerojs/dinero.js/issues/776)
* **allocate:** prevent infinite loop with large amounts ([d787b98](https://github.com/dinerojs/dinero.js/commit/d787b9883f08f3e1ecf286979959b1628b0da2c0)), closes [#771](https://github.com/dinerojs/dinero.js/issues/771)
* **release:** use npm publish and skip install for CI compatibility ([ff05e03](https://github.com/dinerojs/dinero.js/commit/ff05e031d80f7aaca64a39284910c9bf54490360))
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

This alpha release brings the new major version of Dinero.js. To learn more, head over to the [documentation](https://v2.dinerojs.com/docs).

---

See [previous releases](https://github.com/dinerojs/dinero.js/releases?after=v2.0.0-alpha.1).
