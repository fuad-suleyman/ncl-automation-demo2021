// An example configuration file.
exports.config = {
    directConnect: true,
    getPageTimeout: 10000,
    allScriptsTimeout: 10000,
  
    
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        require: ['features/step-definitions/*.js'],
        //tags: '@wip',
        strict: true,
        format: 'json:.tmp/results.json',
        'dry-run': false, 
        removeFolders: true
    },

    specs:[
        'features/homepage.feature',
    ],

    SELENIUM_PROMISE_MANAGER: false,
  
      // Capabilities to be passed to the webdriver instance.
      multiCapabilities: [{
        browserName: 'chrome',
        shardTestfiles: true,
        maxInstances: 1,
        chromeOptions:{
            args: ['--start-maximized', '--log-level-3', '--disableChecks'],
            
            }
        }],

        plugins: [{
            package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
            options:{
                automaticallyGenerateReport: true,
                removeExistingJsonReportFile: true,
                removeOriginalJsonReportFile: true,
                openReportInBrowser: true,
                displayDureation: true,
                disableLog: true,
                reportName: 'NCL Test Results',
                customMetadata: false,
                customData: {
                    title: 'Run Info',
                    data: [
                        {label: 'Project', value: 'NCL'},
                        {label: 'Execution Time', value: new Date().toDateString()+ ' '+ new Date().toLocaleTimeString()}
                    ]
                }


            }
        }],

        onPrepare: function(){
            const path = require('path');
            const fs = require('fs');
            const browser = require('protractor').browser;
            const dotenv = require('dotenv');
            const GLOBALS = require('./features/support/globals/global-vars')

            console.log(`ENVIRONMENT: ${browser.params.env}`);

            const filePath = path.resolve(__dirname, `./config/${browser.params.env.toLowerCase()}.env`);
            const envConfig = dotenv.parse(fs.readFileSync(filePath));

            GLOBALS.ENV_VARS = envConfig;

            console.log(GLOBALS.ENV_VARS);
            
        }

  
  };
  