'use strict'

juke.controller('ArtistCtrl', function($scope, $log, ArtistFactory){
  $scope.$on('viewSwap', function(event, view){
    $scope.showMe = view.name === 'allArtists';
    if ($scope.showMe) return;

    ArtistFactory.fetchAll()
    .then(artists => {
      $scope.artists = artists;
    })
    .catch($log.error);
  })
})