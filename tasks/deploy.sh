git pull -r origin develop
git checkout master
git pull origin master
git merge -m "Merge branch 'develop'" develop
git push origin master
git checkout develop
