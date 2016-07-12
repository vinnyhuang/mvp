angular.module('blitzkeys', ['ngSanitize'])
.controller('gameController', function($scope) {
  $scope.input = '';
  $scope.text = 'Our Goal: You\'ll begin Hack Reactor with a feeling of excitement and anticipation. Twelve weeks later, you\'ll follow the footsteps of our trailblazing alumni, taking the methodologies and best practices you perfected at our coding bootcamp to your next job. We\'ve built world class software engineering curriculum and programming courses. However, Hack Reactor is, above all else, a world-class learning environment.';
  $scope.start = 0;
  $scope.end = $scope.text.indexOf(' ') + 1;

  $scope.matchText = function() {
    // console.log($scope.text.substring($scope.start, $scope.end), $scope.input.length);
    if ($scope.text.substring($scope.start, $scope.end) === $scope.input) {
      // console.log('match!', $scope.text.substring($scope.start, $scope.end), $scope.input.length);
      $scope.start = $scope.end;
      $scope.end = $scope.text.indexOf(' ', $scope.start) + 1;
      // console.log($scope.start, $scope.end);
      $scope.input = ''
    }
  }

  $scope.highlight = function(start, end) {
    var full = $scope.text;
    var pre = full.substring(0, start);
    var mid = full.substring(start, end - 1);
    var post = full.substring(end - 1);
    console.log(pre, mid, post);
    console.log('return', '<p>' + pre + '<span class="highlighted">' + mid + '</span>' + post + '</p>')
    return '<p>' + pre + '<span class="highlighted">' + mid + '</span>' + post + '</p>';
  }
});

// }).factory('matchFactory', function() {
//   var text;
//   var input = '';

//   var matchText = function(text, start, end, input) {
//     if (text.substring(start, end) === input) {
//       console.log('match!');
//     }
//   }

//   var getInput = function() {
//     return input;
//   }

//   var setInput = function(wordIn) {
//     input = wordIn;
//   }
// })