#!/usr/bin/env bash

version=0.0.14

echo "Version $version"

npm run dist
git add .
git commit -am "version $version"
git push origin master

npm run publish-dist

npm version $version
npm publish
