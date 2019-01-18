'use strict';

juke.directive('player', function(PlayerFactory){ //can inject dep in this fn, not the link fn
  return {
    restrict: 'E',
    templateUrl: '/js/player/player.html',
    link: function (scope, element, attrs) { // link does everything ctrl does but more!
      angular.extend(scope, PlayerFactory); // copy props from param2 to param1

      scope.toggle = function () {
        if ( PlayerFactory.isPlaying() ) PlayerFactory.pause();
        else PlayerFactory.resume();
      };
    
      scope.getPercent = function () {
        return PlayerFactory.getProgress() * 100;
      };
    
      scope.handleProgressClick = function (evt) {
        PlayerFactory.seek(evt.offsetX / evt.currentTarget.scrollWidth);
      };
    },
    // only reason to use this, if you share ctrl with another directive
    // controller: 'PlayerCtrl' // require angular directives
  };
});

// ** Advanced features of directives ** 
// transclusion only works with a link fn