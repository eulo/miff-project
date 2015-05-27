define(function(require, exports, module) {
  "use strict";
  return Backbone.View.extend({
    el: '#modal-content',
    initialize: function(obj) {
      for (var i in obj) {
        this[i] = obj[i];
      }
      this.render();
    },
    render: function() {
      this.$el.html(this.template);
      $('#modal').modal({
        backdrop: 'static',
        show: true
      });
    }
  });

});

