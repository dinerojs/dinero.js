# turbo/action.yml

This is a composite action to simplify a Node, Yarn and TurboRepo CI workflow.

## What does it do

It wraps [felixmosh/turborepo-gh-artifacts](https://github.com/johnhooks/turborepo-gh-artifacts) in a Node.js v16 environment with cached Yarn dependencies.

## Setup

1. Add a `TURBO_TOKEN` environment secret to GitHub repository `Settings > Security > Secrete > Actions`.

2. Add environment variables to the workflow to enable `turbo` remote caching.

```yaml
env:
  TURBO_API: 'http://127.0.0.1:9080'
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  # The team can be anything, it isn't used by local caching but necessary for `turbo`.
  TURBO_TEAM: 'dinero'
  TURBO_REMOTE_ONLY: true
```

2. Add the action as a step in the workflow.

```yaml
jobs:
  build:
    steps:
      - name: Prepare environment
        uses: ./.github/actions/turbo
        with:
          repo_token: ${{ secrets.GITHUB_TOKEN }}
```
