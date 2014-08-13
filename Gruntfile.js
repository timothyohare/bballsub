// http://us6.campaign-archive2.com/?u=2cc20705b76fa66ab84a6634f&id=7d6ccb80f1&e=9ee9f5b57b
// https://www.npmjs.org/package/grunt-complexity

module.exports = function(grunt) {
    // Load the jshint plugin
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // Load the watch plugin
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-complexity');

    // Project configuration.
    grunt.initConfig({
        jshint: {
            options: {
                eqeqeq: true
            },
            all: ["public/javascripts/**/*.js"]
        },
        watch: {
            jshint: {
                tasks: ["jshint:all"],
                src: ["public/javascripts/**/*.js"]
            }
        },
        complexity: {
            generic: {
                src: ["public/javascripts/**/*.js"],
                //exclude: ['doNotTest.js'],
                options: {
                    breakOnErrors: true,
                    jsLintXML: 'report.xml',         // create XML JSLint-like report
                    checkstyleXML: 'checkstyle.xml', // create checkstyle report
                    errorsOnly: false,               // show only maintainability errors
                    cyclomatic: [3, 7, 12],          // or optionally a single value, like 3
                    halstead: [8, 13, 20],           // or optionally a single value, like 8
                    maintainability: 100,
                    hideComplexFunctions: false,      // only display maintainability
                    broadcast: false                 // broadcast data over event-bus
                }
            }
        }
    });


    grunt.registerTask('default', 'complexity');
};