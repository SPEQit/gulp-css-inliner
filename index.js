'use strict';
var gutil = require('gulp-util'),
  through = require('through2'),
  CSSInliner = require('css-inliner');

module.exports = function (options) {
  options = options || {};

  var inliner = new CSSInliner(options);

  inliner.on('warning', function(warning) {
    this.emit('warning', warning);
  });

  return through.obj(function (file, enc, cb) {
    var self = this;

    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-css-inliner', 'Streaming not supported'));
      return;
    }

    try {
      inliner.inlineCSSAsync(file.contents.toString())
        .then(function(result) {
          file.contents = new Buffer(result);
          self.push(file);
          cb();
        }, function(err) {
          this.emit('error', new gutil.PluginError('gulp-css-inliner', err));
          cb();
        });
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-css-inliner', err));
      cb();
    }
  });
};

module.exports.precompilers = {
  less: CSSInliner.less
};

module.exports.templates = {
  handlebars: CSSInliner.handlebars
};