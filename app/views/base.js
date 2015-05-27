define(function(require, exports, module) {
  "use strict";
  return Backbone.View.extend({
    el: "main",
    template: require("template!../templates/base"),
    initialize: function() {
      this.render();
    },
    render: function() {
      this.$el.html(this.template);
    }
  });
});

