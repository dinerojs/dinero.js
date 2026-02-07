#!/usr/bin/env bash
set -e

DOCS_DIST="$(cd "$(dirname "$0")/.vitepress/dist" && pwd)"
EXAMPLES_DIR="$(cd "$(dirname "$0")/../examples" && pwd)"

for example in cart-react cart-vue pricing-react expense-splitter starter; do
  echo "Building $example..."
  cd "$EXAMPLES_DIR/$example"
  npm install
  npm run build
  mkdir -p "$DOCS_DIST/examples/$example"
  cp -r dist/* "$DOCS_DIST/examples/$example"
done
