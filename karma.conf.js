module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
        "node_modules/angular/angular.js",
        "node_modules/angular-mocks/angular-mocks.js",
        "qAny.js",
        "qAnyUnitTests.js"
    ],
    exclude: [
    ],
    preprocessors: {
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox', 'IE'],
    singleRun: false
  });
};
