define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");
  var Timer = require('timer');
  require('serializeObject');
  require('bootstrap');
  require('validation');

  var Base = require('views/base'); 
  var Header = require('views/header'); 
  var Modal = require('views/modal'); 

  new Base();
  new Header();

  // Defining the application router.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {

      var Home = Backbone.View.extend({
        el: "#content",
        template: require("template!./templates/pages/home"),
        initialize: function() {
          this.render();
        },
        events: {
          'click button[data-event="next"]': 'next',
          'click button[data-event="start"]': 'start',
          'click button[data-event="pause"]': 'pause',
          'click button[data-event="finish"]': 'finish'
        },
        next: function(event) {
          this.template = require("template!./templates/pages/start");
          this.$el.html(this.template);
        },
        start: function(event) {
          event.preventDefault();
          this.data = $('form').serializeObject();

          if (!$('form').valid())
            return;

          var parent = this;

          // Count Down
          var seconds = 9;
          var countDown = setInterval(function() {
            $('#count-down').text(--seconds + ' sec'); 
            if (seconds <= 0) {
              clearInterval(countDown);
              $('#modal').modal('hide');
              parent.timer = new Timer();
            }
          }, 1000); 

          // Append modal
          new Modal({ 
            template: require('template!./templates/modals/start'),
            events: {
              'click button.back': 'back'
            },
            back: function(event) {
              parent.template = require("template!./templates/pages/start");
              parent.$el.html(parent.template);
              clearInterval(countDown);
            }
          });

          this.template = require("template!./templates/pages/tracker");
          this.$el.html(this.template);
          $('#film-title').text(this.data.film);

        },
        pause: function(event) {
          var parent = this;
          if (!this.timer)
            return;
          this.timer.pause();

          new Modal({
            template: require('template!./templates/modals/pause'),
            events: {
              'click button[data-event="resume"]': 'resume',
              'click button[data-event="reset"]': 'back'
            },
            resume: function(event) {
              parent.timer.play(); 
            }, 
            back: function(event) {
              parent.template = require("template!./templates/pages/start");
              parent.$el.html(parent.template);
            }
          });

        },
        finish: function(event) {
          var parent = this;
          if (!this.timer)
            return;
          this.timer.pause();

          new Modal({
            template: require('template!./templates/modals/finish'),
             events: {
              'click button[data-event="submit"]': 'submit',
              'click button[data-event="reset"]': 'back',
              'click button[data-event="cancel"]': 'cancel'
            },
            submit: function(event) {
              parent.template = require("template!./templates/pages/finish");
              parent.$el.html(parent.template);
            }, 
            back: function(event) {
              parent.template = require("template!./templates/pages/start");
              parent.$el.html(parent.template);
            },
            cancel: function(event) {
              parent.timer.play(); 
            }
          });
        },
        render: function() {
          this.$el.html(this.template);
        }
      });

      new Home();
    }
  });

  module.exports = Router;
});
