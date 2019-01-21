'use strict'

// <song-list>
juke.directive('songList', function(PlayerFactory){
  return {
    restrict: 'E',
    templateUrl: '/js/song/song-list.html',
    scope: {
      songs: '='
    },
    link: function(scope){ //don't need element, attrs 
      //extract out these functions from 
      // playlist.controller.js
      // album.controller.js
      // artist.controller.js
      scope.toggle = function (song) {
        if (song !== PlayerFactory.getCurrentSong()) {
          PlayerFactory.start(song, scope.songs);
        } else if ( PlayerFactory.isPlaying() ) {
          PlayerFactory.pause();
        } else {
          PlayerFactory.resume();
        }
      };
    
      scope.getCurrentSong = function () {
        return PlayerFactory.getCurrentSong();
      };
    
      scope.isPlaying = function (song) {
        return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
      };
    }
  }
});