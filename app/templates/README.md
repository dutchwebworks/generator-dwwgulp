# Dutchwebworks Gulp Boilerplate

*By Dennis Burger, may 2017*


### Github issue tracking

Issue's and questions can be reported and tracked on the [Github issue page](https://github.com/dutchwebworks/gulp-boilerplate/issues).

## Prerequisites

* [NodeJS](http://nodejs.org)
* [Gulp command-line interface](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) (gulp-cli) 

## One-time installation

### Installing NodeJS on Mac and Windows

Download and install it form the [Nodejs.org website](http://nodejs.org). Please make sure, when installing NPM plugins, that your NPM version is up-to-date. Sometimes updates to NPM packages require an up-to-date NodeJS version.

If you haven't updated NodeJS for a while: open a **Terminal** window (or command-promt on Windows) and type:

	npm update npm -g

### Alternative Mac installation of NodeJS via homebrew

An alternative way to install NodeJS is via [Homebrew](http://brew.sh) (*The missing package manager for OS X*). Homebrew offers a lot more features to easily manage and install other Unix like programms. Similar to Linux's `apt-get install` commands. Homebrew can be installed on Mac by running this Ruby command:

	ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

Like the Homebrew documentation suggest: check your installation of Homebrew so that all is good. Brew doesn't use (doesn't like) `sudo`.

	brew doctor

Then install **NodeJS** via Homebrew

	brew install node

Installing via Homebrew also makes **updating NodeJS** a lot easier in the future:

	brew upgrade node

## Installing required Gulp packages

Run the commands below in the root of the project directory. Usually this is done only once. When updates are available for individual package; the `package.jsons` needs to be updated. And the `npm install` command needs to be run again to update everything.

#### If there's a `package.json` file then run

	npm install

This will read the `package.json` file and install the `devDependencies` packages listed there.

#### ... else create a NPM `package.json` file first

Create a NPM `package.json` file in the root of your project by running the command below and answer a few simple question regarding your project. This will save a proper `package.json` file. And kind of acts as 'meta-data' for your project. Make sure that the `name` field does NOT contain 'space' (white-space) characters. Or you'll get errors when trying to run Gulp tasks.

	npm init

Then run the NPM install command below to install the required packages for this boilerplate. By using the `--save-dev` flag, the package names and versions are saved to the `package.json` file for future reference.

	npm install --save-dev gulp browser-sync@0.7.2 gulp-clean gulp-concat gulp-imagemin gulp-minify-css gulp-plumber gulp-ruby-sass gulp-svgmin gulp-uglify gulp-newer gulp-header

When there is a `package.json` file (in the root of the project directory) you'll simply need to run `npm install` and the installation process runs by itself.

## Using the Gulp tasks

Run these `gulp` commands in the same directory (level) as where the `package.json` file is located. Usally the root of the project directory.

### For production ready code run:

	gulp

The bare Gulp command runs all tasks for production ready code. This task is usually run just before committing everything to version-control or deployment to production server. This includes:

* Compile all `*.scss` files to corresponding `*.css`.
* Concatenate and minify Css files. See `gulpfile.js` for configuration.
* Concatenate, uglify and minify Javascript files. See `gulpfile.js` for configuration.
* Optimize `*.svg` files.
* Optimize images (`.png, .gif` and `.jpg`).
* Cleanup (remove) obsolete files and Sass generated sourcemap `*.css.map` files.

### For (local) development run:

	gulp serve

Runs a `browser-sync` static NPM web server from the current directory on a custom port. This webserver serves only static files (like `.html, .css, .js` and images) no server-side code (like `.php` or Ruby).

Optionally configure the `browser-sync` section in `gulpfile.js` to use the `proxy` setting and not the `server` setting. This way the NPM web server will proxy all requests to a (locally) configured Apache / IIS web server vhost that **CAN run server-side-code**.

This Gulp task also includes a `watch` task that **watches for file changes to Sass** `*.scss` files. When these files change Gulp (re)compiles them, using the faster Gulp version of **libsass**, to `.css` files. When `browser-sync` detects changes to `*.css` files it **reloads** (injects) Css changes to all connected webbrowsers.

#### Using browser sync to test on other webbrowsers and (mobile) devices

Because this tasks runs a NPM `browser-sync` static webserver (straight on you're computers IP address and custom port number) you can use it on a 'mobile' device (smartphone / tablet on the same Wifi network). Load up the same URL on those devices and do webbrowser testing simultaneously. The **scroll- link- and click-actions are synced** between the connected devices and webbrowsers.

### Individual Gulp tasks

Please read the `gulpfile.js` itself for further available Gulp tasks, comments and documentation.

## Version-control

All (Gulp) NPM development dependency packages are listed in `package.json` file. When running `npm install` in the project root directory NodeJS creates a directory called `node_modules/` and downloads the required (Gulp) dependency packages to this directory.

Since these dependencies are managed by NodeJS NPM (Node Package Manager) this `node_modules/` directory should be **ignored by your version-control system**.

## Dealing with watch and buffer errors on *nix systems

If one of these errors occur:

`EMFILE: Too many opened files.` or `(libuv) Failed to create kqueue (24) ERROR`

It has something to do with a buffer size that keeps a `watch` on files, it needs to increase the buffer or `watch` fewer files (types). On Mac / Unix run the command below to  increase the buffer size.

	ulimit -n 8192

Now run one of the `gulp` commands again.

## More resources

* [Node Package Modules](https://npmjs.org)
* [GulpJS](http://gulpjs.com)
* [NPM cheatsheet](http://blog.nodejitsu.com/npm-cheatsheet)
