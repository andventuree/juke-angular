'use strict'

juke.controller('ArtistsCtrl', function($scope, $log, $rootScope, ArtistFactory){
  $scope.$on('viewSwap', function(event, view){
    $scope.showMe = view.name === 'allArtists';
    if (!$scope.showMe) return;

    ArtistFactory.fetchAll()
    .then(artists => {
      $scope.artists = artists;
    })
    .catch($log.error);
  });

  $scope.viewArtist = function(artist){
    $rootScope.$broadcast('viewSwap', {name: 'oneArtist', id: artist.id});
  }
})

juke.controller('ArtistCtrl', function($scope, $log, ArtistFactory){
  $scope.$on('viewSwap', function(event, view){
    $scope.showMe = view.name === 'oneArtist';
    if (!$scope.showMe) return;

    ArtistFactory.fetchById(view.id)
    .then(artist => {
      console.log(artist);
      $scope.artist = artist;
    })
    .catch($log.error);
  })
})