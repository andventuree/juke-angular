'use strict';

juke.directive('player', function(){
  return {
    restrict: 'E',
    templateUrl: '/js/player/player.html',
    controller: 'PlayerCtrl' 
    //to test if this way worked, comment out and note the btns on player bar at the bottom disappear
  };
})