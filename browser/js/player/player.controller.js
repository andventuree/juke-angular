/* global juke */
'use strict';

juke.controller('PlayerCtrl', function ($scope, PlayerFactory) {

  //Acts as transparent pass-through
  $scope.toggle = PlayerFactory.toggle;
  $scope.getCurrentSong = PlayerFactory.getCurrentSong;
  $scope.prev = PlayerFactory.previous;
  $scope.next = PlayerFactory.next;
  $scope.getProgress = PlayerFactory.getProgress;
  $scope.isPlaying = PlayerFactory.isPlaying;

});
