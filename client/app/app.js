angular.module('blitzkeys', ['ngSanitize'])
.controller('gameController', function($scope) {
  $scope.input = '';
  // $scope.text = 'Our Goal: You\'ll begin';
  $scope.text = 'Our Goal: You\'ll begin Hack Reactor with a feeling of excitement and anticipation. Twelve weeks later, you\'ll follow the footsteps of our trailblazing alumni, taking the methodologies and best practices you perfected at our coding bootcamp to your next job. We\'ve built world class software engineering curriculum and programming courses. However, Hack Reactor is, above all else, a world-class learning environment.';
  $scope.start = 0;
  $scope.end = $scope.text.indexOf(' ') + 1;

  $scope.matchText = function() {
    if ($scope.input === ' ' && $scope.text[$scope.start - 2] === '.') {
      $scope.input = '';
      return;
    }
    // console.log($scope.text.substring($scope.start, $scope.end), $scope.input.length);
    if ($scope.text.substring($scope.start, $scope.end) === $scope.input) {
      // console.log('match!', $scope.text.substring($scope.start, $scope.end), $scope.input.length);
      $scope.start = $scope.end;
      if ($scope.text.indexOf(' ', $scope.start) > -1) {
        $scope.end = $scope.text.indexOf(' ', $scope.start) + 1;
      } else {
        $scope.end = $scope.text.length;
      }
      // console.log($scope.start, $scope.end);
      $scope.input = ''
    }

    if ($scope.start === $scope.end) {
      console.log('Done!');
    }
  }

  $scope.highlight = function(start, end) {
    var color = $scope.getColor();
    var full = $scope.text;
    // console.log('full', full, 'start', $scope.start, 'end', $scope.end);
    var pre = full.substring(0, start);
    var mid = full.substring(start, $scope.end < $scope.text.length ? $scope.end - 1 : $scope.text.length);
    var post = full.substring($scope.end < $scope.text.length ? $scope.end - 1 : $scope.text.length);
    // console.log('pre', pre, 'mid', mid, 'post', post);
    // console.log(pre, mid, post);
    // console.log('return', '<p>' + pre + '<span class="highlighted">' + mid + '</span>' + post + '</p>')
    return '<p>' + pre + '<span class=\" + ' + color + '\">' + mid + '</span>' + post + '</p>';
  }

  $scope.getColor = function() {
    var lengthIn = $scope.input.length;
    if (lengthIn > $scope.end - $scope.start) {
      console.log('length');
      return 'red';
    } else if ($scope.text.substring($scope.start, $scope.start + lengthIn) !== $scope.input) {
      console.log('err', $scope.text.substring($scope.start, $scope.start + lengthIn), $scope.input);
      return 'red';
    } else {
      console.log('right');
      return 'green';
    }    
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