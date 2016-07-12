angular.module('blitzkeys', ['ngSanitize'])
.controller('gameController', function($scope, timer) {
  $scope.input = '';
  $scope.text = 'Our Goal: You\'ll begin';
  // $scope.text = 'Our Goal: You\'ll begin Hack Reactor with a feeling of excitement and anticipation. Twelve weeks later, you\'ll follow the footsteps of our trailblazing alumni, taking the methodologies and best practices you perfected at our coding bootcamp to your next job. We\'ve built world class software engineering curriculum and programming courses. However, Hack Reactor is, above all else, a world-class learning environment.';
  $scope.start = 0;
  $scope.end = $scope.text.indexOf(' ') + 1;
  $scope.startTimer = timer.setTimer;
  $scope.getTimer = timer.getTimer;
  $scope.stopTimer = timer.stopTimer;

  $scope.matchText = function() {
    if ($scope.input === ' ' && $scope.text[$scope.start - 2] === '.') {
      $scope.input = '';
      return;
    }
    if ($scope.text.substring($scope.start, $scope.end) === $scope.input) {
      $scope.start = $scope.end;
      if ($scope.text.indexOf(' ', $scope.start) > -1) {
        $scope.end = $scope.text.indexOf(' ', $scope.start) + 1;
      } else {
        $scope.end = $scope.text.length;
      }
      $scope.input = ''
    }

    if ($scope.start === $scope.end) {
      console.log('Done!');
    }
  }

  $scope.highlight = function(start, end) {
    var color = $scope.getColor();
    var full = $scope.text;
    var pre = full.substring(0, start);
    var mid = full.substring(start, $scope.end < $scope.text.length ? $scope.end - 1 : $scope.text.length);
    var post = full.substring($scope.end < $scope.text.length ? $scope.end - 1 : $scope.text.length);
    return '<p>' + pre + '<span class=\" + ' + color + '\">' + mid + '</span>' + post + '</p>';
  }

  $scope.getColor = function() {
    var lengthIn = $scope.input.length;
    if (lengthIn > $scope.end - $scope.start) {
      return 'red';
    } else if ($scope.text.substring($scope.start, $scope.start + lengthIn) !== $scope.input) {
      return 'red';
    } else {
      return 'green';
    }    
  }
})
.factory('timer', function() {
  var initTime, currentTime, running;

  var startTimer = function() {
    initTime = Date.now();
    running = true;
  };

  var getTimer = function() {
    return Math.floor((Date.now() - initTime) / 1000);
  };

  var stopTimer = function() {
    if (running) {
      currentTime = Date.now() - initTime;
      running = false;
    }
    return currentTime;
  };

  return {
    startTimer: startTimer,
    getTimer: getTimer,
    stopTimer: stopTimer
  };
})
.run(['$rootScope', '$interval', 'timer', function($rootScope, $interval, timer) {
  timer.startTimer();
  $rootScope.time = timer.getTimer();
  var timeIntervalId =$interval(function() {
    $rootScope.time = timer.getTimer();
  }, 1000);
}])