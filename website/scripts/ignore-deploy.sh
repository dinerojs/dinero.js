#!/bin/bash

echo "VERCEL: $VERCEL"
echo "CI: $CI"

if [[ "$VERCEL_GIT_COMMIT_REF" == "main"  ]] ; then
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;

else
  # Proceed with the build
  echo "✅ - Build can proceed"
  exit 1;
fi
