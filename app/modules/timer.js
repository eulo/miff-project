define(function(require, exports, module) {
  "use strict";

  var updateInt = null;
  return function() {
    var self = this;
    var $this = $('#time-elapsed');
    var start = new Date().getTime(); 
    var pauseTime = 0;


    var output = function(num) {
      if (num.length === 1)
        return '0' + num;
      return num;
    };
    
    this.updateFunc = function() {
      var diff = new Date().getTime() - start + pauseTime;
      var seconds = diff / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      seconds = output(parseInt(seconds % 60) + '');
      minutes = output(parseInt(minutes % 60) + '');
      hours = output(parseInt(hours) + '');
      $this.text(hours + ':' + minutes + ':' + seconds);
    };

    this.pause = function() {
      clearInterval(updateInt); 
      updateInt = null;
      pauseTime += new Date().getTime() - start; 
    };

    this.play = function() {
      start = new Date().getTime();
      clearInterval(updateInt);
      updateInt = null;
      updateInt = setInterval(this.updateFunc, 1000);
    };
    
    this.play(); 
  };


});
