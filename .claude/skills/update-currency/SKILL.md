---
name: update-currency
description: Update currencies when an ISO 4217 amendment is published. Use when the user wants to add, remove, or modify currencies.
---

## Overview

This skill helps update the currency manifest when ISO 4217 publishes a new amendment. Currencies are defined in `packages/dinero.js/src/currencies/manifest.json`.

## Manifest Location

```
packages/dinero.js/src/currencies/manifest.json
```

## Generated Files

The manifest generates these files and directories (all in `.gitignore`):

```
packages/dinero.js/src/currencies/
├── definitions/           # Actual currency definitions
├── historical/            # Historical versions of modified currencies
├── iso4217/
│   ├── amendments/168/    # Re-exports for amendment 168
│   ├── amendments/169/    # Re-exports for amendment 169
│   └── latest/            # Re-exports for latest amendment (UMD bundles)
├── 168.ts                 # Barrel: export * from './iso4217/amendments/168'
├── 169.ts                 # Barrel: export * from './iso4217/amendments/169'
└── ...                    # One barrel file per amendment
```

The barrel files enable imports like `import { USD } from 'dinero.js/currencies/168'`.

## Workflow

### Step 1: Determine Update Type

Ask the user using AskUserQuestion what kind of update they need:

1. **Add currency** - New currency introduced in an amendment
2. **Remove currency** - Currency withdrawn in an amendment
3. **Modify currency** - Currency properties changed (e.g., exponent)
4. **Bump amendment** - Just update the latest amendment number

### Step 2: Gather Information

Ask the user directly in plain text (AskUserQuestion requires multiple choice options, which doesn't work for free-form input like currency codes and names).

#### For Adding a Currency

Ask for:
- **Code**: 3-letter ISO 4217 code (e.g., "VED")
- **Name**: Full currency name (e.g., "Venezuelan digital bolívar")
- **Base**: Usually 10 (or array for non-decimal, e.g., [5, 10])
- **Exponent**: Number of decimal places (0, 2, 3, 4)
- **Amendment**: Amendment number where this was introduced

#### For Removing a Currency

Ask for:
- **Code**: Currency code to remove
- **Amendment**: Last amendment where currency was valid (the currency will be removed starting from the next amendment)

**Important**: When removing, bump `latestAmendment` to `until + 1` (the first amendment without this currency).

#### For Modifying a Currency

Ask for:
- **Code**: Currency code to modify
- **What changed**: Which property (base or exponent)
- **New value**: The new value
- **Amendment**: First amendment where new value applies

### Step 3: Update Manifest

Find the insertion point (currencies are alphabetically sorted):

```bash
grep -n '"CODE"' packages/dinero.js/src/currencies/manifest.json
```

Make the appropriate changes using the Edit tool:

#### Adding a Currency

Add to `currencies` object in alphabetical order:
```json
"VED": {
  "code": "VED",
  "name": "Venezuelan digital bolívar",
  "base": 10,
  "exponent": 2,
  "since": 170
}
```

#### Removing a Currency

Add `until` to existing currency, and bump `latestAmendment` to `until + 1`:
```json
"VEF": {
  "code": "VEF",
  "name": "Venezuelan bolívar",
  "base": 10,
  "exponent": 2,
  "since": null,
  "until": 163
}
```
Then set `"latestAmendment": 164` (the first amendment without this currency).

Note: `since: null` means the currency was in the original ISO 4217 standard.

#### Modifying a Currency

Add `history` array with the old value:
```json
"MWK": {
  "code": "MWK",
  "name": "Malawian kwacha",
  "base": 10,
  "exponent": 2,
  "since": null,
  "history": [
    { "until": 169, "exponent": 0 }
  ]
}
```

#### Update Latest Amendment

Always update `latestAmendment` if processing a new amendment:
```json
{
  "latestAmendment": 170,
  ...
}
```

### Step 4: Regenerate and Verify

Run the generation script:

```bash
npm run generate:currencies
```

This will output which amendments were generated and how many currencies each contains.

Verify the build works:

```bash
npm run build:esm -w dinero.js
```

Run tests:

```bash
npm test -- --run
```

### Step 5: Offer to Commit

Ask if the user wants to commit the changes using the /commit skill.

## Examples

### Adding VED (Venezuelan digital bolívar)

```json
"VED": {
  "code": "VED",
  "name": "Venezuelan digital bolívar",
  "base": 10,
  "exponent": 2,
  "since": 170
}
```

### Removing VEF (replaced by VES)

```json
"VEF": {
  "code": "VEF",
  "name": "Venezuelan bolívar",
  "base": 10,
  "exponent": 2,
  "since": null,
  "until": 163
}
```

### Changing MRO to MRU (Mauritania redenomination)

Old MRO marked as removed:
```json
"MRO": {
  "code": "MRO",
  "name": "Mauritanian ouguiya",
  "base": 5,
  "exponent": 1,
  "since": null,
  "until": 163
}
```

New MRU added:
```json
"MRU": {
  "code": "MRU",
  "name": "Mauritanian ouguiya",
  "base": 5,
  "exponent": 1,
  "since": 164
}
```

## Reference

- ISO 4217 currency codes: https://www.iso.org/iso-4217-currency-codes.html
- Amendment list: https://www.six-group.com/en/products-services/financial-information/data-standards.html
