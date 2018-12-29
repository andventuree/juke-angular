/* global juke */
'use strict';

juke.controller('AlbumsCtrl', function($scope, $log, AlbumFactory, $rootScope){
  $scope.$on('viewSwap', function(event, view){
    $scope.showMe = view.name === 'allAlbums';
  });

  $scope.viewAlbum = function(album){
    $rootScope.$broadcast('viewSwap', { name: 'oneAlbum', id: album.id});
  }

  AlbumFactory.fetchAll()
  .then(albums => {
    $scope.albums = albums;
  })
  .catch($log);
})


juke.controller('AlbumCtrl', function ($scope, $http, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {
  $scope.$on('viewSwap', function(event, view){
    $scope.showMe = view.name === 'oneAlbum';
    if (!$scope.showMe) return;
    
    AlbumFactory.fetchById(view.id)
    .then(album => {
      $scope.album = album;
    })
    .catch($log.error);

  })

  // main toggle
  $scope.toggle = function (song) {
    PlayerFactory.toggle(song, $scope.album.songs);
  };

  //Returns whether this PlayerFactory is playing - which is a bool
  $scope.isPlaying = PlayerFactory.isPlaying

  //Acts as transparent pass-through
  $scope.getCurrentSong = PlayerFactory.getCurrentSong;

});
