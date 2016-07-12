angular.module('blitzkeys', [])
.controller('input', function($scope) {

}).factory('textMatching', function() {
  var matchText = function(text, start, end, input) {
    if (text.substring(start, end) === input) {
      console.log('match!');
    }
  }
})