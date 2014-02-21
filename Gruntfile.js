module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/** */
		clean: {
			build: ['public'],
			source: [
				'source/styles/style.css',
				'source/scripts/bundle.js'
			],
			sassSource: ['source/styles/style.css'],
			staging: ['staging'],
			all: {
				options: {
					force: true
				},
				files: [{
					dot: true,
					src: [
						'.sass-cache',
						'public',
						'source/styles/style.css',
						'source/scripts/bundle.js'
					]
				}],
			}
		},

		/** */
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},

			source: [
				'Gruntfile.js',
				'source/scripts/**/*.js',
				'!source/scripts/bundle.js'
			]
		},

		/** */
		sass: {
			build: {
				files: {
					'public/styles/style.min.css': 'source/styles/style.scss',
				},
				
				options: {
					style: 'compressed',
					precision: 8
				}
			},

			source: {
				files: {
					'source/styles/style.css': 'source/styles/style.scss'
				},

				options: {
					style: 'expanded',
					precision: 8,
					lineNumbers: true
				}
			}
		},

		/** */
		imagemin: {
			build: {
				files: [{
					expand: true,
					cwd: 'source/images',
					src: ['**/*.{jpg,gif,png}'],
					dest: 'public/images'
				}],

				options: {
					cache: false
				}
			}
		},

		/** */
		copy: {
			build: {
				files: [{
					expand: true,
					cwd: 'source',
					src: [
						'.htaccess',
						'webfonts/*.*',
						'images/**/*.svg',
						'index.html',
						'favicon*.*',
						'sitemap.txt'
					],
					dest: 'public'
				}]
			}
		},

		/** */
		browserify: {
			build: {
				files: {
					'staging/bundle.js': ['source/scripts/main.js']
				}
			},

			source: {
				options: {
					debug: true
				},
				
				files: {
					'source/scripts/bundle.js': ['source/scripts/main.js']
				}
			}
		},

		/** */
		uglify: {
			build: {
				files: {
					'public/scripts/bundle.min.js': ['staging/bundle.js']
				}
			}
		},

		/** */
		rev: {
			build: {
				files: {
					src: [
						'public/styles/*.css',
						'public/scripts/*.js',
						'public/images/**/*.{jpg,gif,png}'
					]
				}
			}
		},

		/** */
		useminPrepare: {
			options: {
				dest: 'public',
			},
			html: 'source/index.html'
		},

		/** */
		usemin: {
			options: {
				assetsDirs: ['public/images/portfolio', 'public/images', 'public'],
				patterns: {
					js: [[
						/["']([^:"']+\.(?:png|gif|jpe?g|css|js))["']/img,
						'Update the JS to reference our revved images'
					]]
				}
			},
			html: ['public/index.html'],
			css: ['public/styles/*.css'],
			js: ['public/scripts/*.js']
		},

		/** */
		watch: {
			options: {
				livereload: true
			},

			html: {
				files: ['source/index.html']
			},

			js: {
				files: ['Gruntfile.js', 'source/scripts/**/*.js', '!source/scripts/bundle.js'],
				tasks: ['jshint:source', 'browserify:source']
			},

			sass: {
				options: {
					livereload: false
				},
				files: ['source/styles/**/*.scss'],
				tasks: ['sass:source']
			},

			css: {
				files: ['source/styles/style.css'],
				tasks: []
			}
		}
	});

	grunt.registerTask('default', [
		'watch'
	]);

	grunt.registerTask('build', [
		'clean:build',
		'clean:staging',
		'jshint',
		'sass:build',
		'imagemin:build',
		'browserify:build',
		'uglify:build',
		'copy:build',
		'rev:build',
		'usemin',
		'clean:staging'
	]);
};