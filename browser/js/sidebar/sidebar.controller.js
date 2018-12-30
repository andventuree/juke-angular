'use strict'

juke.controller('SidebarCtrl', function($scope, $rootScope){
  $scope.showAllAlbums = function(){
    $rootScope.$broadcast('viewSwap', {name: 'allAlbums'});
  }

  $scope.viewAllArtists = function(){
    console.log('fired')
    $rootScope.$broadcast('viewSwap', {name: 'allArtists'});
  }
});
