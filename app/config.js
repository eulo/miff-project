require.config({
  paths: {
    "underscore": "../bower_components/lodash/dist/lodash.underscore",
    "lodash": "../bower_components/lodash/dist/lodash",
    "template": "../bower_components/lodash-template-loader/loader",
    "jquery": "../bower_components/jquery/dist/jquery",
    "backbone": "../bower_components/backbone/backbone",
    "bootstrap": "../bower_components/bootstrap/dist/js/bootstrap",
    "serializeObject": "./modules/serializeObject.jquery",
    "validation": "../bower_components/jquery.validation/dist/jquery.validate",
    "timer": "./modules/timer"
  },

  shim: {
    "bootstrap" : ["jquery"],
    "serializeObject": ["jquery"],
    "validation": ["jquery"],
    "timer": ["jquery"]
  },

  deps: ["main"]
});
