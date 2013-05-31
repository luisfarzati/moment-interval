var fs = require('fs');

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nodeunit : {
            all : ["test/**/*.js"]
        },
        jshint: {
            all: ["Gruntfile.js", "moment-interval.js"],
            options: {
                "node"     : true,
                "browser"  : true,
                "boss"     : false,
                "curly"    : true,
                "debug"    : false,
                "devel"    : false,
                "eqeqeq"   : true,
                "eqnull"   : true,
                "evil"     : false,
                "forin"    : false,
                "immed"    : false,
                "laxbreak" : false,
                "newcap"   : true,
                "noarg"    : true,
                "noempty"  : false,
                "nonew"    : false,
                "onevar"   : true,
                "plusplus" : false,
                "regexp"   : false,
                "undef"    : true,
                "sub"      : true,
                "strict"   : false,
                "white"    : true
            }
        },
        watch : {
            test : {
                files : [
                    'moment-interval.js',
                    'test/**/*.js'
                ],
                tasks: ['nodeunit']
            },
            jshint : {
                files : '<%= jshint.all %>',
                tasks: ['jshint']
            }
        }
    });

    grunt.loadTasks("tasks");

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['jshint', 'nodeunit']);

    // Task to be run when releasing a new version
    grunt.registerTask('release', ['jshint', 'nodeunit']);
};