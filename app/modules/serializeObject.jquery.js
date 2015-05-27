(function() {
  $.fn.serializeObject = function() {
    var extend, result;
    result = {};
    extend = function(i, element) {
      var node;
      node = result[element.name];
      if (node !== void 0) {
        if ($.isArray(node)) {
          return node.push(element.value);
        } else {
          result[element.name] = [node, element.value];
          return result[element.name];
        }
      } else {
        result[element.name] = element.value;
        return result[element.name];
      }
    };
    $.each(this.serializeArray(), extend);
    return result;
  };

}).call(this);
