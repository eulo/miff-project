define(function(require, exports, module) {
  "use strict";
  return Backbone.View.extend({
    el: "#header",
    template: require("template!../templates/header"),
    initialize: function() {
      this.render();
    },
    render: function() {
      this.$el.html(this.template);
    }
  });
});

