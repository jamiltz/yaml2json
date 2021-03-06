// Generated by CoffeeScript 1.8.0
(function() {
  var markup, yaml, _;

  _ = require('underscore');

  _.str = require('underscore.string');

  yaml = require('./yaml');

  markup = require('./markup');

  module.exports = function(raw, options) {
    var conversionOptions, convert, docs;
    if (options == null) {
      options = {};
    }
    if (options.prose) {
      _.extend(options, {
        fussy: true,
        convert: true,
        keepRaw: true
      });
    }
    if (options.prose && !yaml.isMultidoc(raw)) {
      throw new Error("Can only humanize YAML files that contain both frontmatter and content.");
    }
    if (options.fussy) {
      docs = yaml.safeLoadMixed(raw);
    } else {
      docs = yaml.safeLoadAll(raw);
    }
    if (options.convert || options.convertAll) {
      conversionOptions = {
        format: options.format || 'noop',
        recursive: options.convertAll,
        keepRaw: options.keepRaw
      };
      convert = _.partial(markup.object, _, conversionOptions);
      docs = _.map(docs, convert);
    }
    if (options.prose) {
      docs = _.extend(docs[0], docs[1], {
        more: docs.slice(2)
      });
    }
    if (yaml.isMultidoc(raw)) {
      return docs;
    } else {
      return docs[0];
    }
  };

  module.exports.yaml = yaml;

}).call(this);
