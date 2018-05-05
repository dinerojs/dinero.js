#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" ]; then
  cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js
  npm run docs
  npm run build
  npm run travis-deploy-once "npm run semantic-release"
  curl -Is https://purge.jsdelivr.net/npm/dinero.js/build/umd/dinero.min.js
fi
