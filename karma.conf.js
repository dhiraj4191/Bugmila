// Karma configuration
// Generated on Wed Oct 19 2016 16:52:40 GMT+0530 (India Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        './node_modules/angular/angular.js',                            
        './node_modules/angular-mocks/angular-mocks.js',  
        './node_modules/angular-ui-router/release/angular-ui-router.js', 
        './node_modules/angular-material/angular-material.js',
        './node_modules/angular-animate/angular-animate.js',
        './node_modules/angular-aria/angular-aria.js',
        './node_modules/angular-messages/angular-messages.js',
        './public/angular-app/main/app.js',               
        './public/angular-app/services/authentication.service.js',
        './public/angular-app/services/user.service.js',                        
        './public/angular-app/services/user.service.spec.js',
        './public/angular-app/services/defect.service.js',                        
        './public/angular-app/services/defect.service.spec.js',                        
        './public/angular-app/services/authentication.service.spec.js',
        './public/angular-app/controller/login.controller.js',
        './public/angular-app/controller/login.controller.spec.js',
        './public/angular-app/controller/adminPanel.controller.js',
        './public/angular-app/controller/adminPanel.controller.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}