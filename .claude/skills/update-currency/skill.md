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

## Workflow

### Step 1: Determine Update Type

Ask the user using AskUserQuestion what kind of update they need:

1. **Add currency** - New currency introduced in an amendment
2. **Remove currency** - Currency withdrawn in an amendment
3. **Modify currency** - Currency properties changed (e.g., exponent)
4. **Bump amendment** - Just update the latest amendment number

### Step 2: Gather Information

Based on the update type:

#### For Adding a Currency

Ask for:
- **Code**: 3-letter ISO 4217 code (e.g., "XYZ")
- **Name**: Full currency name (e.g., "Example currency")
- **Base**: Usually 10 (or array for non-decimal, e.g., [5, 10])
- **Exponent**: Number of decimal places (0, 2, 3, etc.)
- **Amendment**: Amendment number where this was introduced

#### For Removing a Currency

Ask for:
- **Code**: Currency code to remove
- **Amendment**: Last amendment where currency was valid

#### For Modifying a Currency

Ask for:
- **Code**: Currency code to modify
- **What changed**: Which property (base or exponent)
- **New value**: The new value
- **Amendment**: First amendment where new value applies

### Step 3: Update Manifest

Read the current manifest:

```bash
cat packages/dinero.js/src/currencies/manifest.json
```

Make the appropriate changes:

#### Adding a Currency

Add to `currencies` object:
```json
"XYZ": {
  "code": "XYZ",
  "name": "Example currency",
  "base": 10,
  "exponent": 2,
  "since": 169
}
```

#### Removing a Currency

Add `until` to existing currency:
```json
"VEF": {
  "code": "VEF",
  "name": "Venezuelan bolívar",
  "base": 10,
  "exponent": 2,
  "since": 1,
  "until": 168
}
```

#### Modifying a Currency

Add `history` array with the old value:
```json
"JPY": {
  "code": "JPY",
  "name": "Japanese yen",
  "base": 10,
  "exponent": 0,
  "since": 1,
  "history": [
    { "until": 169, "exponent": 2 }
  ]
}
```

#### Update Latest Amendment

Always update `latestAmendment` if processing a new amendment:
```json
{
  "latestAmendment": 169,
  ...
}
```

### Step 4: Regenerate and Verify

Run the generation script:

```bash
npm run generate:currencies
```

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

### Adding VES (Venezuelan bolívar soberano)

```json
"VES": {
  "code": "VES",
  "name": "Venezuelan bolívar soberano",
  "base": 10,
  "exponent": 2,
  "since": 164
}
```

### Removing VEF (replaced by VES)

```json
"VEF": {
  "code": "VEF",
  "name": "Venezuelan bolívar",
  "base": 10,
  "exponent": 2,
  "since": 1,
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
  "since": 1,
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
