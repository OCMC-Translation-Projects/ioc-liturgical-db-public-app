/**
 * Created by Michael Colburn, Dec 2016
 *
 * Run this from the command line,
 *
 * node deployAppToWww
 *
 * This script pulls the latest version from github,
 * then extracts the zip file into the
 * /var/www directory.
 *
 */
require('shelljs/global'); // see http://documentup.com/shelljs/shelljs
const fs = require('fs-extra');

var repoDir = "deploy";
var wwwDir = "wwwTest";
var argv = require('minimist')(process.argv.slice(2));

if (!which('git')) {
  echo('Sorry, this script requires git');
  exit(1);
}

if (test('-d', './' + repoDir)) {
  if (exec('cd deploy; git pull origin').code === 0) {
    echo('pulled ioc-tms-website from github');
  } else {
    echo('Error: Git pull failed');
    exit(1);
  }
} else {
  if (exec('git clone https://github.com/OCMC-Translation-Projects/ioc-tms-website.git ' + repoDir).code === 0) {
    echo('cloned ioc-tms-website from github');
  } else {
    echo('Error: Git clone failed');
    exit(1);
  }
}
fs.removeSync(wwwDir);

var zipFile = '';

if (argv._.length > 0) {
  zipFile = repoDir + "/" + 'ioc-tms.v' + argv._[0] + '.zip';
} else {
  zipFile = repoDir + "/" + fs.readdirSync('./' + repoDir + '/').filter(file => file.endsWith('zip')).sort().pop();
}

console.log('Extracting ' + zipFile);

exec(
     'sudo unzip ' + zipFile + ' -d ' + wwwDir + '/'
      + '; ls'
     , function(code, stdout, stderr) {
   console.log('Exit code:', code);
   console.log('Program output:', stdout);
   console.log('Program stderr:', stderr);
 });


