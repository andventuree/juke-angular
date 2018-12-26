/* global juke */
'use strict';

juke.controller('AlbumsCtrl', function($scope, $log, AlbumFactory){
  AlbumFactory.fetchAll()
  .then(albums => {
    console.log(albums);
    $scope.albums = albums;
  })
  .catch($log);
})


juke.controller('AlbumCtrl', function ($scope, $http, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

  // load our initial data
  AlbumFactory.fetchAll()
  .then(albums => { return AlbumFactory.fetchById(albums) })
  .then(album => {
    $scope.album = album;
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  // main toggle
  $scope.toggle = function (song) {
    PlayerFactory.toggle(song, $scope.album.songs);
  };

  //Returns whether this PlayerFactory is playing - which is a bool
  $scope.isPlaying = PlayerFactory.isPlaying

  //Acts as transparent pass-through
  $scope.getCurrentSong = PlayerFactory.getCurrentSong;

});
