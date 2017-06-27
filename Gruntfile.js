module.exports = function(grunt) {

	// Load Grunt depedencies
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Grunt config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Contact JS
		concat: {
			options: {
				stripBanners: true
    		},
			dist: {
				src:['assets/scripts/src/*.js'],
				dest:'assets/scripts/main.js'
			}
		},

		// Minify JS
		uglify: {
			options: {
                mangle: false
            },
			build: {
				src:  'assets/scripts/main.js',
				dest: 'assets/scripts/main.min.js'
			}
		},

		// Compile SASS
		sass: {
		    dist: {
		        options: {
		            style: 'compressed',
		            trace: true,
		            loadPath: [
		            	require("bourbon-neat").includePaths, 
		            	require("bourbon").includePaths
		            ],
		        },
		        files: {
		            'assets/css/main.css': 'assets/sass/main.scss'
		        }
		    } 
		}
	});

	grunt.registerTask('default', ['concat', 'uglify', 'sass']);
};