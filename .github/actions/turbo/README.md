# turbo/action.yml

This is a composite action to simplify a Node, Yarn and TurboRepo CI workflow.

## What does it do

It wraps [felixmosh/turborepo-gh-artifacts](https://github.com/johnhooks/turborepo-gh-artifacts) in a Node.js v16 environment with cached Yarn dependencies.

## Setup

1. Add to your workflow.

```yaml
- name: Prepare environment
  uses: ./.github/actions/turbo
  with:
    repo_token: ${{ secrets.GITHUB_TOKEN }}
```
