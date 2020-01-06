#!/bin/bash
# Upload files to Github - https://github.com/talesCPV/menu.git

echo" Let's commit files to github..."

cd ..

git init

git add .

git commit -m "by_script"

git remote add origin "https://github.com/talesCPV/menu.git"

git commit -m "by_script"

git push -f origin master


