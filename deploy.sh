#!/bin/bash

gitHubRepo="https://github.com/OCMC-Translation-Projects/ioc-tms-website.git"
repoPath="./deploy/"
wwwPath="./wwwTest"
zipFile=""

function mostRecentZip {
i=0
while read line
do
    array[ $i ]="$line"
    (( i++ ))
done < <(ls -r $repoPath*.zip)

zipFile=${array[0]}

}

cd $HOME

if [ -d "$repoPath" ]
  then
    cd deploy;
    git pull origin
    cd ..
  else
    git clone $gitHubRepo $repoPath
fi

if [ $# -eq 0 ]
  then
    mostRecentZip
  else
    arg=$1
    zipFile=${repoPath}ioc-tms.v${arg}.zip
fi

echo Deleting contents of old $wwwPath
rm -rf $wwwPath
mkdir $wwwPath

echo Extracting $zipFile
unzip $zipFile -d $wwwPath/

