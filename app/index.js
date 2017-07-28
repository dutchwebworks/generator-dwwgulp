'use strict';

var Generator = require('yeoman-generator'),
	mkdirp = require('mkdirp'),
	yosay = require('yosay'),
	chalk = require('chalk');

module.exports = class extends Generator {
	initializing() {
		var message = chalk.yellow.bold('Welcome to Dutwebworks Gulp ') + chalk.yellow('A starter kit for a web site with Gulp');
		this.log(yosay(message, { maxLength: 17 }));
	}

	prompting() {
		return this.prompt([{
			type    : 'input',
			name    : 'name',
			message	: 'What is the name of this project?',
			default : this.appname
		}, {
			type    : 'input',
			name	: 'description',
			message	: 'What is the project description?',
			default : this.appname
		}, {
			type    : 'input',
			name	: 'yourname',
			message	: 'What is your name?',
		}, {
			type    : 'input',
			name	: 'version',
			message	: 'What is the version of your app?',
			default	: '0.1.0'
		}]).then((answers) => {
			this.appname = answers.name;
			this.appdescription = answers.description;
			this.appauthor = answers.yourname;
			this.youremail = answers.youremail;
			this.appversion = answers.version;
		});
	}

	configuring() {
		this.config.save();
	}

	writing() {
		var destRoot = this.destinationRoot(),
			sourceRoot = this.sourceRoot(),
			appDir = destRoot + '/httpdocs',
			templateContext = {
				appname: this.appname,
				appdescription: this.appdescription,
				appauthor: this.appauthor,
				youremail: this.youremail,
				appversion: this.appversion,
			};

		// Images
		mkdirp(appDir + '/img');

		// Javascript
		mkdirp(appDir + '/js');
		mkdirp(appDir + '/js/libs');

		// Sass
		mkdirp(appDir + '/sass');
		mkdirp(appDir + '/sass/base');
		mkdirp(appDir + '/sass/modules');
		mkdirp(appDir + '/sass/layout');
		mkdirp(appDir + '/sass/overrides');
		this.fs.copy(sourceRoot + '/httpdocs/sass/style.scss', appDir + '/sass/style.scss');

		// Grunt related files
		this.fs.copy(sourceRoot + '/_Gulp_Mac.command', destRoot + '/_Gulp_Mac.command');
		this.fs.copy(sourceRoot + '/_Gulp_serve_Mac.command', destRoot + '/_Gulp_serve_Mac.command');
		this.fs.copy(sourceRoot + '/_Gulp_serve_Windows.cmd', destRoot + '/_Gulp_serve_Windows.cmd');
		this.fs.copy(sourceRoot + '/_Gulp_Windows.cmd', destRoot + '/_Gulp_Windows.cmd');	
		this.fs.copy(sourceRoot + '/Gulpfile.js', destRoot + '/Gulpfile.js');


		// Ignore files
		this.fs.copy(sourceRoot + '/_gitignore', destRoot + '/.gitignore');
		this.fs.copy(sourceRoot + '/_bowerrc', destRoot + '/.bowerrc');

		// Template context aware files
		this.fs.copyTpl(sourceRoot + '/LICENSE', destRoot + '/LICENSE', templateContext);
		this.fs.copyTpl(sourceRoot + '/package.json', destRoot + '/package.json', templateContext);
		this.fs.copyTpl(sourceRoot + '/bower.json', destRoot + '/bower.json', templateContext);
		this.fs.copyTpl(sourceRoot + '/README.md', destRoot + '/README.md', templateContext);
		this.fs.copyTpl(sourceRoot + '/httpdocs/index.html', appDir + '/index.html', templateContext);
	}

	install() {
		this.bowerInstall();
		this.npmInstall();
	}

	end() {
		this.spawnCommand('gulp', ['serve']);
	}
};