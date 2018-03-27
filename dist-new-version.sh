#!/usr/bin/env bash

version=0.0.16

echo "Version $version"

npm run dist
git add .
git commit -am "generate dist"
npm version $version
git push origin master && git push origin master --tags

npm run publish-dist

npm publish
