'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var cssInline = require('./');

it('should inline CSS statements in <style> tags', function (cb) {
  var stream = cssInline();

  this.timeout(5000);

  stream.on('data', function (file) {
    assert.strictEqual(file.contents.toString(), '<p style="color:green">test</p>');
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/file.ext',
    contents: new Buffer('<style>p { color: green; }</style><p>test</p>')
  }));

  stream.end();
});

it('should inline CSS statements from external files', function (cb) {
  var stream = cssInline();

  var linkTag = '<link rel="stylesheet" type="text/css" href="test.css" />';

  this.timeout(5000);

  stream.on('data', function (file) {
    assert.strictEqual(file.contents.toString(), '<p style="color:red">test</p>');
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/file.ext',
    contents: new Buffer(linkTag + '<p>test</p>')
  }));

  stream.end();
});
