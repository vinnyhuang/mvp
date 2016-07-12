angular.module('blitzkeys', ['ngSanitize', 'btford.socket-io'])
.controller('gameController', function($scope, timer, mySocket) {
  $scope.username = 'guest';

  $scope.input = '';
  $scope.text = '';
  // $scope.text = 'Our Goal: You\'ll begin';
  // $scope.text = 'Our Goal: You\'ll begin Hack Reactor with a feeling of excitement and anticipation. Twelve weeks later, you\'ll follow the footsteps of our trailblazing alumni, taking the methodologies and best practices you perfected at our coding bootcamp to your next job. We\'ve built world class software engineering curriculum and programming courses. However, Hack Reactor is, above all else, a world-class learning environment.';
  $scope.start = 0;
  $scope.end = $scope.text.indexOf(' ') + 1;

  $scope.startTimer = timer.startTimer;
  $scope.getTimer = timer.getTimer;
  $scope.stopTimer = timer.stopTimer;

  $scope.stopTimer();

  $scope.inProgress = false;
  $scope.hideStart = false;
  $scope.hideRestart = true;

  $scope.winner = {};

  // console.log(mySocket);
  // mySocket.emit('finishTest');

  mySocket.on('finishTest', function(winner) {
    $scope.winner = {
      name: winner.name,
      wpm: winner.wpm
    }
  });


  $scope.startGame = function() {
    $scope.text = 'Our Goal: You\'ll begin';
    // $scope.text = 'Our Goal: You\'ll begin Hack Reactor with a feeling of excitement and anticipation. Twelve weeks later, you\'ll follow the footsteps of our trailblazing alumni, taking the methodologies and best practices you perfected at our coding bootcamp to your next job. We\'ve built world class software engineering curriculum and programming courses. However, Hack Reactor is, above all else, a world-class learning environment.';
    $scope.start = 0;
    $scope.end = $scope.text.indexOf(' ') + 1;
    $scope.wordCount = 0;

    $scope.startTimer();
    $scope.inProgress = true;
    $scope.hideStart = true;
    $scope.hideRestart = true;
  }

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
      $scope.wordCount++;
    }

    if ($scope.start === $scope.end) {
      var elapsed = $scope.stopTimer();
      var wpm = Math.floor(($scope.text.length / elapsed * 12000)); // CPM->WPM/5, ms->min*60000
      // var wpm = Math.floor(($scope.wordCount / elapsed * 60000)); // ms->min*60000
      $scope.text = 'Done! WPM: ' + wpm;
      $scope.inProgress = false;
      $scope.hideRestart = false;
      console.log('finished');
      console.log({name: $scope.username, wpm: wpm});

      if (!$scope.winner.name) {
        $scope.winner = { you: true }
        mySocket.emit('finishTest', {name: $scope.username, wpm: wpm});
      }
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

  $scope.winnerText = function() {
    // console.log($scope.winner);
    if ($scope.winner.you) {
      return 'You win!';
    } else if (!$scope.winner.name) {
      return '';
    }
    return 'WINNER: ' + $scope.winner.name + ' ' + $scope.winner.wpm + 'wpm';
  }
})

.factory('timer', function() {
  var initTime, currentTime, running;

  var startTimer = function() {
    initTime = Date.now();
    running = true;
  };

  var getTimer = function() {
    if (running) {
      return Math.floor((Date.now() - initTime) / 1000);
    } else {
      return Math.floor(currentTime / 1000);
    }
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

.factory('mySocket', function(socketFactory) {
  var mySocket = socketFactory();
  // mySocket.on('finishTest', function(socket) {
  //   console.log('Somebody Finished!');
  // })
  return mySocket;
})

.run(['$rootScope', '$interval', 'timer', function($rootScope, $interval, timer) {
  timer.startTimer();
  $rootScope.time = timer.getTimer();
  var timeIntervalId =$interval(function() {
    $rootScope.time = timer.getTimer();
  }, 1000);
}])