# Dutchwebworks Yeoman Gulp generator

*By Dennis Burger, may 2016*

A [Yeoman](http://yeoman.io) generator for creating a basic web site setup with [Gulp](http://gulpjs.com). Yeoman consist of 3 tools: **Yo, Gulp and Bower**.

## Prerequsites

* [NodeJS](https://nodejs.org/en/)
* [Yeoman](http://yeoman.io), a scaffolding tool.
* [Gulp](http://gulpjs.com), a JavaScript task runner.
* [Bower](http://bower.io), a package manager for the web.

## One time installation

Make sure NodeJS is installed by going to the [NodeJS website](https://nodejs.org/en/), download and install it for your operating system. This will also make the `npm` command-line tool available.

Open a **command-line window** (Terminal or MS-DOS) and type the following to globally (`-g`) install the above required NPM components all in one go:

	npm install -g yo gulp-cli bower

## Download this Yeoman generator

Before you can use this generator you need to download it. Run the command below to **globally** install this generator.

	npm install -g generator-dwwgulp

### Check globally installed NPM packages

To view your globally installed NPM list type the following. The new Yeoman generator should be listed here.

	npm ls -g --depth=0

## Using this generator in a new project

Create and `cd` to a new (empty) project directory where we'll use this generator as a starting point for a new project. Now type:

	yo dwwgulp

### Yeoman questions

You will be greated by Yeoman and it will ask you some basic questions regarding this project. This **meta-data information** is used inside some of the Yeoman generated files, like: `package.json`, `bower.json` and your project's `README.md` file.

## NPM and Bower installation

Once Yeoman is done generating the new project files it will also kick-in **Bower** to install the predifined project frontend packages like **jQuery** and **Modernizr** for your new project. See the `bower_components/` directory. Along with the regular **NPM install** for this new project which will install **Gulp** and some **Gulp plugins**.

## Removing this Yeoman generator

To unlink (remove) this Yeoman generator, type:

	npm uninstall -g generator-dwwgulp