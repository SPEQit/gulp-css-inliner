# gulp-css-inliner

> A simple and modern CSS inliner for `gulp`, with optional support for CSS preprocessors and templating languages.

[![NPM](https://img.shields.io/npm/v/gulp-css-inliner.svg?label=latest)](https://www.npmjs.com/package/gulp-css-inliner)
[![Travis.ci](https://travis-ci.org/SPEQit/gulp-css-inliner.svg?branch=master)](https://travis-ci.org/SPEQit/gulp-css-inliner)

## Install

```
$ npm install --save-dev gulp-css-inliner
```


## Usage

```js
var gulp = require('gulp');
var cssInline = require('gulp-css-inliner');

gulp.task('default', function () {
	return gulp.src('src/file.html')
		.pipe(cssInline({
			directory: 'src/style'
		}))
		.pipe(gulp.dest('dist'));
});
```


## API

### cssInline(options)

#### options

##### directory

Type: `string`  
Default: `''`

The base directory from which local stylesheets are loaded. Only files in this directory or its sub-directories are accessible.

##### plugins

Type: `function[]`  
Default: `[]`

Array of [PostCSS plugins](https://github.com/postcss/postcss#plugins) to use while processing stylesheets.

##### precompile

Type: `function`  
Default: `null`

A function that precompiles a stylesheet into CSS. See the
[css-inliner preprocessors section](https://www.npmjs.com/package/css-inliner#working-with-preprocessors-less-sass-stylus-etc).

##### template

Type: `function`  
Default: `null`

A function that can extract tags from a templating language. See the
[css-inliner templates section](https://www.npmjs.com/package/css-inliner#working-with-templates-handlebars-etc).

##### loadAsync

Type: `function`  
Default: `null`

A function that reads a stylesheet reference (path or URL) into a Buffer or string. Recommended only when `directory` and
`precompile` are not enough.

### cssInline.templates

#### handlebars

Type: `function`

CSSInliner support function for Handlebars. You will need to add Handlebars as a dev dependency if you want to use Handlebar
templates in your project.

### cssInline.preprocessors

#### less

Type: `function`

CSSInliner support function for Less. You will need to add Less as a dev dependency if you want to use Less stylesheets in your
project.

## License

MIT © [Northcloud Inc.](https://www.speqit.com)
