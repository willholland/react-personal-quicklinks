'use strict';
const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const path = require('path');
const runSequence = require('run-sequence');

function srcPath(subdir) {
    return path.join(__dirname, "lib", subdir);
}

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

build.configureWebpack.mergeConfig({
    additionalConfiguration: (generatedConfiguration) => {
        generatedConfiguration.resolve.alias["@utility"] = srcPath('utilities');
        return generatedConfiguration;
    }
});

gulp.task('version-sync', function() {
    const gutil = require('gulp-util');
    const fs = require('fs');

    // read package.json
    var pkgConfig = require('./package.json');

    // read configuration of web part solution file
    var pkgSolution = require('./config/package-solution.json');

    // log old version
    gutil.log('Old Version:\t' + pkgSolution.solution.version);

    // Generate new MS compliant version number
    var newVersionNumber = pkgConfig.version.split('-')[0] + '.0';

    // assign newly generated version number to web part version
    pkgSolution.solution.version = newVersionNumber;

    // log new version
    gutil.log('New Version:\t' + pkgSolution.solution.version);

    // write changed package-solution file
    fs.writeFileSync('./config/package-solution.json', JSON.stringify(pkgSolution, null, 4));

});

build.initialize(gulp);
build.initialize(require('gulp'));

gulp.task('package', function(cb) {
    runSequence('clean', 'version-sync', 'build', 'bundle', 'package-solution', cb);
});