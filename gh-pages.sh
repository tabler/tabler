#!/bin/bash

git checkout master

exists=`git show-ref refs/heads/gh-pages`
if [ -n "$exists" ]; then
    git branch -D gh-pages
fi

echo "check out branch gh-pages ..."
git checkout -b gh-pages

echo "add dist folder"
git add -f dist

echo "commit changes"
git commit -m "deploy to gh-pages"

echo "push to remote gh-pages"
git push origin `git subtree split --prefix dist`:gh-pages --force

echo "checkout branch master"
git checkout master

echo "delete branch gh-pages"
git branch -D gh-pages

echo "All done!"